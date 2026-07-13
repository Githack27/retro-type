'use client';

import React, { useState, useEffect, useRef } from 'react';

// A diverse bank of unique words to simulate classic typing tests
const UNIQUE_WORDS = [
  "carriage", "ribbon", "keys", "platen", "roller", "margin", "tabulator", "shift", "lock",
  "spacebar", "return", "bell", "metal", "ink", "paper", "vintage", "antique", "classic",
  "mechanic", "lever", "spring", "smith", "corona", "royal", "underwood", "remington", "hermes",
  "olivetti", "olympia", "brother", "adler", "continental", "imperial", "monarch", "woodstock",
  "typewriter", "keynote", "keystroke", "accuracy", "speed", "words", "letters", "minutes", "seconds",
  "history", "collect", "restore", "ribbons", "black", "red", "dusty", "heavy", "click", "clack",
  "ding", "sound", "write", "author", "novel", "letter", "poetry", "script", "journal", "document",
  "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "pack", "my", "box", "with",
  "five", "dozen", "liquor", "jugs", "frame", "striking", "every", "single", "character",
  "makes", "a", "when", "pressed", "hard", "on", "page", "flow", "like", "water", "inked",
  "crisp", "cotton", "sheet", "remember", "to", "breathe", "and", "keep", "a", "steady", "rhythm",
  "as", "you", "go", "precision", "is", "more", "valuable", "than", "pure", "velocity", "in",
  "this", "test"
];

// Helper to generate a paragraph of random words without consecutive repeats, optionally including numbers & punctuations
function generateWords(count: number, includePunctuation: boolean, includeNumbers: boolean): string[] {
  const words: string[] = [];
  
  while (words.length < count) {
    // Inject a number if enabled
    if (includeNumbers && words.length > 0 && words.length % 7 === 0 && Math.random() > 0.4) {
      const numType = Math.random();
      if (numType < 0.3) {
        words.push(Math.floor(Math.random() * 100).toString());
      } else {
        words.push(Math.floor(1910 + Math.random() * 80).toString());
      }
      continue;
    }

    const randomIndex = Math.floor(Math.random() * UNIQUE_WORDS.length);
    const word = UNIQUE_WORDS[randomIndex];
    if (words.length > 0 && words[words.length - 1] === word) {
      continue;
    }
    words.push(word);
  }

  // Inject punctuations and capitalization if enabled
  if (includePunctuation) {
    const punctuations = [",", ".", ";", "?", "!"];
    for (let i = 0; i < words.length; i++) {
      // Capitalize first word or words directly following terminal punctuations
      if (i === 0 || (i > 0 && [".", "?", "!"].some(p => words[i - 1].endsWith(p)))) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      
      // Inject random trailing punctuation
      if (i < words.length - 1 && i % 6 === 0 && i > 0 && Math.random() > 0.3) {
        const p = punctuations[Math.floor(Math.random() * punctuations.length)];
        words[i] = words[i] + p;
      }
    }
    // Set absolute ending punctuation for the final generated word
    const lastIdx = words.length - 1;
    if (lastIdx >= 0) {
      words[lastIdx] = words[lastIdx].replace(/[.,;?!]$/, "") + ".";
    }
  }

  return words;
}

export interface TypingMetrics {
  wpm: number;
  lpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  duration: number;
}

interface TyperProps {
  onComplete: (metrics: TypingMetrics) => void;
}

export default function Typer({ onComplete }: TyperProps) {
  const durations = [15, 30, 60, 120];
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(selectedDuration);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [words, setWords] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  // Toggle states for Punctuations and Numbers (multi-select options)
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  
  // Track total and correct keystrokes for accurate metrics
  const totalKeystrokes = useRef<number>(0);
  const correctKeystrokes = useRef<number>(0);
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize words with selected modes on mount / change
  useEffect(() => {
    resetTest();
  }, [includePunctuation, includeNumbers]);

  // Update timer left when duration changes (only if not testing)
  useEffect(() => {
    if (!isTesting) {
      setTimeLeft(selectedDuration);
    }
  }, [selectedDuration, isTesting]);

  const targetText = words.join(' ');

  // Focus hidden textarea
  const focusInput = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Auto focus input on mount
  useEffect(() => {
    focusInput();
  }, []);

  // Timer countdown hook
  useEffect(() => {
    if (isTesting && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTesting, timeLeft]);

  // Handle test completion when time reaches zero
  useEffect(() => {
    if (isTesting && timeLeft === 0) {
      finishTest();
    }
  }, [timeLeft, isTesting]);

  const startTest = () => {
    setIsTesting(true);
    totalKeystrokes.current = 0;
    correctKeystrokes.current = 0;
  };

  const finishTest = () => {
    setIsTesting(false);
    
    // Calculate final metrics
    const durationMin = selectedDuration / 60;
    
    // Calculate correct letters currently matching the target text in the final input
    let finalCorrectChars = 0;
    for (let i = 0; i < inputVal.length; i++) {
      if (inputVal[i] === targetText[i]) {
        finalCorrectChars++;
      }
    }

    // Standard WPM: 5 characters = 1 word
    const wpm = Math.round((finalCorrectChars / 5) / durationMin);
    const lpm = Math.round(finalCorrectChars / durationMin);
    
    // Accuracy based on actual correct key strikes out of total presses
    const accuracy = totalKeystrokes.current > 0 
      ? Math.round((correctKeystrokes.current / totalKeystrokes.current) * 100) 
      : 100;

    onComplete({
      wpm,
      lpm,
      accuracy: Math.min(100, Math.max(0, accuracy)),
      totalKeystrokes: totalKeystrokes.current,
      correctKeystrokes: correctKeystrokes.current,
      incorrectKeystrokes: totalKeystrokes.current - correctKeystrokes.current,
      duration: selectedDuration
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Don't allow typing beyond target text
    if (value.length > targetText.length) return;

    if (!isTesting && value.length > 0) {
      startTest();
    }

    // Capture keystrokes if the user didn't backspace
    if (value.length > inputVal.length) {
      const typedChar = value[value.length - 1];
      const targetChar = targetText[value.length - 1];
      
      totalKeystrokes.current += 1;
      if (typedChar === targetChar) {
        correctKeystrokes.current += 1;
      }
    }

    setInputVal(value);
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTesting(false);
    setTimeLeft(selectedDuration);
    setInputVal('');
    setWords(generateWords(150, includePunctuation, includeNumbers));
    totalKeystrokes.current = 0;
    correctKeystrokes.current = 0;
    setTimeout(() => focusInput(), 50);
  };

  // Automatically scroll typing text container to keep cursor in view
  useEffect(() => {
    const activeSpan = textContainerRef.current?.querySelector('.cursor-active');
    if (activeSpan && textContainerRef.current) {
      const container = textContainerRef.current;
      const spanTop = (activeSpan as HTMLElement).offsetTop;
      const containerHeight = container.clientHeight;
      
      // Keep cursor vertically centered or scrolled down appropriately
      if (spanTop > container.scrollTop + containerHeight - 80) {
        container.scrollTop = spanTop - containerHeight / 2;
      } else if (spanTop < container.scrollTop + 20) {
        container.scrollTop = Math.max(0, spanTop - 40);
      }
    }
  }, [inputVal]);

  // Compute character index offsets dynamically for clean word wrapping rendering
  let charOffsetAccumulator = 0;

  return (
    <div className="typer-section-container">
      {/* Top Left Options: Duration selector, Mode options, and Timer */}
      <div className="typer-controls-row">
        {/* Retro Sharp Duration Selector Container (Left) */}
        <div className="duration-selector-container">
          <div className="duration-options">
            {durations.map((d) => (
              <button
                key={d}
                disabled={isTesting}
                className={`duration-opt-btn ${selectedDuration === d ? 'active' : ''}`}
                onClick={() => setSelectedDuration(d)}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>

        {/* Retro Sharp Multi-Select Mode Container (Center) */}
        <div className="duration-selector-container">
          <span className="duration-label" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '12px', paddingRight: '8px', borderRight: '1px solid rgba(140, 130, 108, 0.4)' }}>
            <svg 
              viewBox="0 0 24 24" 
              width="14" 
              height="14" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="settings-svg-icon"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.3.3c.6.6.6 1.5 0 2.1l-.9.9c-.6.6-1.5.6-2.1 0l-.3-.3a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5v.5c0 .8-.6 1.5-1.4 1.5h-1.3c-.8 0-1.4-.7-1.4-1.5v-.5a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.3.3c-.6.6-1.5.6-2.1 0l-.9-.9c-.6-.6-.6-1.5 0-2.1l.3-.3a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1h-.5C2.7 12.5 2 11.9 2 11.1V9.8C2 9 2.7 8.3 3.5 8.3h.5a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.3-.3c-.6-.6-.6-1.5 0-2.1l.9-.9c.6-.6 1.5-.6 2.1 0l.3.3a1.6 1.6 0 0 0 1.7.3 1.6 1.6 0 0 0 1-1.5v-.5C10.5 1.7 11.1 1 11.9 1h1.3c.8 0 1.4.7 1.4 1.5v.5a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.3-.3c.6-.6 1.5-.6 2.1 0l.9.9c.6.6.6 1.5 0 2.1l-.3.3a1.6 1.6 0 0 0-.3 1.7 1.6 1.6 0 0 0 1.5 1h.5c.8 0 1.5.6 1.5 1.4v1.3c0 .8-.7 1.4-1.5 1.4h-.5a1.6 1.6 0 0 0-1.5 1z" />
            </svg>
          </span>
          <div className="duration-options">
            <button
              disabled={isTesting}
              className={`duration-opt-btn ${includePunctuation ? 'active' : ''}`}
              onClick={() => setIncludePunctuation(!includePunctuation)}
            >
              Punctuation
            </button>
            <button
              disabled={isTesting}
              className={`duration-opt-btn ${includeNumbers ? 'active' : ''}`}
              onClick={() => setIncludeNumbers(!includeNumbers)}
            >
              Numbers
            </button>
          </div>
        </div>

        {/* Live Timer Running View (Right) */}
        <div className="timer-box">
          <span className="timer-digit">{timeLeft}</span>
          <span className="timer-unit">s</span>
        </div>
      </div>

      {/* Main typewriter text container with glassmorphic paper background */}
      <div 
        className="typewriter-paper-overlay"
        onClick={focusInput}
      >
        {/* Hidden text area for capturing input natively */}
        <textarea
          ref={textareaRef}
          value={inputVal}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="hidden-typer-input"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Highlighted text rendering area with whole-word wrapping */}
        <div 
          ref={textContainerRef}
          className="words-scroller-container"
        >
          {words.map((word, wordIndex) => {
            const wordStartIdx = charOffsetAccumulator;
            charOffsetAccumulator += word.length + 1;

            return (
              <span 
                key={wordIndex} 
                className="typewriter-word-wrap"
              >
                {word.split('').map((char, charIdx) => {
                  const globalIdx = wordStartIdx + charIdx;
                  let charClass = 'char-untyped';
                  const isTyped = globalIdx < inputVal.length;
                  const isActive = globalIdx === inputVal.length;

                  if (isTyped) {
                    const isCorrect = inputVal[globalIdx] === char;
                    charClass = isCorrect ? 'char-correct' : 'char-incorrect';
                  } else if (isActive && isFocused) {
                    charClass = 'char-untyped cursor-active';
                  }

                  return (
                    <span 
                      key={charIdx} 
                      className={`${charClass} typewriter-char`}
                    >
                      {char === ' ' ? '\u00a0' : char}
                    </span>
                  );
                })}

                {/* Trailing space handler inside the word wrap block */}
                {wordIndex < words.length - 1 && (() => {
                  const spaceIdx = wordStartIdx + word.length;
                  let spaceClass = 'char-untyped';
                  const isTyped = spaceIdx < inputVal.length;
                  const isActive = spaceIdx === inputVal.length;

                  if (isTyped) {
                    const isCorrect = inputVal[spaceIdx] === ' ';
                    spaceClass = isCorrect ? 'char-correct' : 'char-incorrect';
                  } else if (isActive && isFocused) {
                    spaceClass = 'char-untyped cursor-active';
                  }

                  return (
                    <span 
                      key="space" 
                      className={`${spaceClass} typewriter-char`}
                    >
                      {'\u00a0'}
                    </span>
                  );
                })()}
              </span>
            );
          })}
        </div>
      </div>

      {/* Carriage Return Action Button */}
      <div className="reset-button-row">
        <button 
          className="retro-reset-btn"
          onClick={resetTest}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg 
            viewBox="0 0 24 24" 
            width="14" 
            height="14" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="reset-svg-icon"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          RESET
        </button>
      </div>
    </div>
  );
}
