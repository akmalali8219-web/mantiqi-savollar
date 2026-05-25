/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Check, 
  BookOpen, 
  ListChecks,
  Smile,
  Frown,
  Eye,
  Filter
} from "lucide-react";
import { questionsPool, Question } from "./questions";
import { sounds } from "./utils/audio";

export default function App() {
  const [gameStage, setGameStage] = useState<"lobby" | "quiz" | "results">("lobby");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(20);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showReviewList, setShowReviewList] = useState<boolean>(true);
  
  // Extra interactive filter for final review list: "all" | "incorrect" | "correct"
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "correct">("all");

  // Keep track of timeout for auto-advancing so we can clear it if user clicks "Keyingisi"
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sound toggle helper
  const handleToggleSound = () => {
    const newVal = sounds.toggleSound();
    setSoundEnabled(newVal);
  };

  // Start / restart quiz: select 15 random questions from 50 pool
  const startQuiz = () => {
    // Clear any stale auto-advance timeouts
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

    // Shuffle pool and slice 15
    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 15);
    
    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSecondsRemaining(20);
    setIsAnswered(false);
    setReviewFilter("all"); // Reset filter for the new round
    setGameStage("quiz");
  };

  // Sound cue on timer ticking low (last 5 seconds)
  useEffect(() => {
    if (gameStage === "quiz" && !isAnswered && secondsRemaining <= 5 && secondsRemaining > 0) {
      sounds.playTick();
    }
  }, [secondsRemaining, gameStage, isAnswered]);

  // Active Countdown Timer effect
  useEffect(() => {
    if (gameStage !== "quiz" || isAnswered) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStage, currentQuestionIndex, isAnswered]);

  // Handle case where 20s runs out without selection
  const handleTimeOut = () => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: null }));
    setIsAnswered(true);
    sounds.playIncorrect();

    // Automatically advance to the next question after 3.5 seconds
    autoAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToNextQuestion();
    }, 3500);
  };

  // Handle user selecting an option
  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // Prevent double taps

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    setIsAnswered(true);

    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }

    // Automatically transition to the next question after 4.5 seconds to give them time to read the explanation
    autoAdvanceTimeoutRef.current = setTimeout(() => {
      advanceToNextQuestion();
    }, 4500);
  };

  // Manual transition or triggered by auto-advance timeouts
  const advanceToNextQuestion = () => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

    if (currentQuestionIndex < 14) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSecondsRemaining(20);
      setIsAnswered(false);
    } else {
      // Game over, calculate and go to results
      setGameStage("results");
      
      // Calculate score to play victory/failure melodies
      const totalCorrect = selectedQuestions.reduce((acc, q, idx) => {
        return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
      }, 0);

      // Play matching high-quality synth finale
      setTimeout(() => {
        if (totalCorrect >= 10) {
          sounds.playSuccess();
        } else {
          sounds.playFailure();
        }
      }, 300);
    }
  };

  // Derived states
  const totalCorrect = selectedQuestions.reduce((acc, q, idx) => {
    const answer = userAnswers[idx];
    return acc + (answer === q.correctIndex ? 1 : 0);
  }, 0);

  const totalWrong = selectedQuestions.reduce((acc, q, idx) => {
    const answer = userAnswers[idx];
    return acc + (answer !== null && answer !== undefined && answer !== q.correctIndex ? 1 : 0);
  }, 0);

  const totalUnanswered = selectedQuestions.reduce((acc, q, idx) => {
    const answer = userAnswers[idx];
    return acc === undefined ? 0 : acc + (answer === null ? 1 : 0);
  }, 0);

  const accuracyPercent = Math.round((totalCorrect / 15) * 100);
  const passed = totalCorrect >= 10;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-900 selection:text-white relative overflow-x-hidden">
      
      {/* Visual background details for cosmic look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-indigo-900/10 via-purple-900/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section */}
      <header className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center border-b border-slate-900">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-950 p-2 rounded-xl border border-indigo-500/20 shadow-lg shadow-indigo-950/50">
            <Brain className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white block">
              Mantiqiy Tafakkur
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase">
              IQ Test Imtihon Plakat
            </span>
          </div>
        </div>

        <button
          onClick={handleToggleSound}
          id="sound_toggle_btn"
          className="p-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          title={soundEnabled ? "Tovushni o'chirish" : "Tovushni yoqish"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-mono font-medium hidden sm:inline">Ovoz: Yoqilgan</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 text-slate-500" />
              <span className="text-xs font-mono font-medium text-slate-500 hidden sm:inline">Ovoz: O'chiq</span>
            </>
          )}
        </button>
      </header>

      {/* Main Content Card */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* Stage 1: Lobby Screen */}
        {gameStage === "lobby" && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Brain/Intellect Badge */}
            <div className="inline-flex items-center justify-center p-5 bg-indigo-950/80 rounded-2xl mb-8 border border-indigo-500/20 shadow-inner">
              <Brain className="w-14 h-14 text-indigo-400 glow-purple" />
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Mantiqiy Savollar <span className="text-indigo-400">Testi</span>
            </h1>
            
            <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base md:text-lg leading-relaxed">
              Tafakkuringizning chuqurligi va mantiqiy reaksiyalarizni sinab ko'ring. Noan'anaviy, jumboqli va intellektual 15 ta test savoli!
            </p>

            {/* Rules Dashboard Bento card in dark design */}
            <div className="bg-slate-950/80 rounded-xl p-5 md:p-6 mb-8 text-left max-w-xl mx-auto border border-slate-800">
              <h2 className="font-display font-bold text-slate-200 mb-4 flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-indigo-400" />
                Test Qoidalari:
              </h2>
              <ul className="space-y-3.5 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-bold flex items-center justify-center text-xs">1</span>
                  <span>Jami <strong>50 ta mantiqiy savol</strong> ichidan mutlaqo <strong>15 ta tasodifiy savol</strong> tizim tomonidan tanlanadi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-bold flex items-center justify-center text-xs">2</span>
                  <span>Har bitta savol uchun atigi <strong>20 soniya vaqt</strong> beriladi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-bold flex items-center justify-center text-xs">3</span>
                  <span>Belgilangan 20 soniyada javob tanlanmasa, tizim go'yoki noto'g'ri deb qabul qilib, o'g'rincha <strong>avtomatik keyingisiga o‘tib ketadi</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-bold flex items-center justify-center text-xs">4</span>
                  <span>Agar yakunda kamida <strong>10 ta va undan ko'p to'g'ri javob</strong> topsangiz — testdan muvaffaqiyatli o'tgan bolasiz!</span>
                </li>
              </ul>
            </div>

            {/* Call to action */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              id="start_test_btn"
              className="px-8 py-4.5 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold text-lg rounded-xl shadow-xl transition-all duration-200 flex items-center gap-2.5 mx-auto cursor-pointer"
            >
              Testni Boshlash
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <div className="mt-8 text-[11px] text-slate-600 font-mono tracking-wider">
              TIZIM HOLATI: 50 JUMBOQ UNIKAL FAOL • KOD: UTF-8 SECURE
            </div>
          </motion.div>
        )}

        {/* Stage 2: Active Quiz Playing */}
        {gameStage === "quiz" && (
          <div className="space-y-6">
            
            {/* Header info indicator */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 md:p-5 flex justify-between items-center shadow-lg">
              <div className="space-y-1">
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-widest block">
                  Imtihon Jarayoni
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-white">
                    {currentQuestionIndex + 1}
                  </span>
                  <span className="text-slate-700 text-xl font-light">/</span>
                  <span className="text-slate-400 font-medium text-lg">15</span>
                  <span className="text-xs bg-indigo-950 text-indigo-400 font-semibold px-2 border border-indigo-500/20 rounded py-0.5 ml-1">
                    Mantiq
                  </span>
                </div>
              </div>

              {/* Countdown Timer with glowing critical red colors */}
              <div className="flex items-center gap-2">
                <div className={`px-4 py-3 rounded-xl flex items-center gap-2.5 border transition-all duration-200 ${
                  secondsRemaining <= 5 
                    ? "bg-red-950/80 text-red-400 border-red-500/50 shadow-lg shadow-red-950/50" 
                    : secondsRemaining <= 10 
                    ? "bg-amber-950/80 text-amber-400 border-amber-500/40 shadow-sm"
                    : "bg-slate-950 text-indigo-400 border-slate-800"
                }`}>
                  <Timer className={`w-5 h-5 ${secondsRemaining <= 5 ? "animate-spine text-red-500" : ""}`} />
                  <span className="font-display font-bold text-xl md:text-2xl tracking-tight leading-none min-w-[30px] text-center">
                    {secondsRemaining}
                  </span>
                  <span className="text-xs opacity-60 font-mono">soniya</span>
                </div>
              </div>
            </div>

            {/* Graphical Progress Bar indicator */}
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800/60 p-0.5">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${((currentQuestionIndex + 1) / 15) * 100}%` }}
              />
            </div>

            {/* Core Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8"
              >
                {/* Question bubble */}
                <h3 className="font-display text-xl md:text-2xl font-black text-white mb-8 leading-snug">
                  {selectedQuestions[currentQuestionIndex]?.question}
                </h3>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 gap-3.5">
                  {selectedQuestions[currentQuestionIndex]?.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQuestionIndex] === idx;
                    const isCorrectAnswer = idx === selectedQuestions[currentQuestionIndex]?.correctIndex;
                    const hasUserAnswered = userAnswers[currentQuestionIndex] !== undefined;

                    // Compute dynamic styles
                    let optionStyle = "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
                    let prefixStyle = "bg-slate-900 border border-slate-800 text-slate-400";
                    let iconNode = null;

                    if (hasUserAnswered) {
                      if (isCorrectAnswer) {
                        // All users see the correct answer revealed in green
                        optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-100 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]";
                        prefixStyle = "bg-emerald-500 border-none text-white";
                        iconNode = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
                      } else if (isSelected) {
                        // If user selected this wrong answer, color it red
                        optionStyle = "border-rose-500 bg-rose-950/40 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]";
                        prefixStyle = "bg-rose-600 border-none text-white";
                        iconNode = <XCircle className="w-5 h-5 text-rose-400" />;
                      } else {
                        // Not selected and incorrect
                        optionStyle = "border-slate-900/80 opacity-40 bg-slate-950/20 text-slate-500";
                        prefixStyle = "bg-slate-950 text-slate-600 border-slate-900";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        id={`option_btn_${idx}`}
                        className={`w-full text-left p-4.5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center font-display font-semibold transition-colors text-sm ${prefixStyle}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm md:text-base leading-relaxed tracking-wide">
                            {option}
                          </span>
                        </div>
                        {iconNode}
                      </button>
                    );
                  })}
                </div>

                {/* Conditional reviews / explainers */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-slate-800 space-y-4 overflow-hidden"
                    >
                      {/* Banner of accuracy */}
                      {userAnswers[currentQuestionIndex] === null ? (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm md:text-base font-semibold">
                          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <span>Vaqt tugadi! Siz 20 soniya ichida javob berishga ulgurmadingiz.</span>
                        </div>
                      ) : userAnswers[currentQuestionIndex] === selectedQuestions[currentQuestionIndex]?.correctIndex ? (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm md:text-base font-semibold animate-pulse">
                          <Check className="w-5 h-5 text-emerald-300 bg-emerald-800 rounded-full p-0.5 flex-shrink-0" />
                          <span>To'g'ri javob topshirdingiz! Ofarin, juda tezkor.</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm md:text-base font-semibold">
                          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <span>Javobingiz noto'g'ri bo'ldi. Mantiqan mulohaza qilib ko'ring!</span>
                        </div>
                      )}

                      {/* Explanation Block */}
                      <div className="bg-indigo-950/40 rounded-xl p-4.5 border border-indigo-500/20 text-sm md:text-base text-indigo-200/90 space-y-1.5 shadow-inner">
                        <span className="font-display font-bold text-indigo-300 flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono">
                          <BookOpen className="w-4 h-4 text-indigo-400" />
                          Mantiqiy Izoh & Yechim:
                        </span>
                        <p className="text-slate-300 italic leading-relaxed text-sm md:text-base">
                          {selectedQuestions[currentQuestionIndex]?.explanation}
                        </p>
                      </div>

                      {/* Action Next Step Button */}
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={advanceToNextQuestion}
                          id="next_question_btn"
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-semibold rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base"
                        >
                          {currentQuestionIndex === 14 ? "Natijalarni Analiz Qilish" : "Keyingi Savolga O'tish"}
                          <ChevronRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </AnimatePresence>

            {/* Bottom info hints */}
            {!isAnswered && (
              <p className="text-center text-xs text-slate-500 font-mono tracking-wider">
                Vaqt ketmoqda! O'ylab o'tirmay, eng mantiqiy variantni tanlang.
              </p>
            )}

            {isAnswered && (
              <p className="text-center text-[11px] text-slate-600 font-mono tracking-widest uppercase">
                Tizim avtomatik tarzda bir necha soniyadan so'ng keyingi testga ravona bo'ladi...
              </p>
            )}
          </div>
        )}

        {/* Stage 3: Game Completion Results Dashboard */}
        {gameStage === "results" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Symmetrical Victory/Failure Card */}
            <div className={`bg-slate-900/70 rounded-2xl border backdrop-blur-md shadow-2xl p-6 md:p-10 text-center relative overflow-hidden ${
              passed ? "border-emerald-500/30 shadow-emerald-950/5" : "border-slate-800 shadow-slate-950/30"
            }`}>
              
              {/* Emblem icon */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-slate-950 border border-slate-800">
                {passed ? (
                  <div className="relative">
                    <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.2)] animate-bounce" />
                    <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
                  </div>
                ) : (
                  <AlertCircle className="w-16 h-16 text-slate-500" />
                )}
              </div>

              {/* Title & Badge */}
              <h1 className="font-display text-3xl md:text-5xl font-black text-white mb-3">
                {passed ? "Muvaffaqiyatli O'tdingiz!" : "Omadingiz kelmadi!"}
              </h1>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold mb-8 uppercase tracking-widest border">
                {passed ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <Smile className="w-4.5 h-4.5 text-emerald-400" /> 10+ To'g'ri: IMTIHONDAN O'TDINGIZ
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <Frown className="w-4.5 h-4.5 text-rose-400" /> IMTIHONDAN O'TA OLMADINGIZ (Min 10/15)
                  </span>
                )}
              </div>

              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                {passed 
                  ? "Ajoyib intellektual salohiyat! Mantiqiy savollarga o'ta chaqqonlik bilan to'g'ri javob berdingiz va to'siqni zabt etdingiz." 
                  : "Mantiqiy savollar asosan noodatiy fikrlashni talab etadi. Quyidagi xatoliklarni ko'rib chiqing va qaytadan kuchingizni sinang."}
              </p>

              {/* Performance Grid of Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
                <div className="bg-slate-950/60 rounded-xl p-4.5 border border-slate-800">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-mono mb-1.5">To'g'ri</span>
                  <span className="font-display font-black text-3xl text-emerald-400">{totalCorrect} / 15</span>
                </div>
                
                <div className="bg-slate-950/60 rounded-xl p-4.5 border border-slate-800">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-mono mb-1.5">Noto'g'ri</span>
                  <span className="font-display font-black text-3xl text-rose-400">{totalWrong} ta</span>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4.5 border border-slate-800">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-mono mb-1.5">O'tkazilgan</span>
                  <span className="font-display font-black text-3xl text-amber-400">{totalUnanswered} ta</span>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-4.5 border border-slate-800">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-mono mb-1.5">Muvaffaqiyat</span>
                  <span className="font-display font-black text-3xl text-indigo-400">{accuracyPercent}%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={startQuiz}
                  id="retry_test_btn"
                  className="w-full sm:w-auto px-7 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 justify-center cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  Qayta urinib ko'rish
                </button>
                
                <button
                  onClick={() => setShowReviewList(!showReviewList)}
                  id="toggle_review_btn"
                  className="w-full sm:w-auto px-7 py-4 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white font-display font-semibold rounded-xl flex items-center gap-2 justify-center cursor-pointer"
                >
                  <Eye className="w-5 h-5 text-indigo-400" />
                  {showReviewList ? "Tahlilni berkitish" : "Tahlilni ochish"}
                </button>
              </div>

            </div>

            {/* Stage 3.2: Detailed Explanations / Review list with filtering tabs */}
            {showReviewList && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Filter and Explanations head section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <ListChecks className="w-5 h-5 text-indigo-400" />
                    <h2 className="font-display font-bold text-lg md:text-xl text-white">
                      Savollarning batafsil mantiqiy tahlili
                    </h2>
                  </div>

                  {/* FILTER CONTROLLERS (Aids: noto'g'ri to'g'rilani oxirida ko'rsatish) */}
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 items-center gap-1 w-full md:w-auto">
                    <Filter className="w-3.5 h-3.5 text-slate-500 ml-2 hidden sm:inline" />
                    
                    <button
                      onClick={() => setReviewFilter("all")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        reviewFilter === "all" 
                          ? "bg-slate-800 text-white" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Barchasi ({selectedQuestions.length})
                    </button>
                    
                    <button
                      onClick={() => setReviewFilter("incorrect")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        reviewFilter === "incorrect" 
                          ? "bg-rose-950 text-rose-300 border border-rose-900" 
                          : "text-rose-400 hover:text-rose-300"
                      }`}
                    >
                      Xato javoblar ({totalWrong + totalUnanswered})
                    </button>
                    
                    <button
                      onClick={() => setReviewFilter("correct")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        reviewFilter === "correct" 
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-900" 
                          : "text-emerald-400 hover:text-emerald-300"
                      }`}
                    >
                      To'g'ri ({totalCorrect})
                    </button>
                  </div>
                </div>

                {/* Filtered list rendering */}
                <div className="space-y-4">
                  {selectedQuestions
                    .map((q, idx) => ({ q, idx, ans: userAnswers[idx], isCorrect: userAnswers[idx] === q.correctIndex }))
                    .filter(({ isCorrect, ans }) => {
                      if (reviewFilter === "incorrect") {
                        return !isCorrect; // either missed (ans === null) or incorrect (ans !== correctIndex)
                      }
                      if (reviewFilter === "correct") {
                        return isCorrect;
                      }
                      return true;
                    })
                    .map(({ q, idx, ans, isCorrect }) => {
                      return (
                        <div 
                          key={idx}
                          className={`bg-slate-900/50 rounded-xl border p-5 md:p-6 shadow-md space-y-4 transition-all duration-150 ${
                            ans === null 
                              ? "border-amber-500/30 bg-amber-950/10" 
                              : isCorrect 
                              ? "border-emerald-500/20 bg-emerald-950/10" 
                              : "border-rose-500/35 bg-rose-950/15"
                          }`}
                        >
                          {/* Title header */}
                          <div className="flex justify-between items-start gap-3">
                            <span className="font-display font-semibold text-slate-500 text-sm py-1 font-mono">
                              SAVOL #{idx + 1} (bazadan #{q.id})
                            </span>

                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold leading-none ${
                              ans === null 
                                ? "bg-amber-950/80 text-amber-400 border border-amber-550/30" 
                                : isCorrect 
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/20" 
                                : "bg-rose-950/80 text-rose-400 border border-rose-500/25"
                            }`}>
                              {ans === null ? "Vaqt tugagan" : isCorrect ? "To'g'ri javob" : "Noto'g'ri javob"}
                            </span>
                          </div>

                          {/* Question Text */}
                          <p className="font-display font-extrabold text-white leading-relaxed text-base md:text-lg">
                            {q.question}
                          </p>

                          {/* Selected info & correct answer list */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            
                            {/* Option preview list */}
                            <div className="text-xs space-y-1.5 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                              <span className="text-slate-500 font-mono text-[10px] block mb-1 uppercase tracking-wider">SAVOL VARIANTLARI:</span>
                              {q.options.map((opt, oIdx) => {
                                const isCorrectOpt = oIdx === q.correctIndex;
                                const isUserOpt = oIdx === ans;
                                return (
                                  <div 
                                    key={oIdx} 
                                    className={`flex items-start gap-2 p-1.5 rounded ${
                                      isCorrectOpt 
                                        ? "text-emerald-400 bg-emerald-950/20 font-semibold" 
                                        : isUserOpt && !isCorrectOpt 
                                        ? "text-rose-400 bg-rose-950/20 font-medium line-through" 
                                        : "text-slate-400"
                                    }`}
                                  >
                                    <span className="font-bold text-xs min-w-[14px]">{String.fromCharCode(65 + oIdx)}.</span>
                                    <span>{opt}</span>
                                    {isCorrectOpt && <span className="text-[10px] text-emerald-400 ml-auto bg-emerald-950 px-1.5 border border-emerald-555/20 rounded">(To'g'ri)</span>}
                                    {isUserOpt && !isCorrectOpt && <span className="text-[10px] text-rose-400 ml-auto bg-rose-950 px-1.5 border border-rose-500/20 rounded">(Sizniki)</span>}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Detail summary bubble */}
                            <div className="text-sm space-y-3 flex flex-col justify-start">
                              <div>
                                <span className="text-slate-500 text-xs block font-mono uppercase tracking-wider mb-1">SIZNING JAVOBINGIZ:</span>
                                <span className={`text-sm font-bold ${
                                  ans === null 
                                    ? "text-amber-400 italic" 
                                    : isCorrect 
                                    ? "text-emerald-400" 
                                    : "text-rose-400"
                                }`}>
                                  {ans === null 
                                    ? "Hech narsa tanlanmagan (vaqt tugagan)" 
                                    : `${String.fromCharCode(65 + ans)}) ${q.options[ans]}`}
                                </span>
                              </div>

                              <div className="pt-3 border-t border-dashed border-slate-800">
                                <span className="text-indigo-300 font-bold text-xs flex items-center gap-1.5 mb-1 text-indigo-400 uppercase tracking-wider">
                                  <Award className="w-3.5 h-3.5" />
                                  Mantiqiy tushuntirish:
                                </span>
                                <p className="text-slate-400 italic text-xs md:text-sm leading-relaxed">
                                  {q.explanation}
                                </p>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}

                  {selectedQuestions.map((q, idx) => ({ q, idx, ans: userAnswers[idx], isCorrect: userAnswers[idx] === q.correctIndex }))
                    .filter(({ isCorrect, ans }) => {
                      if (reviewFilter === "incorrect") return !isCorrect;
                      if (reviewFilter === "correct") return isCorrect;
                      return true;
                    }).length === 0 && (
                      <div className="text-center py-10 bg-slate-900/10 rounded-xl border border-slate-800">
                        <p className="text-slate-500 text-sm">Ushbu kofitsentda hech qanday savol mavjud emas.</p>
                      </div>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

      </main>

      {/* Modern Footer section */}
      <footer className="max-w-4xl mx-auto text-center py-12 px-4 text-xs text-slate-500 font-medium border-t border-slate-900 mt-20">
        <p>&copy; 2026 Mantiqiy Tafakkur Portali. Barcha huquqlar himoyalangan.</p>
        <p className="mt-2 text-[10px] text-slate-600 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
          <span>Intellektual O'zbek Vikipediyasi Test Tizimi v2.5</span>
          <span>•</span>
          <span className="text-indigo-500">Theme: Cosmic Black Dark</span>
        </p>
      </footer>
    </div>
  );
}

