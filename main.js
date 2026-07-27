
import { ExamEngine } from './examEngine.js';
import { statsManager } from './stats.js';
import { aiChecker } from './aiChecker.js';

// Configuration & State
let currentLang = 'ar';
let currentExam = null;
let currentFeedback = {}; // Stores { questionId: { isCorrect, isChecked } }

const translations = {
    ar: {
        dashboard_title: 'لوحة التحكم',
        dashboard_subtitle: 'تتبع تقدمك في مختلف المواد الدراسية',
        total_accuracy: 'متوسط الدقة',
        results_title: 'نتائج الاختبار',
        correct_answers: 'صحيحة',
        wrong_answers: 'خاطئة',
        time_spent: 'الوقت المستغرق',
        review_title: 'مراجعة الإجابات',
        loading_ai: 'جاري التحقق بواسطة الذكاء الاصطناعي...',
        btn_start: 'ابدأ الاختبار',
        accuracy_label: 'الدقة',
        exams_label: 'اختبار',
        placement_title: 'امتحان تحديد المستوى',
        placement_desc: 'ابدأ بتقييم مستواك العام للحصول على خطة دراسية مخصصة.',
        placement_btn: 'ابدأ التقييم الآن',
        check_answer: 'تحقق من الإجابة'
    },
    en: {
        dashboard_title: 'Dashboard',
        dashboard_subtitle: 'Track your progress across subjects',
        total_accuracy: 'Total Accuracy',
        results_title: 'Exam Results',
        correct_answers: 'Correct',
        wrong_answers: 'Wrong',
        time_spent: 'Time Spent',
        review_title: 'Review Answers',
        loading_ai: 'AI is analyzing your answers...',
        btn_start: 'Start Exam',
        accuracy_label: 'Accuracy',
        exams_label: 'Exams',
        placement_title: 'Placement Exam',
        placement_desc: 'Start by assessing your overall level to get a personalized study plan.',
        placement_btn: 'Start Assessment Now',
        check_answer: 'Check Answer'
    }
};

const SUBJECTS_CONFIG = [
    { id: 'math', name: { ar: 'الرياضيات', en: 'Mathematics' }, icon: '📐', color: 'bg-blue-500' },
    { id: 'science', name: { ar: 'العلوم', en: 'Science' }, icon: '🧪', color: 'bg-green-500' },
    { id: 'history', name: { ar: 'التاريخ', en: 'History' }, icon: '📜', color: 'bg-amber-500' },
    { id: 'english', name: { ar: 'اللغة الإنجليزية', en: 'English Language' }, icon: '✍️', color: 'bg-purple-500' }
];

// Router Helper
window.router = {
    navigate(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }
        if (viewId === 'home') renderDashboard();
    }
};

// UI Handlers
function init() {
    setupTheme();
    setupLang();
    renderDashboard();
    
    document.getElementById('next-btn').addEventListener('click', handleNext);
    document.getElementById('prev-btn').addEventListener('click', handlePrev);
}

function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    toggle.onclick = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
}

function setupLang() {
    const toggle = document.getElementById('langToggle');
    toggle.onclick = () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;
        toggle.innerText = currentLang === 'ar' ? 'English' : 'العربية';
        updateUIStrings();
        renderDashboard();
    };
}

function updateUIStrings() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[currentLang][key];
    });
}

function renderDashboard() {
    const grid = document.getElementById('subject-grid');
    const placementContainer = document.getElementById('placement-banner-container');
    
    if (placementContainer) {
        placementContainer.innerHTML = `
            <div class="bg-gradient-to-l from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-violet-950 rounded-[2.5rem] p-8 md:p-10 text-white mb-10 shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden animate-slide-up">
                <div class="relative z-10 max-w-2xl">
                    <span class="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">New / جديد</span>
                    <h2 class="text-3xl md:text-4xl font-black mb-4">${translations[currentLang].placement_title}</h2>
                    <p class="text-indigo-100 mb-8 text-lg opacity-90">${translations[currentLang].placement_desc}</p>
                    <button onclick="startPlacementExam()" class="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
                        ${translations[currentLang].placement_btn}
                    </button>
                </div>
                <div class="absolute -right-20 -bottom-20 text-[15rem] opacity-10 select-none">🎯</div>
            </div>
        `;
    }

    grid.innerHTML = '';
    SUBJECTS_CONFIG.forEach(sub => {
        const stats = statsManager.getSubjectData(sub.id);
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 rounded-[2rem] p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group animate-slide-up";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-3xl shadow-inner">${sub.icon}</div>
                <div class="text-right rtl">
                    <p class="text-xs text-slate-400 font-bold uppercase">${stats.examsTaken} ${translations[currentLang].exams_label}</p>
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2 dark:text-white">${sub.name[currentLang]}</h3>
            <div class="flex items-center gap-3 mb-6">
                <div class="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-600 transition-all duration-500" style="width: ${stats.accuracy}%"></div>
                </div>
                <span class="text-sm font-black text-indigo-600 dark:text-indigo-400">${stats.accuracy}%</span>
            </div>
            <button onclick="startExam('${sub.id}')" class="w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                ${translations[currentLang].btn_start}
            </button>
        `;
        grid.appendChild(card);
    });
}

window.startPlacementExam = async () => {
    try {
        const res = await fetch(`exams/placement.json`);
        const data = await res.json();
        currentExam = new ExamEngine('placement', data, currentLang);
        currentFeedback = {};
        router.navigate('exam');
        renderQuestion();
    } catch (e) {
        alert("Error loading exam");
    }
};

window.startExam = async (subjectId) => {
    try {
        const res = await fetch(`exams/${subjectId}.json`);
        const data = await res.json();
        currentExam = new ExamEngine(subjectId, data, currentLang);
        currentFeedback = {};
        router.navigate('exam');
        renderQuestion();
    } catch (e) {
        alert("Exam file not found.");
    }
};

async function validateAnswer(qId, val) {
    const q = currentExam.data.questions.find(item => item.id === qId);
    let isCorrect = false;

    if (q.type === 'fill-in-the-blank') {
        document.getElementById('loading-overlay').classList.remove('hidden');
        const check = await aiChecker.checkAnswer(val, q.correctAnswer, currentLang);
        isCorrect = check.isCorrect;
        document.getElementById('loading-overlay').classList.add('hidden');
    } else {
        isCorrect = String(val) === String(q.correctAnswer);
    }

    currentFeedback[qId] = { isCorrect, isChecked: true };
    renderQuestion();
}

function renderQuestion() {
    if (!currentExam) return;
    const q = currentExam.currentQuestion;
    const fb = currentFeedback[q.id];

    document.getElementById('question-counter').innerText = `${currentLang === 'ar' ? 'السؤال' : 'Question'} ${currentExam.currentIndex + 1} / ${currentExam.data.questions.length}`;
    document.getElementById('exam-progress-bar').style.width = `${currentExam.progress}%`;
    document.getElementById('question-text').innerText = q.questionText[currentLang];
    
    const starBtn = document.getElementById('star-question');
    starBtn.innerText = statsManager.isStarred(currentExam.subjectId, q.id) ? '★' : '☆';
    starBtn.onclick = () => {
        statsManager.toggleStar(currentExam.subjectId, q.id);
        renderQuestion();
    };

    const options = document.getElementById('options-container');
    const fill = document.getElementById('fill-blank-container');
    options.innerHTML = '';
    options.classList.add('hidden');
    fill.classList.add('hidden');

    if (q.type === 'multiple-choice' || q.type === 'true-false') {
        options.classList.remove('hidden');
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            const isSelected = currentExam.userAnswers[currentExam.currentIndex] === idx;
            
            let classes = "option-btn w-full p-5 text-right rtl rounded-2xl border-2 border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-all";
            
            if (isSelected) {
                if (fb?.isChecked) {
                    classes += fb.isCorrect ? " border-green-500 bg-green-50/50" : " border-red-500 bg-red-50/50";
                } else {
                    classes += " border-indigo-600 bg-indigo-50/50";
                }
            } else if (fb?.isChecked && String(idx) === String(q.correctAnswer)) {
                classes += " border-green-200 opacity-60";
            }

            btn.className = classes;
            btn.disabled = fb?.isChecked;
            btn.innerHTML = `
                <span class="w-8 h-8 rounded-lg ${isSelected && fb?.isChecked ? (fb.isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-100'} flex items-center justify-center font-bold text-xs ${isSelected && fb?.isChecked ? 'text-white' : ''}">
                    ${fb?.isChecked && isSelected ? (fb.isCorrect ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                </span>
                <span class="font-medium">${opt[currentLang]}</span>
            `;
            btn.onclick = () => {
                currentExam.setAnswer(idx);
                validateAnswer(q.id, idx);
            };
            options.appendChild(btn);
        });
    } else {
        fill.classList.remove('hidden');
        fill.innerHTML = `
            <input type="text" id="blank-input" placeholder="${currentLang === 'ar' ? 'اكتب إجابتك هنا...' : 'Type your answer...'}" 
                   class="w-full p-6 text-xl rounded-2xl border-2 dark:bg-slate-950 focus:border-indigo-500 outline-none text-center
                   ${fb?.isChecked ? (fb.isCorrect ? 'border-green-500 bg-green-50/30' : 'border-red-500 bg-red-50/30') : 'border-slate-100'}"
                   ${fb?.isChecked ? 'disabled' : ''}>
            ${!fb?.isChecked ? `<button id="check-btn" class="mt-4 w-full py-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 rounded-xl font-bold">${translations[currentLang].check_answer}</button>` : ''}
            ${fb?.isChecked && !fb.isCorrect ? `<p class="mt-2 text-center text-indigo-600 font-bold">${currentLang === 'ar' ? 'الإجابة الصحيحة:' : 'Correct:'} ${q.correctAnswer}</p>` : ''}
        `;
        const input = document.getElementById('blank-input');
        input.value = currentExam.userAnswers[currentExam.currentIndex] || '';
        input.oninput = (e) => currentExam.setAnswer(e.target.value);
        
        const checkBtn = document.getElementById('check-btn');
        if (checkBtn) {
            checkBtn.onclick = () => validateAnswer(q.id, input.value);
        }
    }

    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = currentExam.currentIndex === currentExam.data.questions.length - 1 ? (currentLang === 'ar' ? 'إنهاء' : 'Finish') : (currentLang === 'ar' ? 'التالي' : 'Next');
}

async function handleNext() {
    if (currentExam.currentIndex === currentExam.data.questions.length - 1) {
        document.getElementById('loading-overlay').classList.remove('hidden');
        const results = await currentExam.calculateResults();
        document.getElementById('loading-overlay').classList.add('hidden');
        showResults(results);
    } else {
        currentExam.next();
        renderQuestion();
    }
}

function handlePrev() {
    if (currentExam.prev()) renderQuestion();
}

function showResults(results) {
    router.navigate('results');
    document.getElementById('result-subject-name').innerText = currentExam.data.title[currentLang];
    document.getElementById('result-score').innerText = `${results.score}%`;
    document.getElementById('result-correct').innerText = results.correctCount;
    document.getElementById('result-wrong').innerText = results.wrongCount;
    document.getElementById('result-time').innerText = formatTime(results.timeSpent);

    const list = document.getElementById('review-list');
    list.innerHTML = '';
    results.review.forEach(item => {
        const div = document.createElement('div');
        div.className = "p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm";
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <p class="font-bold flex-1">${item.text}</p>
                <span class="text-2xl">${item.isCorrect ? '✅' : '❌'}</span>
            </div>
            <div class="flex gap-10 mt-4 text-sm">
                <div><span class="text-slate-400 block mb-1">${currentLang === 'ar' ? 'إجابتك:' : 'Your Answer:'}</span> <span class="${item.isCorrect ? 'text-green-600' : 'text-red-500'} font-bold">${item.userAnswer}</span></div>
                ${!item.isCorrect ? `<div><span class="text-slate-400 block mb-1">${currentLang === 'ar' ? 'الصحيحة:' : 'Correct:'}</span> <span class="text-indigo-600 font-bold">${item.correctAnswer}</span></div>` : ''}
            </div>
        `;
        list.appendChild(div);
    });
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

init();
