import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white z-[999] shadow-md border-[1px] bg-opacity-50 backdrop-blur-lg border-green-400 rounded-full w-4/5">
      <div className="container flex justify-between items-center py-4 px-6">
        <div className="text-green-700 text-2xl font-semibold flex items-center">
          <img
            src="/logotype.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/trace" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Track Footprint
            </Link>
          </li>
          <li>
            <Link href="/howitworks" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              How it works
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;