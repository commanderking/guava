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
        <div className="mt-8 w-9/12 m-auto border-2 p-4 rounded-xl">
          <AudioSlicerContainer />
        </div>
      </main>
    </>
  );
}
