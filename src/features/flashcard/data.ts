type Card = {
  audio: string;
  audioText: string;
  primaryTranslation: string;
};

export type Lesson = {
  name: string;
  id: string;
  cards: Card[];
};

export const lessons = [
  {
    name: "Taiwanese Lesson 8",
    id: "taigi_lesson_8",
    cards: [
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/12098.mp3",
        audioText: "thâu-thiànn",
        primaryTranslation: "頭痛",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/00007.mp3",
        audioText: "tsi̍t-ji̍t-kàu-àm",
        primaryTranslation: "每天 / 一早到晚",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/03852.mp3",
        audioText: "tiānn-tiānn",
        primaryTranslation: "常常",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/09500.mp3",
        audioText: "kám-kak",
        primaryTranslation: "覺得",
      },
    ],
  },
  {
    name: "Taiwanese Lesson 12",
    id: "taigi_lesson_12",
    cards: [
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/04702.mp3",
        audioText: "piān-tong",
        primaryTranslation: "便當",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/03894.mp3",
        audioText: "thiám",
        primaryTranslation: "香",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/13031.mp3",
        audioText: "nâ-kiû",
        primaryTranslation: "籃球",
      },
      {
        audio:
          "https://hts.ithuan.tw/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=%E5%8F%B0%E8%AA%9E&%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=u%C4%AB-si%C3%A1nn-mi%CC%8Dh",
        audioText: "uī-siánn-mi̍h",
        primaryTranslation: "為什麼",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/09694.mp3",
        audioText: "hioh-khùn",
        primaryTranslation: "休息",
      },
    ],
  },
  {
    name: "Taiwanese Lesson 16",
    id: "taigi_lesson_8",
    cards: [
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/03798.mp3",
        audioText: "kî-kuài",
        primaryTranslation: "奇怪",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/06788.mp3",
        audioText: "thó-ià",
        primaryTranslation: "討厭",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/02344.mp3",
        audioText: "hó-ka-tsài",
        primaryTranslation: "幸好",
      },
      {
        audio:
          "https://1763c5ee9859e0316ed6-db85b55a6a3fbe33f09b9245992383bd.ssl.cf1.rackcdn.com/11656.mp3",
        audioText: "ha̍k-hāu",
        primaryTranslation: "學校",
      },
    ],
  },
];
