
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from './constants';
import { storageService } from './services/storageService';
import { Exam, ExamResult, Question, SavedFolder, ExamSession, Subject, QuestionType } from './types';
import { aiService } from './services/aiService';

// --- Utils ---
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
};

// --- Sub-Component: Folder Creation Modal ---
const CreateFolderModal: React.FC<{ 
  lang: 'ar'|'en', 
  onClose: () => void, 
  onSave: (name: string, icon: string) => void 
}> = ({ lang, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📁');
  const icons = ['📁', '📚', '🧪', '📐', '🧬', '📜', '🎨', '💻', '🌍', '📊', '💡', '📝'];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-4 animate-fade-in text-start">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/20">
        <h3 className="text-2xl sm:text-3xl font-black mb-8 text-center">{lang === 'ar' ? 'إنشاء مادة جديدة' : 'Create New Subject'}</h3>
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">اسم المادة</label>
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold text-xl transition-all"
              placeholder="مثال: ريادة أعمال"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">اختر أيقونة</label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map(i => (
                <button key={i} onClick={() => setIcon(i)} className={`text-2xl p-3 rounded-xl transition-all ${icon === i ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800'}`}>{i}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black">إلغاء</button>
            <button disabled={!name.trim()} onClick={() => onSave(name.trim(), icon)} className="flex-[2] py-5 bg-primary text-white rounded-2xl font-black shadow-xl disabled:opacity-30">إنشاء</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Results Page with Logic ---
const ResultsPage: React.FC<{ result: ExamResult, lang: 'ar'|'en', onHome: () => void }> = ({ result, lang, onHome }) => {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [isSaved, setIsSaved] = useState(false);

  const wrongCount = result.answers.filter(a => !a.isCorrect).length;
  const correctCount = result.answers.filter(a => a.isCorrect).length;

  const filteredAnswers = result.answers.filter(ans => {
    if (filter === 'correct') return ans.isCorrect;
    if (filter === 'wrong') return !ans.isCorrect;
    return true;
  });

  const handleSaveMistakes = () => {
    const wrongQs = result.answers.filter(a => !a.isCorrect).map(a => a.questionData);
    if (wrongQs.length === 0) return;
    
    const folderName = lang === 'ar' ? `أخطاء: ${result.answers[0]?.questionData.subjectId || 'اختبار'}` : `Mistakes: Exam`;
    const folder = storageService.addFolder(folderName, '⚠️');
    wrongQs.forEach(q => storageService.saveQuestionToFolder(q, folder.id));
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in text-start">
      <div className="text-center mb-12">
        <div className="inline-block p-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-[4rem] text-[80px] mb-8 animate-bounce shadow-2xl">🏆</div>
        <h2 className="text-5xl sm:text-7xl font-black mb-4">{t.score}: <span className="text-primary">{result.score}%</span></h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="modern-card p-6 border-b-8 border-green-500 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">صحيحة</p>
          <p className="text-4xl font-black text-green-500">{correctCount}</p>
        </div>
        <div className="modern-card p-6 border-b-8 border-red-500 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">خاطئة</p>
          <p className="text-4xl font-black text-red-500">{wrongCount}</p>
        </div>
        <div className="modern-card p-6 border-b-8 border-blue-500 text-center col-span-1 lg:col-span-2 flex items-center justify-center">
          <button 
            disabled={isSaved || wrongCount === 0} 
            onClick={handleSaveMistakes}
            className="w-full h-full flex items-center justify-center gap-2 font-black text-blue-600 disabled:opacity-30 hover:scale-105 transition-all"
          >
            {isSaved ? '✅ تم الحفظ في المواد' : `⚠️ حفظ الأخطاء للمراجعة (${wrongCount})`}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl w-fit">
        <button onClick={() => setFilter('all')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-800 shadow-lg' : 'text-slate-400'}`}>الكل</button>
        <button onClick={() => setFilter('correct')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${filter === 'correct' ? 'bg-green-500 text-white shadow-lg' : 'text-slate-400'}`}>الإجابات الصحيحة</button>
        <button onClick={() => setFilter('wrong')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${filter === 'wrong' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400'}`}>الإجابات الخاطئة</button>
      </div>

      <div className="space-y-6 mb-16">
        {filteredAnswers.map((item, idx) => (
          <div key={idx} className={`modern-card p-6 sm:p-10 border-r-8 transition-all ${item.isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <h3 className="text-xl sm:text-2xl font-black mb-6 leading-relaxed">{item.questionData.questionText[lang]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">إجابتك:</span>
                <p className={`text-xl font-black ${item.isCorrect ? 'text-green-600' : 'text-red-500'}`}>{item.userAnswer || 'لم يتم الحل'}</p>
              </div>
              {!item.isCorrect && (
                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">الإجابة الصحيحة:</span>
                  <p className="text-xl font-black text-primary">
                    {item.questionData.type === 'fill-in-the-blank' 
                      ? item.questionData.correctAnswer 
                      : item.questionData.options?.[Number(item.questionData.correctAnswer)]?.[lang]}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onHome} className="w-full py-8 bg-primary text-white rounded-[3rem] font-black text-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all">العودة للرئيسية</button>
    </div>
  );
};

// --- Sub-Component: Statistics ---
const StatisticsView: React.FC<{ lang: 'ar'|'en' }> = ({ lang }) => {
  const stats = storageService.getStats();
  const topMistakes = Object.values(stats.mistakesTracker).sort((a,b) => b.count - a.count).slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-start">
      <div className="mb-12">
        <h2 className="text-4xl font-black mb-2">إحصائيات التقدم</h2>
        <p className="text-slate-400 font-bold">ملخص أدائك التعليمي وتطورك</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="modern-card p-10 text-center border-t-8 border-primary">
          <p className="text-xs font-black text-slate-400 uppercase mb-3">الاختبارات</p>
          <p className="text-6xl font-black">{stats.examsTaken}</p>
        </div>
        <div className="modern-card p-10 text-center border-t-8 border-green-500">
          <p className="text-xs font-black text-slate-400 uppercase mb-3">دقة الحل</p>
          <p className="text-6xl font-black text-green-500">{stats.accuracyRate}%</p>
        </div>
        <div className="modern-card p-10 text-center border-t-8 border-blue-500">
          <p className="text-xs font-black text-slate-400 uppercase mb-3">إجمالي الإجابات</p>
          <p className="text-6xl font-black text-blue-500">{stats.totalQuestionsAnswered}</p>
        </div>
        <div className="modern-card p-10 text-center border-t-8 border-amber-500">
          <p className="text-xs font-black text-slate-400 uppercase mb-3">إجابات صحيحة</p>
          <p className="text-6xl font-black text-amber-500">{stats.correctAnswers}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="modern-card p-10 shadow-sm">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">⚠️ الأكثر خطأً</h3>
          {topMistakes.length === 0 ? <p className="text-center text-slate-400 py-20 font-bold">لا توجد أخطاء مسجلة حالياً</p> : (
            <div className="space-y-4">
              {topMistakes.map((m, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="font-bold flex-1 truncate px-2 text-lg">{m.question.questionText[lang]}</p>
                  <span className="bg-red-100 text-red-500 px-4 py-2 rounded-xl text-xs font-black shrink-0">تكرر {m.count} مرات</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modern-card p-10 shadow-sm">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">📈 تاريخ الدرجات</h3>
          <div className="space-y-4">
            {stats.history.slice().reverse().slice(0, 5).map((h, i) => (
              <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">#{stats.history.length - i}</div>
                  <p className="font-black text-slate-700 dark:text-slate-200">{new Date(h.date).toLocaleDateString('ar-EG')}</p>
                </div>
                <span className={`text-2xl font-black ${h.score >= 50 ? 'text-green-500' : 'text-red-500'}`}>{h.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Saved Folders ---
const SavedQuestionsView: React.FC<{ lang: 'ar'|'en', onStartPractice: (exam: Exam) => void }> = ({ lang, onStartPractice }) => {
  const t = TRANSLATIONS[lang];
  const [folders, setFolders] = useState<SavedFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState<SavedFolder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refresh = () => setFolders(storageService.getSavedFolders());
  useEffect(() => { refresh(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-start">
      {isModalOpen && <CreateFolderModal lang={lang} onClose={() => setIsModalOpen(false)} onSave={(n, i) => { storageService.addFolder(n, i); refresh(); setIsModalOpen(false); }} />}
      
      {!activeFolder ? (
        <>
          <div className="flex justify-between items-center mb-12">
            <div><h2 className="text-4xl font-black mb-2">{t.saved_questions}</h2><p className="text-slate-400 font-bold">إدارة موادك الدراسية</p></div>
            <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 bg-primary text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all">+ مادة جديدة</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {folders.map(f => (
              <div key={f.id} onClick={() => setActiveFolder(f)} className="modern-card p-10 cursor-pointer hover:border-primary transition-all group relative text-center flex flex-col items-center">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform drop-shadow-xl">{f.icon}</div>
                <h3 className="text-2xl font-black truncate w-full">{f.name}</h3>
                <span className="bg-slate-50 dark:bg-slate-800 px-4 py-1 rounded-full text-xs font-bold text-slate-400 mt-4 uppercase">{f.questions.length} سؤال</span>
                {!f.isDefault && (
                  <button onClick={(e) => { e.stopPropagation(); if(confirm('حذف؟')) { storageService.deleteFolder(f.id); refresh(); } }} className="absolute top-4 right-4 w-10 h-10 bg-red-50 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">✕</button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-slide-up">
          <button onClick={() => setActiveFolder(null)} className="mb-10 flex items-center gap-3 font-black text-primary hover:gap-5 transition-all">
            <span className="p-2 bg-indigo-50 rounded-xl">←</span> العودة للملفات
          </button>
          <div className="modern-card p-10 mb-12 border-r-8 border-primary flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <span className="text-8xl drop-shadow-2xl">{activeFolder.icon}</span>
              <div><h3 className="text-4xl font-black mb-2">{activeFolder.name}</h3><p className="text-slate-400 font-bold">{activeFolder.questions.length} سؤال متاح</p></div>
            </div>
            <button disabled={activeFolder.questions.length === 0} onClick={() => onStartPractice({ id: 'pr_'+activeFolder.id, subjectId: 'practice', title: { ar: 'مراجعة: ' + activeFolder.name, en: 'Review' }, questions: activeFolder.questions, active: true, thumbnail: activeFolder.icon })} className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all disabled:opacity-30">🚀 ابدأ التدريب</button>
          </div>
          <div className="space-y-6">
            {activeFolder.questions.map(q => (
              <div key={q.id} className="modern-card p-8 flex justify-between items-center group shadow-sm hover:border-primary transition-all">
                <p className="font-bold text-2xl flex-1 truncate text-slate-800 dark:text-white">{q.questionText[lang]}</p>
                <button onClick={() => { storageService.removeQuestionFromFolder(q.id, activeFolder.id); setActiveFolder({...activeFolder, questions: activeFolder.questions.filter(quest => quest.id !== q.id)}); refresh(); }} className="w-14 h-14 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl ml-6 flex items-center justify-center transition-all">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: Admin Login (Restoration & Message) ---
const AdminLogin: React.FC<{ onLogin: () => void, onCancel: () => void, lang: 'ar'|'en' }> = ({ onLogin, onCancel, lang }) => {
  const t = TRANSLATIONS[lang];
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  
  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 shadow-2xl border border-slate-100 overflow-y-auto max-h-[90vh]">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-[1.5rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl">🔐</div>
          <h2 className="text-3xl font-black mb-4">{t.admin_login}</h2>
          
          {/* New Requested Section */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800 mb-8 text-start">
             <p className="text-amber-600 dark:text-amber-400 font-black text-xl mb-2">يسطا انت بتعمل ايه هنا؟ 😂</p>
             <div className="space-y-1 text-slate-500 dark:text-slate-400 text-sm font-bold">
               <p>يتم العمل علي تطوير الموقع من قبل</p>
               <p className="text-primary font-black">ميلاد ماهر</p>
               <p className="mt-4">لو عندك فكرة تعديل تعاله واتساب</p>
               <p className="text-lg font-black text-slate-800 dark:text-slate-200">01128467630</p>
               
               <a 
                 href="https://wa.me/201128467630" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-4 w-full py-3 bg-green-500 text-white rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-green-200 dark:shadow-none hover:bg-green-600 transition-all active:scale-95"
               >
                 <span>تواصل واتساب</span>
                 <span className="text-lg">💬</span>
               </a>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <input type="text" placeholder={t.username} value={user} onChange={e=>setUser(e.target.value)} className="w-full p-5 rounded-2xl border-2 dark:bg-slate-950 font-bold outline-none focus:border-primary transition-all text-lg" />
          <input type="password" placeholder={t.password} value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-5 rounded-2xl border-2 dark:bg-slate-950 font-bold outline-none focus:border-primary transition-all text-lg" />
          <button onClick={() => user === '1' && pass === '1' ? onLogin() : alert(t.invalid_creds)} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl hover:bg-primary-hover transition-all">{t.login_btn}</button>
          <button onClick={onCancel} className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Admin Dashboard ---
const AdminDashboard: React.FC<{ lang: 'ar'|'en', onExit: () => void, onPreview: () => void, onDataChange: () => void }> = ({ lang, onExit, onPreview, onDataChange }) => {
  const t = TRANSLATIONS[lang];
  const [view, setView] = useState<'manageExams' | 'builder'>('manageExams');
  const [exams, setExams] = useState<Exam[]>(storageService.getCustomExams());
  const refresh = () => setExams(storageService.getCustomExams());
  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-start pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 bg-white dark:bg-slate-900 p-10 rounded-[3rem] soft-shadow border border-slate-100 dark:border-slate-800 gap-8">
        <div><h2 className="text-4xl font-black mb-2">{t.admin_control}</h2><span className="bg-indigo-50 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">{t.admin_badge}</span></div>
        <div className="flex gap-4 w-full lg:w-auto"><button onClick={onPreview} className="flex-1 lg:flex-none px-10 py-4 bg-indigo-50 text-primary rounded-2xl font-black">👀 معاينة</button><button onClick={onExit} className="flex-1 lg:flex-none px-10 py-4 bg-red-500 text-white rounded-2xl font-black shadow-xl">{t.exit_admin}</button></div>
      </div>
      <div className="flex flex-wrap bg-white dark:bg-slate-900 p-2 rounded-[2rem] mb-12 soft-shadow border border-slate-100 w-fit gap-2">
        <button onClick={() => setView('manageExams')} className={`px-10 py-4 rounded-xl font-black transition-all ${view === 'manageExams' ? 'bg-primary text-white shadow-xl' : 'text-slate-400'}`}>📂 إدارة</button>
        <button onClick={() => setView('builder')} className={`px-10 py-4 rounded-xl font-black transition-all ${view === 'builder' ? 'bg-primary text-white shadow-xl' : 'text-slate-400'}`}>✨ إضافة جديد</button>
      </div>
      {view === 'manageExams' && (
        <div className="space-y-6">
          {exams.map(exam => (
            <div key={exam.id} className="modern-card p-10 flex flex-col md:flex-row items-center justify-between group gap-8">
              <div className="flex items-center gap-8 w-full md:w-auto">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-6xl shadow-inner shrink-0">{exam.thumbnail || '📝'}</div>
                <div className="overflow-hidden"><h4 className="text-3xl font-black mb-2 truncate">{exam.title[lang]}</h4><span className="text-xs text-slate-400 font-bold bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">{exam.questions.length} سؤال</span></div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button onClick={() => { storageService.updateExam({...exam, active: !exam.active}); refresh(); onDataChange(); }} className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-black ${exam.active ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>{exam.active ? 'إخفاء' : 'إظهار'}</button>
                <button onClick={() => { if(confirm('حذف؟')) { storageService.deleteExam(exam.id); refresh(); onDataChange(); } }} className="flex-1 md:flex-none px-8 py-4 bg-red-100 text-red-600 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all">🗑️ حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === 'builder' && <ExamBuilder lang={lang} subjects={[]} onSave={(ex) => { storageService.addExam(ex); refresh(); onDataChange(); alert(t.upload_success); setView('manageExams'); }} onCancel={() => setView('manageExams')} />}
    </div>
  );
};

const ExamBuilder: React.FC<{ lang: 'ar' | 'en', subjects: Subject[], onSave: (exam: Exam) => void, onCancel: () => void }> = ({ lang, onSave, onCancel }) => {
  const [info, setInfo] = useState({ title: '', thumbnail: '📝' });
  const [qs, setQs] = useState<Question[]>([]);
  const [cur, setCur] = useState<Partial<Question>>({ type: 'multiple-choice', options: [{ar:'',en:''}, {ar:'',en:''}] });
  const add = () => { if(!cur.questionText?.ar || cur.correctAnswer === undefined) return alert('بيانات ناقصة'); setQs([...qs, {...cur, id: Date.now().toString()} as Question]); setCur({ type: 'multiple-choice', options: [{ar:'',en:''}, {ar:'',en:''}] }); };
  return (
    <div className="space-y-12 animate-slide-up">
      <div className="modern-card p-10 text-start">
        <h3 className="text-3xl font-black mb-8">بيانات الاختبار</h3>
        <input value={info.title} onChange={e=>setInfo({...info, title:e.target.value})} className="w-full p-6 border-2 rounded-3xl mb-6 font-bold outline-none focus:border-primary dark:bg-slate-950 text-2xl" placeholder="عنوان الاختبار" />
        <input value={info.thumbnail} onChange={e=>setInfo({...info, thumbnail:e.target.value})} className="w-full p-6 border-2 rounded-3xl font-bold outline-none focus:border-primary dark:bg-slate-950 text-2xl" placeholder="Emoji or Image URL" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="modern-card p-10 text-start">
          <h3 className="text-3xl font-black mb-10">إضافة سؤال</h3>
          <textarea value={cur.questionText?.ar} onChange={e=>setCur({...cur, questionText:{ar:e.target.value,en:e.target.value}})} className="w-full p-6 border-2 rounded-3xl mb-8 h-48 outline-none focus:border-primary dark:bg-slate-950 font-bold text-xl" placeholder="نص السؤال..." />
          <div className="flex gap-2 mb-10">
            {(['multiple-choice', 'true-false', 'fill-in-the-blank'] as QuestionType[]).map(tp => (
               <button key={tp} onClick={() => setCur({...cur, type: tp, options: tp === 'multiple-choice' ? [{ar:'',en:''}, {ar:'',en:''}] : undefined})} className={`flex-1 py-4 rounded-xl font-black text-xs transition-all ${cur.type === tp ? 'bg-primary text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>{TRANSLATIONS[lang][tp === 'multiple-choice' ? 'mcq' : tp === 'true-false' ? 'tf' : 'fill']}</button>
            ))}
          </div>
          {cur.type === 'multiple-choice' && cur.options?.map((opt, i) => (
            <div key={i} className="flex gap-4 mb-4 items-center">
              <input type="radio" name="correct" className="w-8 h-8 accent-primary" checked={cur.correctAnswer === String(i)} onChange={()=>setCur({...cur, correctAnswer: String(i)})} />
              <input value={opt.ar} onChange={e=>{const n=[...cur.options!];n[i]={ar:e.target.value,en:e.target.value};setCur({...cur, options:n})}} className="flex-1 p-4 border-2 rounded-2xl font-bold text-lg dark:bg-slate-950" placeholder={`الخيار ${i+1}`} />
            </div>
          ))}
          {cur.type === 'fill-in-the-blank' && <input value={cur.correctAnswer} onChange={e=>setCur({...cur, correctAnswer:e.target.value})} className="w-full p-6 border-2 rounded-3xl font-bold focus:border-primary dark:bg-slate-950 text-2xl" placeholder="الإجابة الصحيحة" />}
          <button onClick={add} className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-2xl mt-10 shadow-2xl transition-all">إضافة السؤال</button>
        </div>
        <div className="flex flex-col">
          <h3 className="text-3xl font-black mb-8 px-4 text-start">مراجعة الأسئلة ({qs.length})</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto px-4 custom-scrollbar flex-1 pb-10">
            {qs.map((q,i)=>(
              <div key={i} className="p-6 bg-white dark:bg-slate-900 border-2 rounded-[2rem] flex justify-between items-center group shadow-sm hover:border-primary transition-all">
                <p className="font-bold flex-1 truncate text-xl text-start">{q.questionText[lang]}</p>
                <button onClick={() => setQs(qs.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 font-black text-3xl ml-4 p-2 transition-all">✕</button>
              </div>
            ))}
          </div>
          <button onClick={()=>onSave({id:Date.now().toString(), subjectId:'custom', title:{ar:info.title,en:info.title}, thumbnail:info.thumbnail, questions:qs, active:true})} className="mt-10 py-8 bg-green-500 text-white rounded-[3rem] font-black text-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all">حفظ الاختبار ونشره</button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const [activeView, setActiveView] = useState<'home' | 'exam' | 'results' | 'admin' | 'saved' | 'stats'>('home');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [customExams, setCustomExams] = useState<Exam[]>(storageService.getCustomExams());

  useEffect(() => {
    const config = storageService.getThemeConfig();
    document.documentElement.style.setProperty('--color-primary', config.primary);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') { root.classList.add('dark'); root.classList.remove('light'); }
    else { root.classList.add('light'); root.classList.remove('dark'); }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setActiveView('exam');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-['IBM_Plex_Sans_Arabic',sans-serif]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveView('home')}>
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg text-2xl group-hover:rotate-6 transition-transform">🎓</div>
          <h1 className="text-2xl font-black tracking-tight leading-none hidden xs:block">AI Exam Pro</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setActiveView('stats')} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all ${activeView === 'stats' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800'}`}>📊 التقدم</button>
          <button onClick={() => setActiveView('saved')} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all ${activeView === 'saved' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800'}`}>📁 المواد</button>
          <button onClick={() => isAdmin ? setActiveView('admin') : setShowLogin(true)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all">🔑</button>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">{theme === 'light' ? '🌙' : '☀️'}</button>
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-5 py-3 rounded-2xl bg-primary text-white text-xs font-black shadow-lg">{TRANSLATIONS[lang].langToggle}</button>
        </div>
      </nav>

      <main className="py-12 px-4 max-w-7xl mx-auto min-h-[80vh]">
        {showLogin && <AdminLogin lang={lang} onLogin={() => { setIsAdmin(true); setShowLogin(false); setActiveView('admin'); }} onCancel={()=>setShowLogin(false)} />}
        
        {activeView === 'home' && (
          <div className="animate-fade-in text-start px-6">
            <h2 className="text-4xl sm:text-6xl font-black mb-12">{TRANSLATIONS[lang].dashboard}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {customExams.filter(e => e.active).map(exam => (
                <div key={exam.id} className="modern-card p-12 soft-shadow flex flex-col group hover:-translate-y-3 transition-all border-2 border-transparent hover:border-primary/20">
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-7xl mb-10 overflow-hidden shadow-inner group-hover:rotate-6 transition-transform">
                    {exam.thumbnail || '📝'}
                  </div>
                  <h3 className="text-3xl font-black mb-8 leading-tight group-hover:text-primary transition-all">{exam.title[lang]}</h3>
                  <button onClick={() => handleStartExam(exam)} className="w-full py-6 bg-primary text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-primary-hover transition-all">
                    {TRANSLATIONS[lang].startExam}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'exam' && activeExam && (
          <ExamPlayer 
            exam={activeExam} 
            lang={lang} 
            onFinish={(res) => { storageService.saveResult(res); setLastResult({...res, date: Date.now()}); storageService.clearSession(); setActiveView('results'); }} 
            onCancel={() => { if(confirm('إنهاء الاختبار؟')) setActiveView('home'); }} 
          />
        )}

        {activeView === 'results' && lastResult && (
          <ResultsPage result={lastResult} lang={lang} onHome={() => setActiveView('home')} />
        )}

        {activeView === 'saved' && <SavedQuestionsView lang={lang} onStartPractice={handleStartExam} />}
        {activeView === 'stats' && <StatisticsView lang={lang} />}
        {activeView === 'admin' && <AdminDashboard lang={lang} onExit={() => { setActiveView('home'); setCustomExams(storageService.getCustomExams()); }} onPreview={() => setActiveView('home')} onDataChange={() => setCustomExams(storageService.getCustomExams())} />}
      </main>
    </div>
  );
};

// --- View: Exam Player ---
const ExamPlayer: React.FC<{ exam: Exam, lang: 'ar'|'en', onFinish: (res: any) => void, onCancel: () => void }> = ({ exam, lang, onFinish, onCancel }) => {
  const t = TRANSLATIONS[lang];
  const [session, setSession] = useState<ExamSession>(() => {
    const existing = storageService.getActiveSession();
    if (existing && existing.exam.id === exam.id) return existing;
    return { exam, currentIndex: 0, userAnswers: {}, feedback: {}, startTime: Date.now() };
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  
  const q = exam.questions[session.currentIndex];

  useEffect(() => {
    storageService.saveSession(session);
    const reviewFolder = storageService.getSavedFolders().find(f => f.isDefault);
    setIsStarred(!!reviewFolder?.questions.some(item => item.id === q.id));
  }, [session, q.id]);

  const toggleStar = () => {
    const reviewFolder = storageService.getSavedFolders().find(f => f.isDefault);
    if(!reviewFolder) return;
    if(isStarred) {
      storageService.removeQuestionFromFolder(q.id, reviewFolder.id);
      setIsStarred(false);
    } else {
      storageService.saveQuestionToFolder(q, reviewFolder.id);
      setIsStarred(true);
    }
  };

  const validate = async (val: string) => {
    if (session.feedback[q.id]?.isChecked || !val.trim()) return;
    setIsChecking(true);
    let isCorrect = q.type === 'fill-in-the-blank' 
      ? (await aiService.checkSemanticSimilarity(val, q.correctAnswer)) >= 75 
      : String(val) === String(q.correctAnswer);
    
    setSession(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [q.id]: val },
      feedback: { ...prev.feedback, [q.id]: { isCorrect, isChecked: true } }
    }));
    setIsChecking(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in text-start flex flex-col min-h-[80vh]">
      <div className="flex justify-between items-center mb-10 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <button onClick={onCancel} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center font-black">✕</button>
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black text-primary bg-indigo-50 px-8 py-3 rounded-[1.5rem]">{session.currentIndex + 1} / {exam.questions.length}</span>
          <button 
            onClick={toggleStar} 
            className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl transition-all shadow-sm ${isStarred ? 'bg-amber-400 text-white' : 'bg-amber-50 text-amber-500'}`}
          >
            {isStarred ? '★' : '☆'}
          </button>
        </div>
        <div className="w-14"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 max-h-24 overflow-y-auto p-2 custom-scrollbar">
        {exam.questions.map((quest, idx) => {
          const fb = session.feedback[quest.id];
          const isCurr = idx === session.currentIndex;
          let bgColor = "bg-slate-200 dark:bg-slate-800";
          if (fb?.isChecked) bgColor = fb.isCorrect ? "bg-green-500 shadow-lg" : "bg-red-500 shadow-lg";
          else if (isCurr) bgColor = "bg-primary scale-125 shadow-xl";
          return <div key={idx} className={`flex-1 min-w-[10px] h-3 rounded-full transition-all duration-300 ${bgColor}`} />;
        })}
      </div>

      <div className={`flex-1 modern-card p-10 sm:p-14 mb-10 transition-all duration-500 border-2 ${!session.feedback[q.id]?.isChecked ? 'active-question-glow border-primary/30' : 'border-slate-100 dark:border-slate-800'}`}>
        <h2 className="text-2xl sm:text-4xl font-black mb-12 text-slate-800 dark:text-white leading-tight text-center min-h-[120px]">{q.questionText[lang]}</h2>
        <div className="space-y-6">
          {q.type !== 'fill-in-the-blank' ? q.options?.map((opt, idx) => {
            const isSel = session.userAnswers[q.id] === String(idx);
            let style = "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800";
            if (isSel) style = session.feedback[q.id]?.isChecked ? (session.feedback[q.id].isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500") : "bg-indigo-50 border-primary scale-[1.02] shadow-2xl";
            else if (session.feedback[q.id]?.isChecked && String(idx) === String(q.correctAnswer)) style = "border-green-300 opacity-60";
            return (
              <button key={idx} disabled={session.feedback[q.id]?.isChecked} onClick={() => validate(String(idx))} className={`w-full p-8 text-start rounded-[2rem] border-2 transition-all flex items-center gap-8 ${style}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all ${isSel ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>{String.fromCharCode(65+idx)}</div>
                <span className="font-black text-2xl">{opt[lang]}</span>
              </button>
            );
          }) : (
            <div className="space-y-10 text-center max-w-2xl mx-auto">
              <input disabled={session.feedback[q.id]?.isChecked} value={session.userAnswers[q.id] || ''} onChange={e => setSession({...session, userAnswers: {...session.userAnswers, [q.id]: e.target.value}})} className="w-full p-10 text-4xl font-black rounded-[3.5rem] border-4 text-center dark:bg-slate-950 focus:border-primary outline-none transition-all shadow-inner" placeholder="اكتب إجابتك هنا..." autoFocus />
              {!session.feedback[q.id]?.isChecked && <button onClick={() => validate(session.userAnswers[q.id] || '')} className="w-full py-8 bg-primary text-white rounded-[2.5rem] font-black text-3xl shadow-2xl hover:scale-105 transition-all">تحقق من الإجابة</button>}
            </div>
          )}
          {session.feedback[q.id]?.isChecked && !session.feedback[q.id].isCorrect && (
            <div className="p-10 bg-indigo-50 dark:bg-indigo-900/10 rounded-[3rem] border-4 border-indigo-100 mt-10 animate-fade-in shadow-inner">
              <span className="text-[10px] font-black text-indigo-400 uppercase mb-4 block tracking-widest">{t.correctAnswer}:</span>
              <p className="text-4xl font-black text-indigo-700 dark:text-indigo-300 leading-relaxed">{q.type === 'fill-in-the-blank' ? q.correctAnswer : q.options?.[Number(q.correctAnswer)]?.[lang]}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8 mt-auto pb-10">
        <button disabled={session.currentIndex === 0} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex - 1}))} className="flex-1 py-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 font-black text-2xl hover:bg-slate-50 transition-all disabled:opacity-20">← السابق</button>
        {session.currentIndex === exam.questions.length - 1 ? (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => onFinish({ examId: exam.id, subjectId: exam.subjectId, score: Math.round(((Object.values(session.feedback) as any).filter((f:any) => f.isCorrect).length / exam.questions.length) * 100), timeSpent: Math.floor((Date.now()-session.startTime)/1000), answers: exam.questions.map(quest => ({ questionId: quest.id, questionData: quest, userAnswer: session.userAnswers[quest.id] || '', isCorrect: session.feedback[quest.id]?.isCorrect || false })) })} className="flex-[2] py-8 rounded-[2.5rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-3xl shadow-2xl disabled:opacity-30">إنهاء الاختبار ✅</button>
        ) : (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex + 1}))} className="flex-[2] py-8 rounded-[2.5rem] bg-primary text-white font-black text-3xl shadow-2xl disabled:opacity-30">السؤال التالي →</button>
        )}
      </div>
      {isChecking && <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md z-[2000] flex flex-col items-center justify-center animate-fade-in"><div className="w-28 h-28 border-8 border-primary border-t-transparent rounded-full animate-spin mb-10 shadow-2xl"></div><p className="font-black text-6xl text-primary animate-pulse">{t.checking}</p></div>}
    </div>
  );
};

export default App;
