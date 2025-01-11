import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";
import { LoveRoulette } from "./LoveRoulette";

export const ProposalButton = () => {
  const [answered, setAnswered] = useState(false);
  const { toast } = useToast();

  const handleYes = () => {
    setAnswered(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast({
      title: "She said YES! 💖",
      description: "This is the beginning of our forever!",
      duration: 5000,
    });
  };

  return (
    <div className="text-center">
      <h3 className="romantic-text text-3xl mb-6 text-pink-600">
        {answered ? "I love you! 💖" : "Will you be my girlfriend?"}
      </h3>
      {!answered && (
        <Button
          onClick={handleYes}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Yes 💝
        </Button>
      )}
      <LoveRoulette isVisible={answered} />
    </div>
  );
};