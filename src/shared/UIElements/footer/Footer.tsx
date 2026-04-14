import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nav mt-auto w-full border-t border-white/5 px-16 py-8">
      <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
        <img src={logo} alt="Anidex Logo" className="h-8 opacity-80" />

        {/* Basit Linkler */}
        <div className="flex gap-6">
          <NavLink to="/" className="transition-colors hover:text-white">
            Home
          </NavLink>
          <NavLink to="/popular" className="transition-colors hover:text-white">
            Popular
          </NavLink>
          <NavLink to="/search" className="transition-colors hover:text-white">
            Search
          </NavLink>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-white/5 pt-6">
          <p className="text-xs font-medium text-gray-400">© 2024 ANIDEX</p>
          <p className="text-center text-[10px] tracking-widest text-gray-500 uppercase">
            Developed by Tanju Özer • Inspired by Crunchyroll
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
