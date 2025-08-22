import { useState } from "react";
import { Menu, X } from "lucide-react";



const Header = () => {

  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#064232] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-7">
        {/* Logo + Website Name */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-indigo-600 font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-md">
            LG
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            SnapLanding <span className="text-yellow-300">AI</span>
          </h1>
        </div>

        <p className="hidden md:block text-sm text-white/90 font-medium italic">
          Generate landing pages instantly with API-powered magic ✨
        </p>
      </div>
    </header>
  );
};


export default Header;
