
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './constants';
import { storageService } from './services/storageService';
import { Exam, ExamResult, Question, SavedFolder, ExamSession, QuestionType } from './types';
import { aiService } from './services/aiService';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
};

// --- Sub-Component: Folder Creation Modal (Mobile Optimized) ---
const CreateFolderModal: React.FC<{ 
  lang: 'ar'|'en', 
  onClose: () => void, 
  onSave: (name: string, icon: string) => void 
}> = ({ lang, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📁');
  const icons = ['📁', '📚', '🧪', '📐', '🧬', '📜', '🎨', '💻', '🌍', '📊', '💡', '📝'];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[2000] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] p-6 sm:p-10 shadow-2xl border border-white/20">
        <h3 className="text-xl sm:text-2xl font-black mb-6 text-center">{lang === 'ar' ? 'إنشاء مادة جديدة' : 'Create Subject'}</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
            <input 
              autoFocus value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary rounded-xl outline-none font-bold text-lg"
              placeholder={lang === 'ar' ? 'مثال: تاريخ' : 'e.g. History'}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{lang === 'ar' ? 'الأيقونة' : 'Icon'}</label>
            <div className="grid grid-cols-4 gap-2">
              {icons.map(i => (
                <button key={i} onClick={() => setIcon(i)} className={`text-xl p-3 rounded-lg transition-all ${icon === i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-slate-50 dark:bg-slate-800'}`}>{i}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-sm">إلغاء</button>
            <button disabled={!name.trim()} onClick={() => onSave(name.trim(), icon)} className="flex-[2] py-4 bg-primary text-white rounded-xl font-black text-sm shadow-xl disabled:opacity-30">إنشاء</button>
          </div>
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

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setActiveView('exam');
    setResumeSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-['IBM_Plex_Sans_Arabic',sans-serif] overflow-x-hidden">
      {resumeSession && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[3000] flex items-center justify-center p-4 animate-fade-in text-center">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-primary/20">
             <div className="text-6xl mb-6 animate-bounce">🕰️</div>
             <h3 className="text-xl sm:text-2xl font-black mb-4">إكمال الاختبار؟</h3>
             <p className="text-slate-400 font-bold mb-8 text-sm">لديك اختبار غير مكتمل، هل تود المتابعة؟</p>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { storageService.clearSession(); setResumeSession(null); }} className="py-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-sm">بدء جديد</button>
                <button onClick={() => handleStartExam(resumeSession.exam)} className="py-4 bg-primary text-white rounded-xl font-black text-sm shadow-xl">متابعة</button>
             </div>
          </div>
        </div>
      )}

      {/* Navbar Responsive */}
      <nav className="sticky top-0 z-[1000] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center text-xl sm:text-2xl text-white">🎓</div>
          <h1 className="text-lg sm:text-xl font-black hidden xs:block">AI <span className="text-primary">Exam</span></h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => setActiveView('saved')} className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all ${activeView === 'saved' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>📁 <span className="hidden sm:inline">المواد</span></button>
          <button onClick={() => setActiveView('stats')} className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all ${activeView === 'stats' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>📊 <span className="hidden sm:inline">التقارير</span></button>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-2 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800">{theme === 'light' ? '🌙' : '☀️'}</button>
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-3 py-2 sm:px-5 sm:py-2 rounded-xl bg-primary text-white text-[10px] sm:text-xs font-black shadow-lg uppercase">{TRANSLATIONS[lang].langToggle}</button>
        </div>
      </nav>

      <main className="py-6 sm:py-10 px-4 max-w-6xl mx-auto min-h-[85vh]">
        {activeView === 'home' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl sm:text-4xl font-black mb-8 px-2">لوحة الاختبارات</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {customExams.filter(e => e.active).map(exam => (
                <div key={exam.id} className="modern-card p-6 sm:p-8 flex flex-col group border-2 border-transparent hover:border-primary/20 shadow-sm">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-6 shadow-inner group-hover:scale-105 transition-transform">
                    {exam.thumbnail?.startsWith('data:') ? <img src={exam.thumbnail} className="w-full h-full object-cover rounded-2xl" /> : exam.thumbnail || '📝'}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mb-6 leading-tight flex-1">{exam.title[lang]}</h3>
                  <button onClick={() => handleStartExam(exam)} className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm sm:text-lg shadow-lg hover:translate-y-[-2px] transition-all">
                    {TRANSLATIONS[lang].startExam}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'exam' && activeExam && (
          <ExamPlayer 
            exam={activeExam} lang={lang} 
            onFinish={(res) => { storageService.saveResult(res); setLastResult({...res, date: Date.now()}); storageService.clearSession(); setActiveView('results'); }} 
            onCancel={() => { if(confirm('إنهاء الاختبار؟')){ storageService.clearSession(); setActiveView('home'); } }} 
          />
        )}

        {activeView === 'results' && lastResult && <ResultsPage result={lastResult} lang={lang} onHome={() => setActiveView('home')} />}
        {activeView === 'saved' && <SavedQuestionsView lang={lang} onStartPractice={(exam) => handleStartExam(exam)} />}
        {activeView === 'stats' && <StatisticsView lang={lang} />}
      </main>
    </div>
  );
};

// --- View: Exam Player (Fully Responsive) ---
const ExamPlayer: React.FC<{ exam: Exam, lang: 'ar'|'en', onFinish: (res: any) => void, onCancel: () => void }> = ({ exam, lang, onFinish, onCancel }) => {
  const t = TRANSLATIONS[lang];
  const [session, setSession] = useState<ExamSession>(() => {
    const existing = storageService.getActiveSession();
    if (existing && existing.exam.id === exam.id) return existing;
    return { exam, currentIndex: 0, userAnswers: {}, feedback: {}, startTime: Date.now() };
  });
  const [isChecking, setIsChecking] = useState(false);
  const q = exam.questions[session.currentIndex];

  useEffect(() => { storageService.saveSession(session); }, [session]);

  const validate = async (val: string) => {
    if (session.feedback[q.id]?.isChecked || !val.trim()) return;
    setIsChecking(true);
    let isCorrect = false;
    if (q.type === 'fill-in-the-blank') {
      const score = await aiService.checkSemanticSimilarity(val, q.correctAnswer);
      isCorrect = score >= 80;
    } else {
      isCorrect = String(val) === String(q.correctAnswer);
    }
    setSession(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [q.id]: val },
      feedback: { ...prev.feedback, [q.id]: { isCorrect, isChecked: true } }
    }));
    setIsChecking(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in flex flex-col min-h-[75vh]">
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-lg font-black">✕</button>
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-lg font-black text-primary bg-indigo-50 px-4 py-2 rounded-lg">{session.currentIndex + 1} / {exam.questions.length}</span>
          <button onClick={() => {
            const fName = prompt('اسم المادة لحفظ السؤال:');
            if(fName) {
              const target = storageService.getSavedFolders().find(fd => fd.name === fName) || storageService.addFolder(fName, '📁');
              storageService.saveQuestionToFolder(q, target.id);
              alert('تم الحفظ!');
            }
          }} className="w-10 h-10 flex items-center justify-center bg-amber-50 text-amber-500 rounded-lg text-lg">★</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {exam.questions.map((quest, idx) => {
          const fb = session.feedback[quest.id];
          const isCurr = idx === session.currentIndex;
          let bgColor = "bg-slate-200 dark:bg-slate-800";
          if (fb?.isChecked) bgColor = fb.isCorrect ? "bg-green-500" : "bg-red-500";
          else if (isCurr) bgColor = "bg-primary animate-pulse";
          return <div key={idx} className={`flex-1 min-w-[6px] h-2 rounded-full ${bgColor} ${isCurr ? 'scale-y-125' : ''}`} />;
        })}
      </div>

      <div className={`flex-1 modern-card p-6 sm:p-10 mb-6 transition-all border-2 ${!session.feedback[q.id]?.isChecked ? 'active-question-glow border-primary/30' : 'border-slate-100 dark:border-slate-800'}`}>
        <h2 className="text-xl sm:text-2xl font-black mb-8 text-slate-800 dark:text-white leading-relaxed min-h-[80px]">{q.questionText[lang]}</h2>
        <div className="space-y-3 sm:space-y-4">
          {q.type !== 'fill-in-the-blank' ? q.options?.map((opt, idx) => {
            const isSel = session.userAnswers[q.id] === String(idx);
            let style = "border-slate-100 dark:border-slate-800 bg-slate-50/50";
            if (isSel) style = session.feedback[q.id]?.isChecked ? (session.feedback[q.id].isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-primary bg-indigo-50 scale-[1.01]";
            else if (session.feedback[q.id]?.isChecked && String(idx) === String(q.correctAnswer)) style = "border-green-300 opacity-60";
            
            return (
              <button key={idx} disabled={session.feedback[q.id]?.isChecked} onClick={() => validate(String(idx))} className={`w-full p-4 text-start rounded-xl border-2 transition-all flex items-center gap-4 ${style}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${isSel ? 'text-white bg-primary' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>{String.fromCharCode(65+idx)}</div>
                <span className="font-bold text-sm sm:text-lg">{opt[lang]}</span>
              </button>
            );
          }) : (
            <div className="space-y-6">
              <input 
                disabled={session.feedback[q.id]?.isChecked} 
                value={session.userAnswers[q.id] || ''} 
                onChange={e => setSession({...session, userAnswers: {...session.userAnswers, [q.id]: e.target.value}})} 
                className="w-full p-6 text-xl sm:text-2xl font-black rounded-xl border-2 text-center dark:bg-slate-950 focus:border-primary outline-none transition-all" 
                placeholder="اكتب الإجابة..." autoFocus 
              />
              {!session.feedback[q.id]?.isChecked && (
                <button onClick={() => validate(session.userAnswers[q.id] || '')} className="w-full py-4 bg-primary text-white rounded-xl font-black text-lg shadow-lg">تحقق</button>
              )}
            </div>
          )}
          {session.feedback[q.id]?.isChecked && !session.feedback[q.id].isCorrect && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border-2 border-indigo-100 dark:border-indigo-900 animate-fade-in mt-4">
              <span className="text-[10px] font-black text-indigo-400 uppercase mb-1 block">الإجابة الصحيحة:</span>
              <p className="text-lg sm:text-xl font-black text-indigo-700 dark:text-indigo-300">{q.type === 'fill-in-the-blank' ? q.correctAnswer : q.options?.[Number(q.correctAnswer)]?.[lang]}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button disabled={session.currentIndex === 0} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex - 1}))} className="flex-1 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 font-black text-sm disabled:opacity-20">السابق</button>
        {session.currentIndex === exam.questions.length - 1 ? (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => onFinish({ examId: exam.id, subjectId: exam.subjectId, score: Math.round(((Object.values(session.feedback) as any).filter((f:any) => f.isCorrect).length / exam.questions.length) * 100), timeSpent: Math.floor((Date.now()-session.startTime)/1000), answers: exam.questions.map(quest => ({ questionId: quest.id, questionData: quest, userAnswer: session.userAnswers[quest.id] || '', isCorrect: session.feedback[quest.id]?.isCorrect || false })) })} className="flex-[3] py-4 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black text-sm shadow-xl disabled:opacity-30">إنهاء الاختبار ✅</button>
        ) : (
          <button disabled={!session.feedback[q.id]?.isChecked} onClick={() => setSession(s => ({...s, currentIndex: s.currentIndex + 1}))} className="flex-[3] py-4 rounded-xl bg-primary text-white font-black text-sm shadow-xl disabled:opacity-30">التالي ←</button>
        )}
      </div>
      {isChecking && <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md z-[4000] flex flex-col items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div><p className="font-black text-xl text-primary animate-pulse">جاري التحقق بذكاء...</p></div>}
    </div>
  );
};

// --- View: Results & Saved Folders (Simplified for Mobile) ---
const ResultsPage: React.FC<{ result: ExamResult, lang: 'ar'|'en', onHome: () => void }> = ({ result, lang, onHome }) => {
  return (
    <div className="max-w-xl mx-auto p-4 animate-fade-in text-center flex flex-col items-center">
      <div className="p-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-[3rem] text-6xl mb-8 shadow-xl">🏆</div>
      <h2 className="text-4xl font-black mb-8">النتيجة: <span className="text-primary">{result.score}%</span></h2>
      <div className="grid grid-cols-2 gap-4 mb-10 w-full">
         <div className="modern-card p-6 border-b-4 border-green-500"><p className="text-[10px] font-black text-slate-400 uppercase mb-1">صح</p><p className="text-3xl font-black text-green-500">{result.answers.filter(a => a.isCorrect).length}</p></div>
         <div className="modern-card p-6 border-b-4 border-red-500"><p className="text-[10px] font-black text-slate-400 uppercase mb-1">خطأ</p><p className="text-3xl font-black text-red-500">{result.answers.filter(a => !a.isCorrect).length}</p></div>
      </div>
      <button onClick={onHome} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all">العودة للرئيسية</button>
    </div>
  );
};

const SavedQuestionsView: React.FC<{ lang: 'ar'|'en', onStartPractice: (exam: Exam) => void }> = ({ lang, onStartPractice }) => {
  const [folders, setFolders] = useState<SavedFolder[]>([]);
  const [activeFolder, setActiveFolder] = useState<SavedFolder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { setFolders(storageService.getSavedFolders()); }, []);

  const handleCreate = (n: string, i: string) => { storageService.addFolder(n, i); setFolders(storageService.getSavedFolders()); setIsModalOpen(false); };
  const handleDelete = (id: string) => { if(confirm('حذف المادة؟')){ storageService.deleteFolder(id); setFolders(storageService.getSavedFolders()); } };

  return (
    <div className="animate-fade-in">
      {isModalOpen && <CreateFolderModal lang={lang} onClose={() => setIsModalOpen(false)} onSave={handleCreate} />}
      {!activeFolder ? (
        <>
          <div className="flex justify-between items-center mb-8 px-2">
            <h2 className="text-2xl font-black">موادي التعليمية</h2>
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 bg-primary text-white rounded-xl font-black text-xs shadow-lg">+ مادة</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map(f => (
              <div key={f.id} onClick={() => setActiveFolder(f)} className="modern-card p-6 text-center group relative cursor-pointer hover:border-primary transition-all shadow-sm">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-black mb-1 truncate">{f.name}</h3>
                <span className="text-[10px] text-slate-400 font-bold">{f.questions.length} سؤال</span>
                {!f.isDefault && <button onClick={(e)=>{e.stopPropagation(); handleDelete(f.id);}} className="absolute top-2 right-2 w-6 h-6 bg-red-50 text-red-400 rounded-lg text-[10px]">✕</button>}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setActiveFolder(null)} className="mb-6 flex items-center gap-2 text-primary font-black text-sm"><span className="p-2 bg-indigo-50 rounded-lg">←</span> عودة</button>
          <div className="modern-card p-6 mb-6 border-r-4 border-primary flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{activeFolder.icon}</span>
              <h3 className="text-xl font-black">{activeFolder.name}</h3>
            </div>
            <button disabled={activeFolder.questions.length === 0} onClick={() => onStartPractice({ id: 'pr_'+activeFolder.id, subjectId: 'p', title: { ar: 'مراجعة: ' + activeFolder.name, en: 'Review: ' + activeFolder.name }, questions: activeFolder.questions, active: true, thumbnail: activeFolder.icon })} className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-black text-sm shadow-xl disabled:opacity-30">🚀 مراجعة شاملة</button>
          </div>
          <div className="space-y-3">
            {activeFolder.questions.map(q => (
              <div key={q.id} className="modern-card p-4 flex justify-between items-center border-transparent hover:border-primary transition-all shadow-sm">
                <p className="font-bold text-sm truncate flex-1">{q.questionText[lang]}</p>
                <button onClick={() => { storageService.removeQuestionFromFolder(q.id, activeFolder.id); setActiveFolder(storageService.getSavedFolders().find(f=>f.id===activeFolder.id)||null); setFolders(storageService.getSavedFolders()); }} className="w-8 h-8 bg-red-50 text-red-400 rounded-lg ml-4">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatisticsView: React.FC<{ lang: 'ar'|'en' }> = ({ lang }) => {
  const stats = storageService.getStats();
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-black mb-8 px-2">إحصائيات التقدم</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="modern-card p-6 border-t-4 border-primary text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">إجمالي الاختبارات</p>
          <p className="text-4xl font-black">{stats.examsTaken}</p>
        </div>
        <div className="modern-card p-6 border-t-4 border-green-500 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">معدل الدقة</p>
          <p className="text-4xl font-black text-green-500">{stats.accuracyRate}%</p>
        </div>
        <div className="modern-card p-6 border-t-4 border-amber-500 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">إجابات صحيحة</p>
          <p className="text-4xl font-black text-amber-500">{stats.correctAnswers}</p>
        </div>
      </div>
      <div className="mt-8 modern-card p-6">
        <h3 className="text-lg font-black mb-6">تاريخ الاختبارات الأخيرة</h3>
        <div className="space-y-3">
          {stats.history.slice(-5).reverse().map((h, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
               <span className="text-xs font-black">{new Date(h.date).toLocaleDateString()}</span>
               <span className={`text-lg font-black ${h.score >= 50 ? 'text-green-500' : 'text-red-500'}`}>{h.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
