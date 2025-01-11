import { HeartIcon } from "./HeartIcon";

export const ProposalMessage = () => {
  return (
    <div className="text-center max-w-2xl mx-auto p-6 fade-in">
      <h2 className="romantic-text text-4xl mb-6 text-pink-600">Dear Natalie</h2>
      <p className="text-lg mb-8 leading-relaxed text-gray-700">
        Every moment with you has been magical. Your smile brightens my darkest days,
        and your love makes my heart skip a beat. You're not just my best friend,
        you're my soulmate, and I can't imagine my life without you.
      </p>
      <div className="flex justify-center space-x-2">
        <HeartIcon />
        <HeartIcon />
        <HeartIcon />
      </div>
    </div>
  );
};