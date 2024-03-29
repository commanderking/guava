type CardAttributes = [
  "audio",
  "audioText",
  "primaryTranslation",
  "secondaryTranslation",
  "台語漢字"
];

export type CardAttribute = CardAttributes[any];

type mediaTypes = ["audio", "text"];

export type CardAttributeDisplay = {
  key: CardAttribute;
  label: string;
  mediaType: mediaTypes[any];
};

export type Card = {
  audio: string;
  audioText: string;
  primaryTranslation: string;
  secondaryTranslation?: string;
  台語漢字: string;
};
