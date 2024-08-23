// pages/Trace.tsx
import Head from 'next/head';
import DietRow from '@/components/dietRow';
import TransportRow from '@/components/transportRow';
import EnergyUsageRow from '@/components/energyUsageRow';

export default function Trace() {
  return (
    <>
      <Head>
        <title>EcoTrace - Trace</title>
      </Head>
      <main className="bg-gradient-to-b from-[#C3E798] to-[#83E70C] flex flex-col items-center p-4 min-h-screen relative">
  <div className="w-full max-w-6xl space-y-8">
    <DietRow />
    <TransportRow />
    <EnergyUsageRow />
    <div className="p-8">
    <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Calculate
      </span>
    </button>
    </div>
  </div>
</main>

    </>
  );
}
