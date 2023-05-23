import { lessons, Lesson } from "src/features/flashcard/data";
import _ from "lodash";
import FlashcardContainer from "src/features/flashcard/Container";

const flashcardData = lessons.reduce((allVocab, currentVocab) => {
  return [...allVocab, ...currentVocab.cards];
}, [] as Lesson["cards"]);

const FlashcardDemo = () => {
  return <FlashcardContainer initialFlashcards={flashcardData} />;
};

export default FlashcardDemo;
