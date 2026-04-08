import { MdOutlineMenuOpen } from "react-icons/md";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiLoginBoxFill } from "react-icons/ri";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuSmallScreen from "./MenuSmallScreen";

function SmallScreen() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex h-full w-full items-center px-4 md:hidden">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MdOutlineMenuOpen className="text-3xl" />
          </button>
          <div className="content-center-x h-full p-2">
            <NavLink to="/">
              <img src={logo} alt="logo" className="h-8" />
            </NavLink>
          </div>
        </div>
        <div className="flex">
          <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
            <NavLink to="/search">
              <button className="content-center-x gap-1">
                <span>
                  <FaSearch />
                </span>
              </button>
            </NavLink>
          </li>
          <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
            <NavLink to="/watchlist">
              <button className="content-center-x gap-1">
                <span>
                  <BsBookmarkPlusFill />
                </span>
              </button>
            </NavLink>
          </li>
          <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
            <NavLink to="/login">
              <button className="content-center-x gap-1">
                <span>
                  <RiLoginBoxFill />
                </span>
              </button>
            </NavLink>
          </li>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 left-0 z-50 h-screen overflow-scroll bg-black"
          >
            <MenuSmallScreen handleNavmenu={setIsOpen} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-4 right-10 text-4xl transition-all duration-100 hover:scale-120 hover:rotate-180"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default SmallScreen;
