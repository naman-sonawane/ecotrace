import Navbar from '@/components/navBar'
import Head from 'next/head';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import the Link component from next/link

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoTrace 🌱 Home</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-green-50">
        <div className="fixed flex justify-center items-center top-0 w-full p-4 z-10">
          <Navbar />
        </div>
        <header className="w-full max-w-5xl text-center mb-12">
          <div className="mb-6 flex items-center justify-center">
            <Image src="/logo.png" alt="EcoTrace Logo" width={50} height={100} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Meet EcoTrace</h1>
          <p className="text-xl text-semibold relative inline-block">
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">eco-friendly</span>
              <Image
                src="/underline.png"
                alt="Underline"
                width={200}
                height={20}
                className="absolute left-0 bottom-0 z-0"
              />
            </span>{" "}
            AI assistant for a sustainable future.
          </p>
          <p className="text-md my-4">Track, Reduce, and Thrive with AI-Powered Carbon Insights</p>
          {/* Updated Button */}
          <Link href="/trace">
            <a>
              <Button>
                See Your Impact
              </Button>
            </a>
          </Link>
        </header>

        <section className="w-full max-w-5xl text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Planet Needs <a className="gradient-text">Your</a> Help</h2>
          <p className="text-lg mb-8">By understanding and reducing your footprint, you can make a real difference. Join us in taking action for a sustainable future.</p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <Image src="/diet.png" alt="Track Food Footprint" width={150} height={150} className="mb-4 w-full" />
              <h3 className="text-2xl font-semibold mb-2">Track Your Food&apos;s Footprint</h3>
              <p>Track meals with EcoTrace—scan for carbon impact and get actionable advice.</p>
            </div>
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <Image src="/transport.png" alt="Estimate Travel Emissions" width={150} height={150} className="mb-4 w-full" />
              <h3 className="text-2xl font-semibold mb-2">Estimate Your Travel Emissions</h3>
              <p>Enter your travel details to see impact and receive tips for reduction.</p>
            </div>
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <Image src="/power.png" alt="Analyze Energy Use" width={150} height={150} className="mb-4 w-full" />
              <h3 className="text-2xl font-semibold mb-2">Analyze Your Energy Use</h3>
              <p>See your energy usage, impact, and receive tips to optimize.</p>
            </div>
          </div>

          {/* Add the additional text below the cards */}
          <section className="w-full max-w-5xl text-center mt-12">
            <p className="text-lg">
              <strong>The Earth is facing critical environmental challenges. 🌎</strong> <br/>
              By understanding and reducing <span className="gradient-text">your</span> footprint, you can make a real difference. Join us in taking action for a sustainable future.
            </p>
          </section>
        </section>

        <footer className="w-full max-w-5xl mt-10 text-center mb-12">
          <a href="https://github.com/naman-sonawane/ecotrace" target="_blank" rel="noopener noreferrer">
            <p className="text-sm hover:text-emerald-500 text-gray-600 mb-4">Made with ✨ by Rugved & Naman</p>
          </a>
        </footer>
      </main>
    </>
  );
}
