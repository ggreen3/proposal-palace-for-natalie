import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import confetti from 'canvas-confetti';

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

  const celebrateWin = () => {
    // Multiple confetti bursts for more excitement
    const count = 3;
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['#FFE0E6', '#FF69B4', '#FF1493', '#FF69B4', '#FFB6C1']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(200 * particleRatio)
      });
    }

    for(let i = 0; i < count; i++) {
      setTimeout(() => {
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }, i * 200);
    }
  };

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    const segments = dateOptions.length;
    const fullRotations = (Math.floor(Math.random() * 3) + 3) * 360;
    const segmentAngle = 360 / segments;
    const randomSegment = Math.floor(Math.random() * segments);
    const finalAngle = fullRotations + (randomSegment * segmentAngle);
    
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(dateOptions[randomSegment]);
      celebrateWin();
      toast({
        title: "✨ Amazing Date Coming Up! 💖",
        description: `Get ready for: ${dateOptions[randomSegment]} 🎉`,
        duration: 5000,
      });
    }, 5000);
  };

  return isVisible ? (
    <div className="mt-12 text-center fade-in">
      <h3 className="romantic-text text-3xl mb-6 text-pink-600">
        Spin for Our Next Date! 💖
      </h3>
      
      <div className="relative w-96 h-96 mx-auto mb-8">
        <div
          ref={wheelRef}
          className="absolute w-full h-full rounded-full border-4 border-pink-400 transition-transform duration-5000 ease-out shadow-lg"
          style={{
            background: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
          }}
        >
          {dateOptions.map((option, index) => {
            const angle = (360 / dateOptions.length) * index;
            const rotation = angle + 90; // Offset to align text
            return (
              <div
                key={option}
                className="absolute w-1 h-1 left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div 
                  className="absolute whitespace-nowrap -translate-y-1/2 pl-8 pr-4 py-2 rounded-full bg-white/80 backdrop-blur-sm"
                  style={{
                    transform: `rotate(${-angle}deg)`,
                    left: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <span className="text-pink-800 font-medium text-sm">
                    {option}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-4xl filter drop-shadow-lg"
          style={{ color: '#FF1493' }}
        >
          ▼
        </div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {spinning ? "✨ Magic Happening..." : "Spin the Wheel of Love! 💝"}
      </Button>

      {result && (
        <p className="mt-4 text-2xl text-pink-600 romantic-text animate-bounce">
          Let's go on a {result} date! 💕
        </p>
      )}
    </div>
  ) : null;
};