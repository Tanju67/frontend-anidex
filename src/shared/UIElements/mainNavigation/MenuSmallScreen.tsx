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
    <>
      <div
        style={{ backgroundImage: `url(${navBg})` }}
        className="relative flex min-h-screen w-full flex-col bg-cover bg-fixed bg-center bg-no-repeat px-4 py-10"
      >
        <div className="fixed inset-0 bg-linear-to-r from-black/90 via-black/90 to-black/50" />
        <div className="z-20 h-full p-2">
          <NavLink to="/">
            <img src={logo} alt="logo" className="h-12" />
          </NavLink>
        </div>
        <ul className="z-20 flex w-full flex-col">
          <li className="w-full p-4 transition-all duration-300 hover:bg-white/10">
            <NavLink onClick={() => handleNavmenu(false)} to="/new">
              New
            </NavLink>
          </li>
          <li className="w-full p-4 transition-all duration-300 hover:bg-white/10">
            <NavLink onClick={() => handleNavmenu(false)} to="/this-season">
              This Season
            </NavLink>
          </li>
          <li className="w-full p-4 transition-all duration-300 hover:bg-white/10">
            <NavLink onClick={() => handleNavmenu(false)} to="/popular">
              Popular
            </NavLink>
          </li>
          <li className="w-full p-4 transition-all duration-300 hover:bg-white/10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="content-center-x gap-1"
            >
              <span>Categories</span>
              <span>{isOpen ? <FaCaretUp /> : <FaCaretDown />}</span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className=""
                  >
                    <ul
                      className={`grid grid-cols-3 ${isOpen ? "bg-white/10" : ""}`}
                    >
                      {genres.map((genre) => (
                        <li
                          className={"hover:bg-main-btn/50 w-full px-2 py-2"}
                          key={genre.id}
                        >
                          <NavLink
                            to={`/genre/${genre.id}`}
                            onClick={() => handleNavmenu(false)}
                          >
                            {genre.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuSmallScreen;
