import Navbar from '@/components/navBar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoTrace 🌱 How it works</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center p-24 bg-green-50">
        <div className="fixed flex justify-center items-center top-0 w-full p-4 z-10">
          <Navbar />
        </div>
        <div className="pt-16 w-full max-w-5xl">
          {/* Placeholder for content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Content Goes Here</h1>
            <p className="text-lg">This is a placeholder for your page content. Add your sections here.</p>
          </div>
        </div>
      </main>
    </>
  );
}
