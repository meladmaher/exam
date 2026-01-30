
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
           <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.accuracy}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.accuracyRate}%</p>
              </div>
           </div>
           <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/40 rounded-2xl flex items-center justify-center text-2xl">✍️</div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.totalExams}</p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{stats.examsTaken}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 dark:shadow-none relative overflow-hidden group">
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

        <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-[3rem] p-10 text-white shadow-2xl shadow-amber-50 dark:shadow-none relative overflow-hidden group">
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
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 flex flex-col hover:-translate-y-2 transition-all group overflow-hidden relative shadow-sm border border-slate-100 dark:border-slate-800">
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
            <div className={`h-full ${subject.color} transition-all duration-1000`} style={{ width: `${progress}%` }} />
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

  const q = exam.questions[currentIndex];
  
  const handleNext = () => {
    if (currentIndex < exam.questions.length - 1) setCurrentIndex(c => c + 1);
    else finishExam();
  };

  const finishExam = async () => {
    setIsChecking(true);
    const answers = [];
    let correctCount = 0;

    for (const quest of exam.questions) {
      const uAns = userAnswers[quest.id] || "";
      let isCorrect = false;
      let similarityScore = undefined;

      if (quest.type === 'fill-in-the-blank') {
        similarityScore = await aiService.checkSemanticSimilarity(uAns, quest.correctAnswer);
        isCorrect = similarityScore >= 75;
      } else {
        isCorrect = String(uAns) === String(quest.correctAnswer);
      }

      if (isCorrect) correctCount++;
      answers.push({ questionId: quest.id, userAnswer: uAns, isCorrect, similarityScore });
    }

    onFinish({
      examId: exam.id,
      subjectId: exam.subjectId,
      score: Math.round((correctCount / exam.questions.length) * 100),
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      answers
    });
    setIsChecking(false);
  };

  const isStarred = starredIds.includes(q.id);
  const toggleStar = () => {
    storageService.toggleStar(q);
    setStarredIds(storageService.getStats().starredQuestionIds);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in text-start">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 font-bold">✕ {t.backToHome}</button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-indigo-600">{currentIndex + 1} / {exam.questions.length}</span>
          <button onClick={toggleStar} className={`text-2xl ${isStarred ? 'text-amber-500' : 'text-slate-200'}`}>★</button>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-12">
        <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / exam.questions.length) * 100}%` }} />
      </div>

      <h2 className="text-3xl font-black mb-10 text-slate-800 dark:text-white leading-tight">{q.questionText[lang]}</h2>

      <div className="space-y-4 mb-12">
        {q.type === 'multiple-choice' || q.type === 'true-false' ? (
          q.options?.map((opt, idx) => (
            <button 
              key={idx}
              onClick={() => setUserAnswers({ ...userAnswers, [q.id]: String(idx) })}
              className={`w-full p-6 text-start rounded-3xl border-2 transition-all flex items-center gap-4 ${userAnswers[q.id] === String(idx) ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${userAnswers[q.id] === String(idx) ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{opt[lang]}</span>
            </button>
          ))
        ) : (
          <input 
            type="text" 
            value={userAnswers[q.id] || ''}
            onChange={(e) => setUserAnswers({ ...userAnswers, [q.id]: e.target.value })}
            placeholder={t.yourAnswer}
            className="w-full p-8 text-2xl font-black rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-950 focus:border-indigo-600 outline-none transition-all text-center"
          />
        )}
      </div>

      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={() => setCurrentIndex(c => Math.max(0, c - 1))}
          disabled={currentIndex === 0}
          className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-slate-500 disabled:opacity-30"
        >
          {t.previous}
        </button>
        <button 
          onClick={handleNext}
          className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all"
        >
          {currentIndex === exam.questions.length - 1 ? t.submit : t.next}
        </button>
      </div>

      {isChecking && (
        <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="font-black text-2xl text-indigo-600">{t.checking}</p>
        </div>
      )}
    </div>
  );
};

const ResultsPage: React.FC<{ result: ExamResult, exam: Exam, lang: 'ar' | 'en', onHome: () => void, onReview: () => void }> = ({ result, exam, lang, onHome, onReview }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in text-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/40 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-bounce">✓</div>
      <h2 className="text-4xl font-black mb-4 text-slate-800 dark:text-white">{t.score}: {result.score}%</h2>
      <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest">{exam.title[lang]}</p>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs font-black text-slate-400 uppercase mb-1">{t.timeSpent}</p>
          <p className="text-xl font-black text-slate-800 dark:text-white">{Math.floor(result.timeSpent / 60)}:{String(result.timeSpent % 60).padStart(2, '0')}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs font-black text-slate-400 uppercase mb-1">{t.correctAnswers}</p>
          <p className="text-xl font-black text-green-600">{result.answers.filter(a => a.isCorrect).length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <button onClick={onReview} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all">{t.review}</button>
        <button onClick={onHome} className="w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black">{t.backToHome}</button>
      </div>
    </div>
  );
};

const FavoritesView: React.FC<{ lang: 'ar' | 'en', onBack: () => void, onStartExam: () => void, onToggleStar: (q: Question) => void }> = ({ lang, onBack, onStartExam, onToggleStar }) => {
  const t = TRANSLATIONS[lang];
  const [favorites, setFavorites] = useState<Question[]>(storageService.getStarredQuestions());

  const handleToggle = (q: Question) => {
    onToggleStar(q);
    setFavorites(storageService.getStarredQuestions());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in text-start">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black mb-2 text-slate-800 dark:text-white tracking-tight">{t.my_favorites}</h2>
          <p className="text-slate-400 font-bold">{favorites.length} {t.fav_questions}</p>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={favorites.length === 0}
            onClick={onStartExam}
            className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 dark:shadow-none active:scale-95 disabled:opacity-50"
          >
            {t.start_fav_test}
          </button>
          <button onClick={onBack} className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all">{t.backToHome}</button>
        </div>
      </header>

      {favorites.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-6xl mb-6">⭐</div>
          <p className="text-slate-400 font-bold text-lg max-w-sm mx-auto leading-relaxed">{t.no_starred}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map(q => (
            <div key={q.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 relative group transition-all hover:shadow-xl">
              <button onClick={() => handleToggle(q)} className="absolute top-6 left-6 text-2xl text-amber-500">★</button>
              <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-full uppercase mb-4">{q.type}</span>
              <p className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-6 line-clamp-3">{q.questionText[lang]}</p>
              <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{t.correctAnswer}</p>
                 <p className="font-bold text-indigo-600">{q.type === 'multiple-choice' ? q.options?.[parseInt(q.correctAnswer)]?.[lang] : q.correctAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HistoryView: React.FC<{ lang: 'ar' | 'en', onBack: () => void, onReview: (res: ExamResult) => void, onDelete: (time: number) => void }> = ({ lang, onBack, onReview, onDelete }) => {
  const t = TRANSLATIONS[lang];
  const results = storageService.getAllResults().sort((a, b) => b.date - a.date);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in text-start">
       <header className="mb-12 flex justify-between items-center">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{t.examHistory}</h2>
          <button onClick={onBack} className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-2xl font-black">{t.backToHome}</button>
       </header>

       {results.length === 0 ? (
         <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
           <p className="text-slate-400 font-bold">{t.noExams}</p>
         </div>
       ) : (
         <div className="space-y-4">
           {results.map(res => {
             const subject = SUBJECTS.find(s => s.id === res.subjectId);
             return (
               <div key={res.date} className="bg-white dark:bg-slate-900 p-6 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all">
                 <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 ${subject?.color || 'bg-slate-100'} rounded-2xl flex items-center justify-center text-3xl`}>{subject?.icon || '📄'}</div>
                    <div>
                       <h4 className="font-black text-slate-800 dark:text-white">{subject?.name[lang] || res.examId}</h4>
                       <p className="text-xs font-bold text-slate-400">{new Date(res.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase">{t.accuracy}</p>
                       <p className={`text-xl font-black ${res.score >= 70 ? 'text-green-500' : 'text-amber-500'}`}>{res.score}%</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => onReview(res)} className="px-5 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl font-black text-sm">{t.open}</button>
                       <button onClick={() => onDelete(res.date)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors">🗑</button>
                    </div>
                 </div>
               </div>
             );
           })}
         </div>
       )}
    </div>
  );
};

const ReviewPage: React.FC<{ result: ExamResult, lang: 'ar' | 'en', onBack: () => void }> = ({ result, lang, onBack }) => {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState<'all' | 'wrong'>('all');

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in text-start">
      <header className="mb-12 flex justify-between items-center">
        <div>
           <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{t.review}</h2>
           <div className="flex gap-4 mt-4">
              <button onClick={() => setFilter('all')} className={`px-5 py-2 rounded-xl font-black text-sm ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t.show_all}</button>
              <button onClick={() => setFilter('wrong')} className={`px-5 py-2 rounded-xl font-black text-sm ${filter === 'wrong' ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{t.show_wrong}</button>
           </div>
        </div>
        <button onClick={onBack} className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-2xl font-black">{t.previous}</button>
      </header>

      <div className="space-y-6">
        {result.answers.filter(a => filter === 'all' || !a.isCorrect).map((ans, idx) => (
          <div key={idx} className={`p-8 rounded-[2.5rem] border-2 ${ans.isCorrect ? 'border-green-100 bg-green-50/20' : 'border-red-100 bg-red-50/20'} relative`}>
            <div className="flex justify-between items-start mb-6">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ans.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                 {ans.isCorrect ? t.correct : t.wrong}
               </span>
               <span className="text-slate-400 font-bold text-sm">#{idx + 1}</span>
            </div>
            
            <p className="text-xl font-bold mb-8 text-slate-800 dark:text-slate-100">Question ID: {ans.questionId}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{t.yourAnswer}</p>
                  <p className={`font-black ${ans.isCorrect ? 'text-green-600' : 'text-red-500'}`}>{ans.userAnswer || '---'}</p>
               </div>
               {!ans.isCorrect && (
                  <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-900/30">
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">{t.correctAnswer}</p>
                    <p className="font-black text-indigo-600">Refer to original exam material.</p>
                  </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SubjectStatsView: React.FC<{ subjectId: string, lang: 'ar' | 'en', onBack: () => void }> = ({ subjectId, lang, onBack }) => {
  const t = TRANSLATIONS[lang];
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const stats = storageService.getStats().subjectProgress[subjectId];

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in text-start">
       <header className="mb-12 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className={`w-20 h-20 ${subject?.color} rounded-3xl flex items-center justify-center text-4xl shadow-xl`}>{subject?.icon}</div>
             <div>
                <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{subject?.name[lang]}</h2>
                <p className="text-slate-400 font-bold">{t.subjectStats}</p>
             </div>
          </div>
          <button onClick={onBack} className="bg-slate-100 dark:bg-slate-800 px-8 py-4 rounded-2xl font-black">{t.backToHome}</button>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <p className="text-xs font-black text-slate-400 uppercase mb-2">{t.totalExams}</p>
             <p className="text-4xl font-black text-slate-800 dark:text-white">{stats?.examsCount || 0}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <p className="text-xs font-black text-slate-400 uppercase mb-2">{t.accuracy}</p>
             <p className="text-4xl font-black text-indigo-600">{stats?.accuracy || 0}%</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <p className="text-xs font-black text-slate-400 uppercase mb-2">{t.lastScore}</p>
             <p className="text-4xl font-black text-amber-500">{stats?.lastScore || 0}%</p>
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [stats, setStats] = useState<UserStats>(storageService.getStats());
  const [activeView, setActiveView] = useState<'home' | 'exam' | 'results' | 'history' | 'review' | 'subject-stats' | 'favorites'>('home');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [isLoadingExam, setIsLoadingExam] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const loadExamFile = async (fileName: string) => {
    setIsLoadingExam(true);
    try {
      const response = await fetch(`exams/${fileName}.json`);
      if (!response.ok) throw new Error("File not found");
      const data = await response.json();
      setActiveExam(data);
      setActiveView('exam');
    } catch (error) {
      alert(lang === 'ar' ? "تعذر تحميل ملف الاختبار." : "Could not load exam file.");
    } finally {
      setIsLoadingExam(false);
    }
  };

  const handleStartStarredExam = () => {
    const starred = storageService.getStarredQuestions();
    if (starred.length === 0) {
      alert(TRANSLATIONS[lang].no_starred);
      return;
    }
    const starredExam: Exam = {
      id: 'starred-exam',
      subjectId: 'starred',
      title: { ar: 'تحدي المفضلة', en: 'Starred Challenge' },
      questions: starred
    };
    setActiveExam(starredExam);
    setActiveView('exam');
  };

  const handleFinishExam = (result: Omit<ExamResult, 'date'>) => {
    storageService.saveResult(result);
    setStats(storageService.getStats());
    setSelectedResult({...result, date: Date.now()});
    setActiveView('results');
  };

  const handleDeleteResult = (timestamp: number) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه النتيجة؟' : 'Are you sure you want to delete this result?')) {
      storageService.deleteResult(timestamp);
      setStats(storageService.getStats());
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500`}>
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
        onStats={() => setActiveView('history')}
        onFavorites={() => setActiveView('favorites')}
      />
      
      <main className="py-12">
        {activeView === 'home' && (
          <Dashboard 
            stats={stats} 
            onSelectSubject={loadExamFile} 
            onStartPlacement={() => loadExamFile('placement')}
            onStartStarred={handleStartStarredExam}
            lang={lang} 
            onSubjectStats={(id) => { setSelectedSubjectId(id); setActiveView('subject-stats'); }}
          />
        )}

        {activeView === 'exam' && activeExam && (
          <ExamPlayer 
            exam={activeExam} 
            lang={lang} 
            onFinish={handleFinishExam} 
            onCancel={() => setActiveView('home')} 
          />
        )}

        {activeView === 'results' && selectedResult && activeExam && (
          <ResultsPage 
            result={selectedResult} 
            exam={activeExam} 
            lang={lang} 
            onHome={() => setActiveView('home')} 
            onReview={() => setActiveView('review')}
          />
        )}

        {activeView === 'history' && (
          <HistoryView 
            lang={lang} 
            onBack={() => setActiveView('home')} 
            onReview={(res) => { setSelectedResult(res); setActiveView('review'); }}
            onDelete={handleDeleteResult}
          />
        )}

        {activeView === 'review' && selectedResult && (
          <ReviewPage 
            result={selectedResult} 
            lang={lang} 
            onBack={() => setActiveView('history')} 
          />
        )}

        {activeView === 'subject-stats' && selectedSubjectId && (
          <SubjectStatsView 
            subjectId={selectedSubjectId} 
            lang={lang} 
            onBack={() => setActiveView('home')} 
          />
        )}

        {activeView === 'favorites' && (
          <FavoritesView 
            lang={lang} 
            onBack={() => setActiveView('home')} 
            onStartExam={handleStartStarredExam} 
            onToggleStar={(q) => { storageService.toggleStar(q); setStats(storageService.getStats()); }}
          />
        )}
      </main>

      {isLoadingExam && (
        <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6 shadow-2xl shadow-indigo-200"></div>
            <p className="font-black text-2xl text-indigo-600">{lang === 'ar' ? 'جاري تحضير أسئلتك...' : 'Preparing your questions...'}</p>
        </div>
      )}
    </div>
  );
};

export default App;
