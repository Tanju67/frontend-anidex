import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { genres } from "../../utils/data";
import navBg from "../../../assets/navBg.jpg";

type Props = {
  handleNavmenu: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuSmallScreen({ handleNavmenu }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ backgroundImage: `url(${navBg})` }}
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat px-6 py-12"
    >
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black via-black/80 to-transparent" />

      {/* İçerik: z-10 vererek karartmanın üzerine çıkarıyoruz */}
      <div className="relative z-10 flex flex-col gap-8">
        <div>
          <NavLink to="/" onClick={() => handleNavmenu(false)}>
            <img src={logo} alt="logo" className="h-12" />
          </NavLink>
        </div>

        <ul className="flex w-full flex-col text-xl">
          <li className="border-b border-white/5 py-4">
            <NavLink onClick={() => handleNavmenu(false)} to="/new">
              New
            </NavLink>
          </li>
          <li className="border-b border-white/5 py-4">
            <NavLink onClick={() => handleNavmenu(false)} to="/this-season">
              This Season
            </NavLink>
          </li>
          <li className="border-b border-white/5 py-4">
            <NavLink onClick={() => handleNavmenu(false)} to="/popular">
              Popular
            </NavLink>
          </li>

          <li className="py-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center gap-2"
            >
              <span>Categories</span>
              {isOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-white/5 p-4 text-base">
                    {genres.map((genre) => (
                      <li key={genre.id} className="py-1">
                        <NavLink
                          to={`/genre/${genre.id}`}
                          onClick={() => handleNavmenu(false)}
                          className="hover:text-main-btn"
                        >
                          {genre.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuSmallScreen;
