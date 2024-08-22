import Head from 'next/head';
import { FaPen } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoTrace - Dashboard</title>
      </Head>
      <main
        className="relative flex min-h-screen flex-col w-screen h-screen overflow-hidden p-12 pb-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?cs=srgb&dl=pexels-jplenio-1423600.jpg&fm=jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Navbar Placeholder */}
        <div className="fixed top-0 left-0 w-full p-4 z-10">
          <h1 className="text-2xl font-bold text-center text-white">[Insert Navbar]</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mt-20 z-10">
          {/* Top Left Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg flex flex-col space-y-4 shadow-md">
            <h2 className="text-4xl font-bold">Welcome back.</h2>
            <p className="pl-4 text-sm text-gray-600">Track, Reduce, and Thrive with AI-Powered Carbon Insights.</p>
          </div>

          {/* Top Right Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4 relative">
            <p className="text-2xl font-bold">7231 / 6000</p>
            <p className="text-sm text-gray-600">kilograms of carbon per year</p>
            <div className="relative bg-gray-200 h-4 rounded-full">
              <div className="bg-gradient-to-b from-[#C3E798] to-[#83E70C] h-full rounded-full" style={{ width: '60%' }}></div>
              <span className="absolute left-0 pt-2 -translate-x-1/2 transform text-xs font-medium text-gray-700">7000</span>
              <span className="absolute right-0 pt-2 translate-x-1/2 transform text-xs font-medium text-gray-700">6000</span>
            </div>
            <button className="pt-4 relative flex items-center space-x-2 text-blue-600">
              <FaPen />
              <span>Edit Goal</span>
            </button>
          </div>

          {/* Bottom Left Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 pl-10 rounded-lg shadow-md flex flex-col space-y-4">
            <h2 className="text-xl text-gray-600 font-bold">Your Carbon Footprint</h2>
            <p className="text-2xl font-bold">2,345</p>
            <p className="text-lg text-gray-600">kilograms of carbon per year</p>
            <p className="text-sm text-gray-400">That’s equivalent to driving a gasoline-powered car for about 800 miles. 🚗</p>
            <p className="text-sm font-semibold">Your Carbon Footprint is <strong className="text-green-600">below average</strong>.</p>
          </div>

          {/* Bottom Right Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <p className="text-sm text-gray-600">Ask any question to learn more about reducing your carbon footprint.</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter a question"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white p-2 rounded-md">Send</button>
            </div>
            <p className="text-sm text-gray-600">AI's answer</p>
          </div>
        </div>
      </main>
    </>
  );
}
