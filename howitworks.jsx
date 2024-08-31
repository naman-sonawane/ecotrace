import Navbar from '@/components/navBar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoTrace 🌱 How it works</title>
      </Head>
      <main className="flex flex-col items-center min-h-screen bg-green-50">
        {/* Navbar */}
        <div className="fixed top-0 w-full p-4 bg-white shadow-md z-10">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="pt-24 w-full max-w-5xl mx-auto">
          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Using EcoTrace</h1>
            <p className="text-lg text-gray-700">Steps to help reduce your Carbon Footprint</p>
          </div>

          {/* Steps Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-xs mx-auto">
              <img
                src="/Step1.gif"
                alt="Step 1"
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-green-700">Step 1: Understand Your Impact</h2>
              <p className="text-gray-600 mt-2">Learn how your daily activities contribute to your carbon footprint.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-green-500 rounded-lg shadow-md p-6 text-white text-center max-w-xs mx-auto">
              <div
                className="w-full h-50 bg-center bg-cover rounded-md mb-4"
                style={{ backgroundImage: "url('/Step2.gif')" }}
              ></div>
              <h2 className="text-xl font-semibold">Step 2: Take Action</h2>
              <p className="mt-2">Make changes in your lifestyle to reduce your carbon emissions.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-xs mx-auto">
              <div  
                className="w-flex h-80 bg-center bg-cover rounded-md mb-4"
                style={{ backgroundImage: "url('/Step3.gif')" }}
              ></div>
              <h2 className="text-xl font-semibold text-green-700">Step 3: Track Your Progress</h2>
              <p className="text-gray-600 mt-2">Use EcoTrace to monitor your improvements and stay motivated.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
