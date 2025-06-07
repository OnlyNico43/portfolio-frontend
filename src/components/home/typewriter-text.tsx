'use client';

import { useEffect, useState, type FunctionComponent, type ReactElement } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
}

const TypewriterText: FunctionComponent<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  onComplete,
  showCursor = true,
  cursorChar = '|',
}): ReactElement => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        },
        currentIndex === 0 ? delay : speed,
      );

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();

      // Hide cursor after completion if specified
      if (!showCursor) {
        setTimeout(() => {
          setShowCursorBlink(false);
        }, 1000);
      }
    }
  }, [currentIndex, text, delay, speed, onComplete, isComplete, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursorBlink && (
        <span className={`inline-block animate-pulse font-light ${isComplete && !showCursor ? 'opacity-0' : ''}`}>
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypewriterText;
