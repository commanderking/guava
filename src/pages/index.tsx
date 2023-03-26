import Head from "next/head";
import AudioSlicerContainer from "src/features/audioSlicer/AudioSlicerContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Guava</title>
        <meta
          name="description"
          content="Slice and loop audio to practice speaking a new language or a singing a new song"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Guava Guava Guava!</h1>
        <AudioSlicerContainer />
      </main>
    </>
  );
}
