import { create } from "zustand";
import { CardAttribute } from "src/features/flashcard/types";
type FlashcardState = {
  cardFrontContent: Array<CardAttribute>;
  cardBackContent: Array<CardAttribute>;
};

export const useFlashcardStore = create<FlashcardState>((set) => ({
  // TODO: Default will eventually come from backend source or constant
  cardFrontContent: ["audio"],
  cardBackContent: ["primaryTranslation", "audioText"],

  setCardAttributes: (
    front: Array<CardAttribute>,
    back: Array<CardAttribute>
  ) => {
    return set(() => {
      return {
        cardFrontContent: front,
        cardBackContent: back,
      };
    });
  },
}));
