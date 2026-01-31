
import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS, SUBJECTS } from './constants';
import { storageService } from './services/storageService';
import { UserStats, Exam, ExamResult, Question } from './types';
import { aiService } from './services/aiService';

// --- Components ---

const Navbar: React.FC<{ 
  lang: 'ar' | 'en', 
  setLang: (l: 'ar' | 'en') => void,
  theme: 'light' | 'dark',
  toggleTheme: () => void,
  onStats: () => void,
  onFavorites: () => void
}> = ({ lang, setLang, theme, toggleTheme, onStats, onFavorites }) => {
  const t = TRANSLATIONS[lang];
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
        <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform">
          <span className="text-white text-2xl">🎓</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-black tracking-tight text-slate-800 dark:text-white">
            AI <span className="text-indigo-600">Exam</span> Pro
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Intelligence Testing</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={onFavorites}
          className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 hover:bg-amber-100 transition-colors active:scale-90"
          title={t.my_favorites}
        >
          ★
        </button>
        <button 
          onClick={onStats}
          className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-100 transition-colors active:scale-90"
          title={t.examHistory}
        >
          📊
        </button>
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors active:scale-90"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm font-black shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          {t.langToggle}
        </button>
      </div>
    </nav>
  );
};

const Dashboard: React.FC<{ 
  stats: UserStats, 
  onSelectSubject: (id: string) => void, 
  onStartPlacement: () => void,
  onStartStarred: () => void,
  onSubjectStats: (id: string) => void,
  lang: 'ar' | 'en' 
}> = ({ stats, onSelectSubject, onStartPlacement, onStartStarred, onSubjectStats, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in text-start">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black mb-2 text-slate-800 dark:text-white">{t.dashboard}</h2>
          <p className="text-slate-500 font-medium">{t.stats}</p>
        </div>
        <div className="flex gap-4">
           <div className="modern-card p-5 soft-shadow flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.accuracy}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.accuracyRate}%</p>
              </div>
           </div>
           <div className="modern-card p-5 soft-shadow flex items-center gap-5">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/40 rounded-2xl flex items-center justify-center text-2xl">✍️</div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.totalExams}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.examsTaken}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100 dark:shadow-none relative overflow-hidden group">
          <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Special / مميز</span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{t.placement_title}</h2>
              <p className="text-indigo-100 mb-8 text-lg font-medium opacity-90 max-w-sm">{t.placement_desc}</p>
              <button onClick={onStartPlacement} className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl active:scale-95">
                {t.placement_btn}
              </button>
          </div>
          <div className="absolute -right-16 -bottom-16 text-[18rem] opacity-10 select-none group-hover:scale-110 transition-transform duration-1000">🎯</div>
        </div>

        <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-amber-50 dark:shadow-none relative overflow-hidden group">
          <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Challenge / تحدي</span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{t.starred_exam}</h2>
              <p className="text-amber-50 mb-8 text-lg font-medium opacity-90 max-w-sm">{t.starred_desc}</p>
              <button 
                onClick={onStartStarred} 
                className="bg-white text-amber-600 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl active:scale-95 disabled:opacity-50"
                disabled={stats.starredQuestionIds.length === 0}
              >
                {t.startExam} ({stats.starredQuestionIds.length})
              </button>
          </div>
          <div className="absolute -right-16 -bottom-16 text-[18rem] opacity-10 select-none group-hover:rotate-12 transition-transform duration-1000">★</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SUBJECTS.map(sub => (
          <SubjectCard key={sub.id} subject={sub} stats={stats.subjectProgress[sub.id]} lang={lang} onStart={() => onSelectSubject(sub.id)} onStats={() => onSubjectStats(sub.id)} />
        ))}
      </div>
    </div>
  );
};

const SubjectCard: React.FC<{ 
  subject: typeof SUBJECTS[0], 
  stats: UserStats['subjectProgress'][string] | undefined,
  onStart: () => void,
  onStats: () => void,
  lang: 'ar' | 'en'
}> = ({ subject, stats, onStart, onStats, lang }) => {
  const t = TRANSLATIONS[lang];
  const progress = stats?.accuracy || 0;

  return (
    <div className="modern-card soft-shadow p-8 flex flex-col hover:-translate-y-2 transition-all group overflow-hidden relative">
      <button onClick={onStats} className="absolute top-6 left-6 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-indigo-50">📈</button>
      <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-9xl group-hover:scale-125 transition-transform duration-700 pointer-events-none">{subject.icon}</div>
      
      <div className="relative z-10 text-start">
        <div className={`w-16 h-16 ${subject.color} rounded-2xl flex items-center justify-center text-4xl shadow-xl shadow-slate-100 dark:shadow-none mb-8 group-hover:rotate-6 transition-transform`}>
          {subject.icon}
        </div>
        <h3 className="text-2xl font-black mb-1 text-slate-800 dark:text-white tracking-tight">{subject.name[lang]}</h3>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">{stats?.examsCount || 0} {t.totalExams}</p>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase">{t.progress}</span>
            <span className="text-sm font-black text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className={`h-full ${subject.color} progress-bar-fill`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95"
        >
          {t.startExam}
        </button>
      </div>
    </div>
  );
};

const ExamPlayer: React.FC<{ 
  exam: Exam, 
  lang: 'ar' | 'en', 
  onFinish: (res: Omit<ExamResult, 'date'>) => void,
  onCancel: () => void 
}> = ({ exam, lang, onFinish, onCancel }) => {
  const t = TRANSLATIONS[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());
  const [isChecking, setIsChecking] = useState(false);
  const [starredIds, setStarredIds] = useState<string[]>(storageService.getStats().starredQuestionIds);
  const [currentFeedback, setCurrentFeedback] = useState<Record<string, {isCorrect: boolean, isChecked: boolean}>>({});

  const q = exam.questions[currentIndex];
  const fb = currentFeedback[q.id];

  const handleValidate = async (val: string) => {
    if (fb?.isChecked) return;
    setUserAnswers(prev => ({ ...prev, [q.id]: val }));
    
    setIsChecking(true);
    let isCorrect = false;
    if (q.type === 'fill-in-the-blank') {
      const score = await aiService.checkSemanticSimilarity(val, q.correctAnswer);
      isCorrect = score >= 75;
    } else {
      isCorrect = String(val) === String(q.correctAnswer);
    }
    
    setCurrentFeedback(prev => ({ ...prev, [q.id]: { isCorrect, isChecked: true } }));
    setIsChecking(false);
  };

  const finishExam = () => {
    const answers = exam.questions.map(quest => ({
      questionId: quest.id,
      userAnswer: userAnswers[quest.id] || "",
      isCorrect: currentFeedback[quest.id]?.isCorrect || false
    }));

    onFinish({
      examId: exam.id,
      subjectId: exam.subjectId,
      score: Math.round((answers.filter(a => a.isCorrect).length / exam.questions.length) * 100),
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      answers
    });
  };

  const isStarred = starredIds.includes(q.id);
  const toggleStar = () => {
    storageService.toggleStar(q);
    setStarredIds(storageService.getStats().starredQuestionIds);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in text-start min-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-4 rounded-3xl soft-shadow border border-slate-100 dark:border-slate-800">
        <button onClick={onCancel} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors">✕</button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-indigo-600">{currentIndex + 1} / {exam.questions.length}</span>
          <button onClick={toggleStar} className={`text-2xl transition-transform active:scale-125 ${isStarred ? 'text-amber-500' : 'text-slate-200'}`}>★</button>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mb-12 overflow-hidden">
        <div className="h-full bg-indigo-600 progress-bar-fill" style={{ width: `${((currentIndex + 1) / exam.questions.length) * 100}%` }} />
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-black mb-10 text-slate-800 dark:text-white leading-tight">{q.questionText[lang]}</h2>

        <div className="space-y-4 mb-12">
          {q.type === 'multiple-choice' || q.type === 'true-false' ? (
            q.options?.map((opt, idx) => {
              const isSelected = userAnswers[q.id] === String(idx);
              let style = "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50";
              if (isSelected) {
                if (fb?.isChecked) style = fb.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
                else style = "border-indigo-600 bg-indigo-50";
              } else if (fb?.isChecked && String(idx) === String(q.correctAnswer)) {
                style = "border-green-300 opacity-60";
              }

              return (
                <button 
                  key={idx}
                  disabled={fb?.isChecked}
                  onClick={() => handleValidate(String(idx))}
                  className={`w-full p-6 text-start rounded-[1.5rem] border-2 transition-all flex items-center gap-5 ${style} hover:border-indigo-200`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isSelected ? 'text-white bg-indigo-600' : 'bg-white dark:bg-slate-700 text-slate-400'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-bold text-lg">{opt[lang]}</span>
                </button>
              );
            })
          ) : (
            <div className="space-y-4">
              <input 
                type="text" 
                disabled={fb?.isChecked}
                value={userAnswers[q.id] || ''}
                onChange={(e) => setUserAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate(userAnswers[q.id])}
                placeholder={t.yourAnswer}
                className={`w-full p-8 text-2xl font-black rounded-[2rem] border-2 text-center outline-none transition-all dark:bg-slate-950 ${fb?.isChecked ? (fb.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-slate-100 dark:border-slate-800 focus:border-indigo-600'}`}
              />
              {!fb?.isChecked && (
                <button onClick={() => handleValidate(userAnswers[q.id])} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg">
                  {t.check}
                </button>
              )}
            </div>
          )}

          {fb?.isChecked && !fb.isCorrect && (
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 animate-fade-in">
               <p className="text-[10px] text-indigo-400 font-black uppercase mb-2 tracking-widest">{t.correctAnswer}</p>
               <p className="text-xl font-black text-indigo-700 dark:text-indigo-300">
                 {q.type === 'fill-in-the-blank' ? q.correctAnswer : q.options?.[Number(q.correctAnswer)]?.[lang]}
               </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-auto pt-8">
        <button 
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(c => c - 1)}
          className="flex-1 py-5 rounded-[1.5rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 font-black text-slate-400 disabled:opacity-20 transition-all"
        >
          {t.previous}
        </button>
        {currentIndex === exam.questions.length - 1 ? (
          <button 
            disabled={!fb?.isChecked}
            onClick={finishExam}
            className="flex-[2] py-5 rounded-[1.5rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black shadow-2xl disabled:opacity-30 active:scale-95 transition-all"
          >
            {t.submit}
          </button>
        ) : (
          <button 
            disabled={!fb?.isChecked}
            onClick={() => setCurrentIndex(c => c + 1)}
            className="flex-[2] py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black shadow-xl disabled:opacity-30 active:scale-95 transition-all"
          >
            {t.next}
          </button>
        )}
      </div>

      {isChecking && (
        <div className="fixed inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="font-black text-2xl text-indigo-600">{t.checking}</p>
        </div>
      )}
    </div>
  );
};

const ResultsPage: React.FC<{ result: ExamResult, lang: 'ar' | 'en', onHome: () => void }> = ({ result, lang, onHome }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in text-center">
      <div className="inline-block p-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-[3rem] text-8xl mb-8 animate-bounce soft-shadow">🏆</div>
      <h2 className="text-4xl font-black mb-12 text-slate-800 dark:text-white">{t.score}: <span className="text-indigo-600">{result.score}%</span></h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="modern-card p-6 soft-shadow">
          <p className="text-[10px] text-slate-400 font-black uppercase mb-1 tracking-widest">{t.timeSpent}</p>
          <p className="text-2xl font-black text-slate-800 dark:text-white">{Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s</p>
        </div>
        <div className="modern-card p-6 soft-shadow">
          <p className="text-[10px] text-slate-400 font-black uppercase mb-1 tracking-widest">{t.correctAnswers}</p>
          <p className="text-2xl font-black text-green-500">{result.answers.filter(a => a.isCorrect).length}</p>
        </div>
        <div className="modern-card p-6 soft-shadow">
          <p className="text-[10px] text-slate-400 font-black uppercase mb-1 tracking-widest">{t.accuracy}</p>
          <p className="text-2xl font-black text-indigo-500">{result.score}%</p>
        </div>
      </div>

      <button onClick={onHome} className="w-full py-6 rounded-[2rem] bg-indigo-600 text-white font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
        {t.backToHome}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const [stats, setStats] = useState<UserStats>(storageService.getStats());
  const [activeView, setActiveView] = useState<'home' | 'exam' | 'results' | 'favorites' | 'history'>('home');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') { root.classList.add('dark'); root.classList.remove('light'); }
    else { root.classList.add('light'); root.classList.remove('dark'); }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const loadExam = async (fileName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`exams/${fileName}.json`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setActiveExam(data);
      setActiveView('exam');
    } catch {
      alert(lang === 'ar' ? "تعذر تحميل الاختبار" : "Error loading exam");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (result: Omit<ExamResult, 'date'>) => {
    storageService.saveResult(result);
    setStats(storageService.getStats());
    setLastResult({...result, date: Date.now()});
    setActiveView('results');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <Navbar 
        lang={lang} setLang={setLang} theme={theme} 
        toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onStats={() => setActiveView('home')}
        onFavorites={() => setActiveView('favorites')}
      />

      <main className="py-12 px-4">
        {activeView === 'home' && (
          <Dashboard 
            stats={stats} lang={lang} 
            onSelectSubject={loadExam} 
            onStartPlacement={() => loadExam('placement')}
            onStartStarred={() => {
              const q = storageService.getStarredQuestions();
              setActiveExam({ id: 'starred', subjectId: 'starred', title: {ar: 'اختبار المفضلة', en: 'Starred Exam'}, questions: q });
              setActiveView('exam');
            }}
            onSubjectStats={() => {}}
          />
        )}

        {activeView === 'exam' && activeExam && (
          <ExamPlayer exam={activeExam} lang={lang} onFinish={onFinish} onCancel={() => setActiveView('home')} />
        )}

        {activeView === 'results' && lastResult && (
          <ResultsPage result={lastResult} lang={lang} onHome={() => setActiveView('home')} />
        )}

        {activeView === 'favorites' && (
           <div className="max-w-4xl mx-auto p-6 animate-fade-in text-start">
              <h2 className="text-4xl font-black mb-8">{TRANSLATIONS[lang].my_favorites}</h2>
              {storageService.getStarredQuestions().length === 0 ? (
                <p className="text-slate-400 text-xl font-bold">{TRANSLATIONS[lang].no_starred}</p>
              ) : (
                <div className="grid gap-6">
                   {storageService.getStarredQuestions().map(q => (
                     <div key={q.id} className="modern-card p-8 soft-shadow relative">
                        <button onClick={() => { storageService.toggleStar(q); setStats(storageService.getStats()); }} className="absolute top-6 left-6 text-2xl text-amber-500">★</button>
                        <p className="font-bold text-xl pr-10">{q.questionText[lang]}</p>
                     </div>
                   ))}
                </div>
              )}
              <button onClick={() => setActiveView('home')} className="mt-12 text-indigo-600 font-bold hover:underline">{TRANSLATIONS[lang].backToHome}</button>
           </div>
        )}
      </main>

      {loading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="font-black text-2xl text-indigo-600">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      )}
    </div>
  );
};

export default App;
