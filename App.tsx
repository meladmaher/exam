
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] p-10 shadow-2xl border border-white/20">
        <h3 className="text-3xl font-black mb-8 text-center">{lang === 'ar' ? 'إنشاء مادة جديدة' : 'Create New Subject'}</h3>
        
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
              {lang === 'ar' ? 'اسم المادة' : 'Subject Name'}
            </label>
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-bold text-xl transition-all"
              placeholder={lang === 'ar' ? 'مثال: ريادة أعمال' : 'e.g. History'}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
              {lang === 'ar' ? 'اختر أيقونة' : 'Choose Icon'}
            </label>
            <div className="grid grid-cols-6 gap-3">
              {icons.map(i => (
                <button 
                  key={i} 
                  onClick={() => setIcon(i)}
                  className={`text-2xl p-3 rounded-xl transition-all ${icon === i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black hover:bg-slate-200 transition-all">
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button 
              disabled={!name.trim()}
              onClick={() => onSave(name.trim(), icon)}
              className="flex-[2] py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
            >
              {lang === 'ar' ? 'إنشاء المادة' : 'Create Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Saved Folders (Files) ---
const SavedQuestionsView: React.FC<{ lang: 'ar'|'en', onStartPractice: (exam: Exam) => void }> = ({ lang, onStartPractice }) => {
  const t = TRANSLATIONS[lang];
  const [folders, setFolders] = useState<SavedFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState<SavedFolder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFolders(storageService.getSavedFolders());
  }, []);

  const handleCreateFolder = (name: string, icon: string) => {
    storageService.addFolder(name, icon);
    setFolders(storageService.getSavedFolders()); 
    setIsModalOpen(false);
  };

  const handleDeleteFolder = (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه المادة؟ سيتم حذف جميع الأسئلة المحفوظة بها.' : 'Delete this subject? All saved questions will be lost.')) {
      storageService.deleteFolder(id);
      setFolders(storageService.getSavedFolders());
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in text-start">
      {isModalOpen && (
        <CreateFolderModal 
          lang={lang} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleCreateFolder} 
        />
      )}

      {!activeFolder ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-2">{t.saved_questions}</h2>
              <p className="text-slate-400 font-bold">{lang === 'ar' ? 'موادك العلمية وأسئلتك المحفوظة' : 'Your subjects and saved questions'}</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              + {t.create_folder}
            </button>
          </div>

          {folders.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
               <div className="text-8xl mb-6 opacity-20">📁</div>
               <p className="text-2xl font-black text-slate-300">{lang === 'ar' ? 'لا توجد مواد مضافة بعد' : 'No subjects added yet'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {folders.map(f => (
                <div key={f.id} onClick={() => setActiveFolder(f)} className="modern-card p-10 soft-shadow cursor-pointer hover:border-primary transition-all group relative border-2 border-transparent text-center hover:-translate-y-2">
                  <div className="text-7xl mb-6 transition-transform group-hover:scale-110 drop-shadow-xl">{f.icon}</div>
                  <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-all">{f.name}</h3>
                  <p className="text-slate-400 font-bold bg-slate-50 dark:bg-slate-800 w-fit mx-auto px-4 py-1 rounded-full text-xs">
                    {f.questions.length} {lang === 'ar' ? 'سؤال' : 'questions'}
                  </p>
                  
                  {!f.isDefault && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteFolder(f.id); }} 
                      className="absolute top-6 right-6 w-10 h-10 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="animate-slide-up">
          <button onClick={() => setActiveFolder(null)} className="mb-8 flex items-center gap-3 text-primary font-black hover:gap-5 transition-all">
             <span className="p-2 bg-indigo-50 rounded-xl">←</span> {lang === 'ar' ? 'العودة للملفات' : 'Back to Folders'}
          </button>
          <div className="modern-card p-10 mb-10 border-r-8 border-primary flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-8">
               <span className="text-8xl drop-shadow-2xl">{activeFolder.icon}</span>
               <div>
                 <h3 className="text-4xl font-black mb-2">{activeFolder.name}</h3>
                 <p className="text-slate-400 font-bold">{activeFolder.questions.length} سؤال متاح للمراجعة</p>
               </div>
             </div>
             <button 
               disabled={activeFolder.questions.length === 0} 
               onClick={() => onStartPractice({ 
                 id: 'pr_'+activeFolder.id, 
                 subjectId: 'practice', 
                 title: { ar: 'مراجعة: ' + activeFolder.name, en: 'Review: ' + activeFolder.name }, 
                 questions: activeFolder.questions, 
                 active: true, 
                 thumbnail: activeFolder.icon 
               })} 
               className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
             >
               🚀 {t.practice_folder}
             </button>
          </div>
          <div className="space-y-6">
            {activeFolder.questions.map((q, i) => (
              <div key={q.id} className="modern-card p-8 flex justify-between items-center group shadow-sm hover:border-primary transition-all">
                <div className="flex-1 text-start">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">{i+1}</span>
                    <span className="text-[10px] bg-indigo-50 text-primary px-3 py-1 rounded-lg font-black uppercase tracking-widest">
                      {t[q.type === 'multiple-choice' ? 'mcq' : q.type === 'true-false' ? 'tf' : 'fill']}
                    </span>
                  </div>
                  <p className="font-bold text-2xl leading-relaxed text-slate-800 dark:text-white mb-4">{q.questionText[lang]}</p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
                     <span className="text-xs font-black text-slate-400 block mb-1 uppercase tracking-tighter">{t.correctAnswer}</span>
                     <p className="font-black text-primary text-xl">
                       {q.type === 'fill-in-the-blank' ? q.correctAnswer : (q.options ? q.options[Number(q.correctAnswer)][lang] : '')}
                     </p>
                  </div>
                </div>
                <button 
                  onClick={() => { 
                    storageService.removeQuestionFromFolder(q.id, activeFolder.id); 
                    const updated = storageService.getSavedFolders().find(f => f.id === activeFolder.id) || null;
                    setActiveFolder(updated);
                    setFolders(storageService.getSavedFolders());
                  }} 
                  className="w-14 h-14 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all ml-6"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: Statistics ---
const StatisticsView: React.FC<{ lang: 'ar'|'en' }> = ({ lang }) => {
  const stats = storageService.getStats();
  const exams = storageService.getCustomExams();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const history = selectedSubject === 'all' 
    ? stats.history 
    : stats.history.filter(h => h.subjectId === selectedSubject);

  const frequentMistakes = Object.values(stats.mistakesTracker)
    .sort((a, b) => b.count - a.count)
    .filter(m => selectedSubject === 'all' || m.question.subjectId === selectedSubject)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2">{lang === 'ar' ? 'إحصائيات التقدم' : 'Progress Stats'}</h2>
          <p className="text-slate-400 font-bold">{lang === 'ar' ? 'نظرة شاملة على مستواك الدراسي' : 'Overview of your academic level'}</p>
        </div>
        <select 
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-4 bg-white dark:bg-slate-900 border-2 rounded-2xl font-black outline-none border-primary/20 focus:border-primary transition-all shadow-sm"
        >
          <option value="all">{lang === 'ar' ? 'جميع المواد' : 'All Subjects'}</option>
          {exams.map(e => <option key={e.id} value={e.id}>{e.title[lang]}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 modern-card p-10 soft-shadow border-t-8 border-primary">
          <h3 className="text-2xl font-black mb-6">📈 {lang === 'ar' ? 'تاريخ الدرجات' : 'Score History'}</h3>
          {history.length === 0 ? (
            <p className="py-20 text-center text-slate-400 font-bold">لا توجد اختبارات مكتملة حتى الآن</p>
          ) : (
            <div className="space-y-4">
              {history.slice().reverse().map((h, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">{i+1}</div>
                    <div>
                      <p className="font-black text-slate-700 dark:text-slate-200">{exams.find(ex => ex.id === h.subjectId)?.title[lang] || 'اختبار مخصص'}</p>
                      <p className="text-xs text-slate-400 font-bold">{new Date(h.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
                    </div>
                  </div>
                  <span className={`text-2xl font-black ${h.score >= 50 ? 'text-green-500' : 'text-red-500'}`}>{h.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modern-card p-10 soft-shadow border-t-8 border-red-500">
          <h3 className="text-2xl font-black mb-6">⚠️ {lang === 'ar' ? 'أكثر الأخطاء' : 'Top Mistakes'}</h3>
          {frequentMistakes.length === 0 ? (
            <p className="text-center text-slate-400 py-10 font-bold">كل شيء رائع! لا أخطاء متكررة</p>
          ) : (
            <div className="space-y-6">
              {frequentMistakes.map((m, i) => (
                <div key={i} className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded font-black">{lang === 'ar' ? `تكرر ${m.count} مرات` : `${m.count} times`}</span>
                  </div>
                  <p className="text-sm font-bold leading-relaxed">{m.question.questionText[lang]}</p>
                </div>
              ))}
            </div>
          )}
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
  const [resumeSession, setResumeSession] = useState<ExamSession | null>(null);

  useEffect(() => {
    const config = storageService.getThemeConfig();
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.primary);
    root.style.setProperty('--color-primary-hover', config.primary + 'ee');
    root.style.setProperty('--color-primary-rgb', hexToRgb(config.primary));
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') { root.classList.add('dark'); root.classList.remove('light'); }
    else { root.classList.add('light'); root.classList.remove('dark'); }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const session = storageService.getActiveSession();
    if (session) setResumeSession(session);
    setCustomExams(storageService.getCustomExams());
  }, []);

  const handleStartExam = (exam: Exam, sessionToResume?: ExamSession) => {
    setActiveExam(exam);
    setActiveView('exam');
    setResumeSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-['IBM_Plex_Sans_Arabic',sans-serif]">
      {resumeSession && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[1000] flex items-center justify-center p-6 animate-fade-in text-center">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-12 shadow-2xl border-4 border-primary/20 scale-105">
             <div className="text-[120px] mb-8 animate-bounce">🕰️</div>
             <h3 className="text-4xl font-black mb-6">{lang === 'ar' ? 'إكمال الاختبار؟' : 'Continue Exam?'}</h3>
             <p className="text-slate-400 font-bold mb-12 text-xl leading-relaxed">{lang === 'ar' ? `لديك جلسة سابقة في اختبار "${resumeSession.exam.title[lang]}" هل ترغب في إكمالها؟` : `You have an active session for "${resumeSession.exam.title[lang]}". Continue?`}</p>
             <div className="grid grid-cols-2 gap-6">
                <button onClick={() => { storageService.clearSession(); setResumeSession(null); }} className="py-6 bg-slate-100 dark:bg-slate-800 rounded-[2rem] font-black text-xl hover:bg-slate-200 transition-all">{lang === 'ar' ? 'بدء جديد' : 'Restart'}</button>
                <button onClick={() => handleStartExam(resumeSession.exam, resumeSession)} className="py-6 bg-primary text-white rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all">{lang === 'ar' ? 'متابعة' : 'Resume'}</button>
             </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveView('home')}>
          <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-2xl">🎓</div>
          <h1 className="text-2xl font-black tracking-tight leading-none hidden sm:block">AI <span className="text-primary">Exam</span> Pro</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setActiveView('stats')} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${activeView === 'stats' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 hover:bg-slate-200'}`}>📊 {lang === 'ar' ? 'التقدم' : 'Stats'}</button>
          <button onClick={() => setActiveView('saved')} className={`px-5 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${activeView === 'saved' ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 hover:bg-slate-200'}`}>📁 {lang === 'ar' ? 'المواد' : 'Files'}</button>
          <button onClick={() => isAdmin ? setActiveView('admin') : setShowLogin(true)} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">🔑</button>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">{theme === 'light' ? '🌙' : '☀️'}</button>
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-8 py-3 rounded-2xl bg-primary text-white text-sm font-black shadow-xl hover:scale-105 transition-all">{TRANSLATIONS[lang].langToggle}</button>
        </div>
      </nav>

      <main className="py-12 px-4 relative max-w-7xl mx-auto min-h-[80vh]">
        {showLogin && <AdminLogin lang={lang} onLogin={() => { setIsAdmin(true); setShowLogin(false); setActiveView('admin'); }} onCancel={()=>setShowLogin(false)} />}
        
        {activeView === 'home' && (
          <div className="animate-fade-in text-start px-6">
            <h2 className="text-6xl font-black mb-12">{TRANSLATIONS[lang].dashboard}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {customExams.filter(e => e.active).map(exam => (
                <div key={exam.id} className="modern-card p-12 soft-shadow flex flex-col group hover:-translate-y-3 transition-all border-2 border-transparent hover:border-primary/20">
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-7xl mb-10 overflow-hidden shadow-inner group-hover:rotate-6 transition-transform">
                    {exam.thumbnail?.startsWith('data:') ? <img src={exam.thumbnail} className="w-full h-full object-cover" /> : exam.thumbnail || '📝'}
                  </div>
                  <h3 className="text-3xl font-black mb-4 leading-tight group-hover:text-primary transition-all">{exam.title[lang]}</h3>
                  <button onClick={() => handleStartExam(exam)} className="w-full py-6 bg-primary text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-primary/20 hover:bg-primary-hover transition-all">
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
            onCancel={() => { if(confirm(lang==='ar'?'إنهاء الاختبار سيفقدك تقدمك الحالي؟':'Quit exam and lose progress?')){ storageService.clearSession(); setActiveView('home'); } }} 
          />
        )}

        {activeView === 'results' && lastResult && (
          <ResultsPage result={lastResult} lang={lang} onHome={() => setActiveView('home')} />
        )}

        {activeView === 'saved' && (
          <SavedQuestionsView lang={lang} onStartPractice={(exam) => handleStartExam(exam)} />
        )}

        {activeView === 'stats' && <StatisticsView lang={lang} />}

        {activeView === 'admin' && (
          <AdminDashboard lang={lang} onExit={() => { setActiveView('home'); setCustomExams(storageService.getCustomExams()); }} onPreview={() => setActiveView('home')} onDataChange={() => setCustomExams(storageService.getCustomExams())} />
        )}
      </main>
    </div>
  );
};

// --- View: Exam Player (Segmented Blocks Progress) ---
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
    // Check if current question is starred in default Review folder
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
    <div className="max-w-4xl mx-auto p-6 animate-fade-in text-start flex flex-col min-h-[80vh]">
      <div className="flex justify-between items-center mb-10 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <button onClick={onCancel} className="w-14 h-14 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">✕</button>
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black text-primary bg-indigo-50 px-8 py-3 rounded-[1.5rem]">{session.currentIndex + 1} / {exam.questions.length}</span>
          <button 
            onClick={toggleStar} 
            className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl transition-all shadow-sm ${isStarred ? 'bg-amber-400 text-white' : 'bg-amber-50 text-amber-500 hover:bg-amber-100'}`}
          >
            {isStarred ? '★' : '☆'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {exam.questions.map((quest, idx) => {
          const fb = session.feedback[quest.id];
          const isCurr = idx === session.currentIndex;
          
          let bgColor = "bg-slate-200 dark:bg-slate-800";
          let border = "border-transparent";
          let pulse = "";
          
          if (fb?.isChecked) {
            bgColor = fb.isCorrect ? "bg-green-500 shadow-green-200 shadow-lg" : "bg-red-500 shadow-red-200 shadow-lg";
          } else if (isCurr) {
            bgColor = "bg-primary shadow-primary/30 shadow-xl";
            pulse = "animate-pulse scale-y-125";
            border = "border-white/20";
          }

          return (
            <div 
              key={idx} 
              className={`flex-1 min-w-[14px] h-3 rounded-full transition-all duration-300 ${bgColor} ${border} ${pulse}`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>

      <div className={`flex-1 modern-card p-12 mb-10 transition-all duration-500 ${!session.feedback[q.id]?.isChecked ? 'active-question-glow border-primary/30' : 'border-slate-100 dark:border-slate-800'}`}>
        <h2 className="text-4xl font-black mb-12 text-slate-800 dark:text-white leading-tight min-h-[140px]">{q.questionText[lang]}</h2>
        <div className="space-y-6">
          {q.type !== 'fill-in-the-blank' ? q.options?.map((opt, idx) => {
            const isSel = session.userAnswers[q.id] === String(idx);
            let style = "border-slate-100 dark:border-slate-800 bg-slate-50/50";
            if (isSel) style = session.feedback[q.id]?.isChecked ? (session.feedback[q.id].isCorrect ? "border-green-500 bg-green-50 shadow-green-100 shadow-lg" : "border-red-500 bg-red-50 shadow-red-100 shadow-lg") : "border-primary bg-indigo-50 shadow-xl shadow-primary/10 scale-[1.02]";
            else if (session.feedback[q.id]?.isChecked && String(idx) === String(q.correctAnswer)) style = "border-green-300 opacity-60";
            return (
              <button key={idx} disabled={session.feedback[q.id]?.isChecked} onClick={() => validate(String(idx))} className={`w-full p-8 text-start rounded-[2.5rem] border-2 transition-all flex items-center gap-6 ${style}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all ${isSel ? 'text-white bg-primary shadow-lg' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>{String.fromCharCode(65+idx)}</div>
                <span className="font-bold text-2xl">{opt[lang]}</span>
              </button>
            );
          }) : (
            <div className="space-y-10 text-center max-w-2xl mx-auto">
              <input disabled={session.feedback[q.id]?.isChecked} value={session.userAnswers[q.id] || ''} onChange={e => setSession({...session, userAnswers: {...session.userAnswers, [q.id]: e.target.value}})} className="w-full p-10 text-5xl font-black rounded-[3.5rem] border-4 text-center dark:bg-slate-950 focus:border-primary outline-none transition-all shadow-inner" placeholder={lang === 'ar' ? 'اكتب إجابتك...' : 'Type here...'} autoFocus />
              {!session.feedback[q.id]?.isChecked && <button onClick={() => validate(session.userAnswers[q.id] || '')} className="w-full py-8 bg-primary text-white rounded-[2.5rem] font-black text-3xl shadow-2xl hover:scale-[1.02] transition-all">{t.check}</button>}
            </div>
          )}
          {session.feedback[q.id]?.isChecked && !session.feedback[q.id].isCorrect && (
            <div className="p-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-[3rem] border-4 border-indigo-100 dark:border-indigo-900 animate-fade-in mt-10 shadow-inner">
              <span className="text-xs font-black text-indigo-400 uppercase mb-4 block tracking-widest">{t.correctAnswer}:</span>
              <p className="text-4xl font-black text-indigo-700 dark:text-indigo-300 leading-relaxed">{q.type === 'fill-in-the-blank' ? q.correctAnswer : q.options?.[Number(q.correctAnswer)]?.[lang]}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8 mt-auto">
        <button disabled={session.currentIndex === 0} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex - 1}))} className="flex-1 py-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 font-black text-2xl hover:bg-slate-50 transition-all disabled:opacity-20">← {t.previous}</button>
        {session.currentIndex === exam.questions.length - 1 ? (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => onFinish({ examId: exam.id, subjectId: exam.subjectId, score: Math.round(((Object.values(session.feedback) as any).filter((f:any) => f.isCorrect).length / exam.questions.length) * 100), timeSpent: Math.floor((Date.now()-session.startTime)/1000), answers: exam.questions.map(quest => ({ questionId: quest.id, questionData: quest, userAnswer: session.userAnswers[quest.id] || '', isCorrect: session.feedback[quest.id]?.isCorrect || false })) })} className="flex-[2] py-8 rounded-[2.5rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-3xl shadow-2xl hover:scale-105 transition-all disabled:opacity-30">{t.submit} ✅</button>
        ) : (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex + 1}))} className="flex-[2] py-8 rounded-[2.5rem] bg-primary text-white font-black text-3xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-30">{t.next} →</button>
        )}
      </div>
      {isChecking && <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md z-[2000] flex flex-col items-center justify-center animate-fade-in"><div className="w-28 h-28 border-8 border-primary border-t-transparent rounded-full animate-spin mb-10 shadow-2xl shadow-primary/20"></div><p className="font-black text-6xl text-primary animate-pulse">{t.checking}</p></div>}
    </div>
  );
};

// ... باقي المكونات (ResultsPage, AdminLogin, AdminDashboard, ExamBuilder) تظل كما هي ...
const ResultsPage: React.FC<{ result: ExamResult, lang: 'ar'|'en', onHome: () => void }> = ({ result, lang, onHome }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in text-center flex flex-col items-center">
      <div className="p-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-[6rem] text-[160px] mb-12 animate-bounce shadow-2xl shadow-primary/10">🏆</div>
      <h2 className="text-8xl font-black mb-16 text-slate-800 dark:text-white">{t.score}: <span className="text-primary">{result.score}%</span></h2>
      <div className="grid grid-cols-2 gap-8 mb-16 w-full max-w-2xl">
         <div className="modern-card p-10 border-b-8 border-green-500"><p className="text-sm font-black text-slate-400 uppercase mb-2">{t.correctAnswers}</p><p className="text-5xl font-black text-green-500">{result.answers.filter(a => a.isCorrect).length}</p></div>
         <div className="modern-card p-10 border-b-8 border-red-500"><p className="text-sm font-black text-slate-400 uppercase mb-2">{t.wrongAnswers}</p><p className="text-5xl font-black text-red-500">{result.answers.filter(a => !a.isCorrect).length}</p></div>
      </div>
      <button onClick={onHome} className="w-full max-w-2xl py-10 bg-primary text-white rounded-[3.5rem] font-black text-4xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
        {t.backToHome}
      </button>
    </div>
  );
};

const AdminLogin: React.FC<{ onLogin: () => void, onCancel: () => void, lang: 'ar'|'en' }> = ({ onLogin, onCancel, lang }) => {
  const t = TRANSLATIONS[lang];
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3.5rem] p-12 shadow-2xl border border-slate-100">
        <div className="text-center mb-12"><div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl">🔐</div><h2 className="text-4xl font-black">{t.admin_login}</h2></div>
        <div className="space-y-6">
          <input type="text" placeholder={t.username} value={user} onChange={e=>setUser(e.target.value)} className="w-full p-6 rounded-2xl border-2 dark:bg-slate-950 font-bold outline-none focus:border-primary transition-all" />
          <input type="password" placeholder={t.password} value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-6 rounded-2xl border-2 dark:bg-slate-950 font-bold outline-none focus:border-primary transition-all" />
          <button onClick={() => user === '1' && pass === '1' ? onLogin() : alert(t.invalid_creds)} className="w-full py-6 bg-primary text-white rounded-2xl font-black text-2xl shadow-xl hover:bg-primary-hover transition-all">{t.login_btn}</button>
          <button onClick={onCancel} className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-sm">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ lang: 'ar'|'en', onExit: () => void, onPreview: () => void, onDataChange: () => void }> = ({ lang, onExit, onPreview, onDataChange }) => {
  const t = TRANSLATIONS[lang];
  const [view, setView] = useState<'manageExams' | 'builder'>('manageExams');
  const [exams, setExams] = useState<Exam[]>(storageService.getCustomExams());
  const refresh = () => setExams(storageService.getCustomExams());
  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in text-start pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] soft-shadow border border-slate-100 dark:border-slate-800 gap-10">
        <div><h2 className="text-5xl font-black mb-4">{t.admin_control}</h2><span className="bg-indigo-50 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">{t.admin_badge}</span></div>
        <div className="flex gap-4 w-full lg:w-auto"><button onClick={onPreview} className="flex-1 lg:flex-none px-12 py-5 bg-indigo-50 text-primary rounded-2xl font-black hover:bg-indigo-100 transition-all">👀 {lang === 'ar' ? 'معاينة' : 'Preview'}</button><button onClick={onExit} className="flex-1 lg:flex-none px-12 py-5 bg-red-500 text-white rounded-2xl font-black shadow-xl hover:bg-red-600 transition-all">{t.exit_admin}</button></div>
      </div>
      <div className="flex flex-wrap bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] mb-12 soft-shadow border border-slate-100 w-fit gap-2">
        <button onClick={() => setView('manageExams')} className={`px-12 py-5 rounded-2xl font-black transition-all ${view === 'manageExams' ? 'bg-primary text-white shadow-2xl' : 'text-slate-400 hover:bg-slate-50'}`}>📂 {lang === 'ar' ? 'إدارة الاختبارات' : 'Manage'}</button>
        <button onClick={() => setView('builder')} className={`px-12 py-5 rounded-2xl font-black transition-all ${view === 'builder' ? 'bg-primary text-white shadow-2xl' : 'text-slate-400 hover:bg-slate-50'}`}>✨ {lang === 'ar' ? 'إضافة اختبار' : 'Add New'}</button>
      </div>
      {view === 'manageExams' && (
        <div className="space-y-8">
          {exams.map(exam => (
            <div key={exam.id} className="modern-card p-12 soft-shadow flex flex-col md:flex-row items-center justify-between group border border-transparent hover:border-primary transition-all gap-10">
              <div className="flex items-center gap-10 w-full md:w-auto">
                <div className="w-28 h-28 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-7xl overflow-hidden shadow-inner group-hover:rotate-6 transition-all">
                  {exam.thumbnail?.startsWith('data:') ? <img src={exam.thumbnail} className="w-full h-full object-cover" /> : exam.thumbnail || '📝'}
                </div>
                <div className="text-start">
                  <h4 className="text-4xl font-black mb-3">{exam.title[lang]}</h4>
                  <span className="text-sm text-slate-400 font-bold bg-slate-50 dark:bg-slate-800 px-5 py-2 rounded-xl">{exam.questions.length} سؤال مضاف</span>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button onClick={() => { storageService.updateExam({...exam, active: !exam.active}); refresh(); onDataChange(); }} className={`flex-1 md:flex-none px-12 py-5 rounded-2xl font-black transition-all ${exam.active ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>{exam.active ? 'إخفاء' : 'إظهار'}</button>
                <button onClick={() => { if(confirm(lang==='ar'?'حذف الاختبار؟':'Delete?')) { storageService.deleteExam(exam.id); refresh(); onDataChange(); } }} className="flex-1 md:flex-none px-12 py-5 bg-red-100 text-red-600 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all">🗑️ حذف</button>
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
      <div className="modern-card p-12"><h3 className="text-3xl font-black mb-8">{TRANSLATIONS[lang].exam_info}</h3><input value={info.title} onChange={e=>setInfo({...info, title:e.target.value})} className="w-full p-8 border-2 rounded-3xl mb-6 font-bold outline-none focus:border-primary dark:bg-slate-950 text-2xl" placeholder={TRANSLATIONS[lang].exam_title} /><input value={info.thumbnail} onChange={e=>setInfo({...info, thumbnail:e.target.value})} className="w-full p-8 border-2 rounded-3xl font-bold outline-none focus:border-primary dark:bg-slate-950 text-2xl" placeholder="Emoji or Image URL" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="modern-card p-12 text-start">
          <h3 className="text-3xl font-black mb-10">{TRANSLATIONS[lang].add_question}</h3>
          <textarea value={cur.questionText?.ar} onChange={e=>setCur({...cur, questionText:{ar:e.target.value,en:e.target.value}})} className="w-full p-8 border-2 rounded-3xl mb-8 h-48 outline-none focus:border-primary dark:bg-slate-950 font-bold text-xl" placeholder={TRANSLATIONS[lang].question_text} />
          <div className="flex gap-3 mb-10">
            {(['multiple-choice', 'true-false', 'fill-in-the-blank'] as QuestionType[]).map(tp => (
               <button key={tp} onClick={() => setCur({...cur, type: tp, options: tp === 'multiple-choice' ? [{ar:'',en:''}, {ar:'',en:''}] : undefined})} className={`flex-1 py-5 rounded-2xl font-black text-xs transition-all ${cur.type === tp ? 'bg-primary text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>{TRANSLATIONS[lang][tp === 'multiple-choice' ? 'mcq' : tp === 'true-false' ? 'tf' : 'fill']}</button>
            ))}
          </div>
          {cur.type === 'multiple-choice' && cur.options?.map((opt, i) => (
            <div key={i} className="flex gap-6 mb-6 items-center">
              <input type="radio" name="correct" className="w-10 h-10 accent-primary" checked={cur.correctAnswer === String(i)} onChange={()=>setCur({...cur, correctAnswer: String(i)})} />
              <input value={opt.ar} onChange={e=>{const n=[...cur.options!];n[i]={ar:e.target.value,en:e.target.value};setCur({...cur, options:n})}} className="flex-1 p-6 border-2 rounded-2xl outline-none focus:border-primary dark:bg-slate-950 font-bold text-lg" placeholder={`الخيار ${i+1}`} />
            </div>
          ))}
          {cur.type === 'fill-in-the-blank' && <input value={cur.correctAnswer} onChange={e=>setCur({...cur, correctAnswer:e.target.value})} className="w-full p-8 border-2 rounded-3xl font-bold outline-none focus:border-primary dark:bg-slate-950 text-2xl" placeholder="الإجابة الصحيحة" />}
          <button onClick={add} className="w-full py-8 bg-primary text-white rounded-[3rem] font-black text-3xl mt-10 shadow-2xl active:scale-95 transition-all">{TRANSLATIONS[lang].add_question}</button>
        </div>
        <div className="flex flex-col">
          <h3 className="text-3xl font-black mb-8 px-4 text-start">مراجعة ({qs.length})</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto px-4 custom-scrollbar flex-1 pb-10">
            {qs.map((q,i)=>(
              <div key={i} className="p-8 bg-white dark:bg-slate-900 border-2 rounded-3xl flex justify-between items-center group shadow-sm hover:border-primary transition-all">
                <p className="font-bold flex-1 truncate text-xl text-slate-700 dark:text-slate-200">{q.questionText[lang]}</p>
                <button onClick={() => setQs(qs.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 font-black text-3xl ml-6 p-2 transition-all">✕</button>
              </div>
            ))}
          </div>
          <button onClick={()=>onSave({id:Date.now().toString(), subjectId:'custom', title:{ar:info.title,en:info.title}, thumbnail:info.thumbnail, questions:qs, active:true})} className="mt-10 py-10 bg-green-500 text-white rounded-[4rem] font-black text-4xl shadow-2xl shadow-green-200 hover:scale-105 active:scale-95 transition-all">{TRANSLATIONS[lang].save_exam}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
