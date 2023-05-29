import { useEffect, useState } from "react";
import { Card } from "src/features/flashcard/data";
import _ from "lodash";
import FlashcardContainer from "src/features/flashcard/Container";
import Papa from "papaparse";

const FlashcardDemo = () => {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    Papa.parse("/taiwanese_vocab.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // @ts-ignore - force type as card[]
        const data: Card[] = result.data || [];
        setCards(data);
      },
    });
  }, []);

  return (
    <div>
      {cards.length && <FlashcardContainer initialFlashcards={cards} />};
    </div>
  );
};

export default FlashcardDemo;
