import { create } from "zustand";
import { CardAttribute } from "src/features/flashcard/types";
type FlashcardState = {
  selectedCardAttributes: {
    front: Array<CardAttribute>;
    back: Array<CardAttribute>;
  };
};

export const useFlashcardStore = create<FlashcardState>((set) => ({
  // TODO: Default will eventually come from backend source or constant
  selectedCardAttributes: {
    front: ["audio", "audioText"],
    back: ["primaryTranslation"],
  },
  setCardAttributes: (
    cardAttributes: FlashcardState["selectedCardAttributes"]
  ) => {
    return set((state) => {
      return {
        selectedCardAttributes: cardAttributes,
      };
    });
  },
}));
