import { useState, useEffect } from 'react';
import { Heart, Star, Moon, Sun, Music, Coffee, Gift, Flower } from 'lucide-react';
import { Button } from './ui/button';

const icons = [Heart, Star, Moon, Sun, Music, Coffee, Gift, Flower];
const createBoard = () => {
  const pairs = [...icons, ...icons];
  return pairs
    .map((Icon, index) => ({ id: index, Icon, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

export const MemoryGame = () => {
  const [cards, setCards] = useState(createBoard());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.Icon === secondCard.Icon) {
        setCards(cards.map((card, idx) =>
          idx === first || idx === second ? { ...card, isMatched: true } : card
        ));
        setMatches(m => m + 1);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === icons.length) {
      setIsComplete(true);
    }
  }, [matches]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) {
      setCards(cards.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      ));
      setFlippedCards([...flippedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(createBoard());
    setFlippedCards([]);
    setMatches(0);
    setIsComplete(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 fade-in">
      <h2 className="romantic-text text-3xl mb-6 text-pink-600 text-center">
        Find the Matching Pairs 💝
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square p-4 rounded-lg transition-all duration-300 transform hover:scale-105
              ${card.isFlipped || card.isMatched ? 'bg-pink-100' : 'bg-pink-500'}
              ${card.isMatched ? 'opacity-50' : 'opacity-100'}
            `}
            disabled={card.isMatched || flippedCards.length === 2}
          >
            {(card.isFlipped || card.isMatched) && (
              <card.Icon className="w-full h-full text-pink-600" />
            )}
          </button>
        ))}
      </div>
      {isComplete && (
        <div className="text-center mt-6">
          <p className="text-2xl text-pink-600 mb-4">You won! 🎉</p>
          <Button onClick={resetGame} className="bg-pink-500 hover:bg-pink-600">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};