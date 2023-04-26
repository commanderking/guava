import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";

const flashcardData = [
  {
    audio:
      "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/12098.mp3",
    back: "thâu-thiànn",
  },
  {
    audio:
      "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/00007.mp3",
    back: "tsi̍t-ji̍t-kàu-àm",
  },
  {
    audio:
      "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/03852.mp3",
    back: "tiānn-tiānn",
  },
  {
    audio:
      "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/09500.mp3",
    back: "kám-kak",
  },
];

const FlashcardPage = () => {
  const [flipped, set] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div className="flex align-center h-full justify-center h-[400px] relative">
      {!flipped && (
        <a.div
          className="max-w-lg max-h-lg absolute w-[350px] z-5 h-[350px] will-change-transform will-change-opacity border-2 bg-blue-500 flex items-center justify-center"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <audio autoPlay controls src={flashcardData[cardIndex].audio} />
        </a.div>
      )}
      {flipped && (
        <a.div
          className="max-w-lg max-h-lg absolute w-[350px] h-[350px] will-change-transform will-change-opacity border-2 bg-red-500 flex items-center justify-center"
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        >
          <span className="text-xl">{flashcardData[cardIndex].back}</span>
        </a.div>
      )}
      <div className="absolute bottom-0 bg-blue-700">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => set((state) => !state)}
        >
          Flip
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
