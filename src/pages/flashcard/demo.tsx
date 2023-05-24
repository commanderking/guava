import { cards } from "src/features/flashcard/data";
import _ from "lodash";
import FlashcardContainer from "src/features/flashcard/Container";

const FlashcardDemo = () => {
  return <FlashcardContainer initialFlashcards={cards} />;
};

export default FlashcardDemo;
