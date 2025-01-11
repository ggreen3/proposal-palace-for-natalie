import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface RouletteProps {
  isVisible: boolean;
}

const dateOptions = [
  "Romantic Dinner",
  "Movie Night",
  "Beach Picnic",
  "Dance Class",
  "Stargazing",
  "Cooking Together",
  "Art Gallery Visit",
  "Sunset Walk",
  "Game Night",
  "Wine Tasting",
  "Concert Date",
  "Spa Day"
];

export const LoveRoulette = ({ isVisible }: RouletteProps) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    // Random number of full rotations (3-5) plus random segment
    const segments = dateOptions.length;
    const fullRotations = (Math.floor(Math.random() * 3) + 3) * 360;
    const segmentAngle = 360 / segments;
    const randomSegment = Math.floor(Math.random() * segments);
    const finalAngle = fullRotations + (randomSegment * segmentAngle);
    
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
    }

    // Show result after animation
    setTimeout(() => {
      setSpinning(false);
      setResult(dateOptions[randomSegment]);
      toast({
        title: "Your Next Date! 💝",
        description: dateOptions[randomSegment],
        duration: 5000,
      });
    }, 5000);
  };

  return isVisible ? (
    <div className="mt-12 text-center fade-in">
      <h3 className="romantic-text text-3xl mb-6 text-pink-600">
        Spin for Our Next Date! 💖
      </h3>
      
      <div className="relative w-80 h-80 mx-auto mb-8">
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full border-4 border-pink-400 transition-transform duration-5000 ease-out"
          style={{
            background: "linear-gradient(to right, #ee9ca7, #ffdde1)",
          }}
        >
          {dateOptions.map((option, index) => {
            const angle = (360 / dateOptions.length) * index;
            return (
              <div
                key={option}
                className="absolute w-full h-full text-center text-sm"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-pink-800 font-medium"
                  style={{ top: '10%' }}
                >
                  {option}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-4xl">
          ▼
        </div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
      >
        {spinning ? "Spinning..." : "Spin the Wheel of Love! 💝"}
      </Button>

      {result && (
        <p className="mt-4 text-xl text-pink-600 romantic-text">
          Let's go on a {result} date! 💕
        </p>
      )}
    </div>
  ) : null;
};