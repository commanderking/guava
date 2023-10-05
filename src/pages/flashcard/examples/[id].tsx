import { getAllFlashcardIds, getFlashcardCsv } from "@/lib/flashcard";
import FlashcardContainer from "src/features/flashcard/Container";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Card } from "src/features/flashcard/types";
import VocabTableContainer from "src/features/vocabTable/Container";
type Props = {
  cards: Card[];
};

export default function Post({
  cards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ cards });
  return (
    <div>
      <FlashcardContainer initialFlashcards={cards} />
      <VocabTableContainer rowData={cards} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllFlashcardIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const csvResults =
    params?.id && typeof params?.id === "string"
      ? getFlashcardCsv(params.id)
      : null;

  const cards = csvResults?.data || [];

  return {
    props: {
      cards,
    },
  };
};
