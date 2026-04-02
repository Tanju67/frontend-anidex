import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { RiLoginBoxFill } from "react-icons/ri";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useArrangeScrollBar } from "../../hooks/useArrangeScrollBar";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Mystery",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Sports",
  "Slice of Life",
  "Supernatural",
];

function BigScreen() {
  const [isOpen, setIsOpen] = useState(false);
  useArrangeScrollBar(isOpen);
  return (
    <ul className="hidden h-full justify-between px-16 sm:flex">
      <div className="flex">
        <div className="content-center-x h-full p-2">
          <NavLink to="/">
            <p className="text-main-btn font-bold">Anidex</p>
          </NavLink>
        </div>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/new">New</NavLink>
        </li>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/popular">Popular</NavLink>
        </li>
        <li
          className={
            "content-center-x transtion-colors relative h-full p-2 duration-300 hover:bg-white/10 " +
            (isOpen ? "bg-slate-900" : "")
          }
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="content-center-x gap-1"
          >
            <span>Categories</span>
            <span>
              <FaCaretDown />
            </span>
          </button>
        </li>
      </div>
      <div className="flex">
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/search">
            <button className="content-center-x gap-1">
              <span>
                <FaSearch />
              </span>
              <span className="hidden md:block">Search</span>
            </button>
          </NavLink>
        </li>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/watchlist">
            <button className="content-center-x gap-1">
              <span>
                <BsBookmarkPlusFill />
              </span>
              <span className="hidden md:block">Watchlist</span>
            </button>
          </NavLink>
        </li>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/login">
            <button className="content-center-x gap-1">
              <span>
                <RiLoginBoxFill />
              </span>
              <span className="">Login</span>
            </button>
          </NavLink>
        </li>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed top-(--nav-height) left-0 h-screen w-full bg-slate-900/50"
            ></div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-(--nav-height) left-63.5 w-[50vw] bg-slate-900 p-4 lg:w-[30vw]"
            >
              <h3 className="border-b border-b-slate-600 px-2 font-bold">
                Genres:
              </h3>
              <ul className="grid grid-cols-3">
                {genres.map((genre) => (
                  <li
                    className="w-full px-2 py-4 hover:bg-slate-800"
                    key={genre}
                  >
                    <NavLink
                      to={`/genre/${genre.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {genre}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ul>
  );
}

export default BigScreen;
