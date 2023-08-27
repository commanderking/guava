import React, { useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/web";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { Card } from "src/features/flashcard/types";
import CardEditor from "src/features/flashcard/components/CardEditor";
import { useFlashcardStore } from "src/store/flashcardStore";
import CardContent from "src/features/flashcard/components/CardContent";

import _ from "lodash";

const getNextIndex = (currentIndex: number, maxLength: number) => {
  if (currentIndex === maxLength - 1) {
    return currentIndex;
  }

  return currentIndex + 1;
};

const getPreviousIndex = (currentIndex: number) => {
  if (currentIndex === 0) {
    return 0;
  }

  return currentIndex - 1;
};

type Props = {
  initialFlashcards: Card[];
};

const FlashcardPage = ({ initialFlashcards }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState(initialFlashcards);

  const handleNextIndex = () => {
    const nextIndex = getNextIndex(cardIndex, maxLength);
    setFlipped(false);
    setCardIndex(nextIndex);
  };

  const handlePreviousIndex = () => {
    const previousIndex = getPreviousIndex(cardIndex);
    setFlipped(false);
    setCardIndex(previousIndex);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      handlePreviousIndex();
    }
    if (event.code === "ArrowRight") {
      handleNextIndex();
    }
    if (event.code === "Space" || event.code === "ArrowDown") {
      setFlipped(!flipped);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  const handleRandomize = () => {
    setCardIndex(0);
    setFlipped(false);
    setFlashcards(_.shuffle(initialFlashcards));
  };

  const maxLength = flashcards.length;

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const { front, back } = useFlashcardStore((state) => ({
    front: state.cardFrontContent,
    back: state.cardBackContent,
  }));

  return (
    <div className="max-w-[400px] m-auto">
      {/* <CardEditor /> */}
      <div className="text-center pt-4">
        <button
          className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border-2 border-lime-500 hover:border-transparent rounded"
          onClick={handleRandomize}
        >
          Randomize
        </button>
      </div>
      <div className="pt-4">
        <div className="flex align-center h-full justify-center relative text-center">
          {!flipped && (
            <a.div
              className="max-w-lg max-h-lg w-full z-5 h-[200px] will-change-transform will-change-opacity border-2 border-lime-500 flex items-center justify-center"
              style={{ opacity: opacity.to((o) => 1 - o), transform }}
            >
              <CardContent
                card={flashcards[cardIndex]}
                sideAttributes={front}
              />
            </a.div>
          )}
          {flipped && (
            <a.div
              className="max-w-lg max-h-lg w-full h-[200px] will-change-transform will-change-opacity border-2 border-red-300 flex items-center justify-center flex-col"
              style={{
                opacity,
                transform,
                rotateX: "180deg",
              }}
            >
              <CardContent card={flashcards[cardIndex]} sideAttributes={back} />
            </a.div>
          )}
        </div>
      </div>
      <div className="flex justify-center m-4">
        <p className="text-xl">
          {cardIndex + 1} / {flashcards.length}
        </p>
      </div>
      <div className="flex justify-center">
        <button>
          <ArrowLeftCircle
            color="#84cc16"
            onClick={handlePreviousIndex}
            size={36}
          />
        </button>
        <div>
          <button
            className="bg-transparent hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border-2 border-lime-500 hover:border-transparent rounded"
            onClick={() => setFlipped((state) => !state)}
          >
            Flip
          </button>
        </div>
        <button>
          <ArrowRightCircle
            color="#84cc16"
            onClick={handleNextIndex}
            size={36}
          />
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
