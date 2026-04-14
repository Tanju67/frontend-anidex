import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaCaretDown, FaCaretUp, FaSearch } from "react-icons/fa";
import { RiLoginBoxFill, RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { backendApi, useGetCurrentUserQuery } from "../../api/backendApi";
import { useArrangeScrollBar } from "../../hooks/useArrangeScrollBar";
import { genres } from "../../utils/data";

function BigScreen() {
  const [isOpen, setIsOpen] = useState(false);
  useArrangeScrollBar(isOpen);
  const { data: user } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(backendApi.util.resetApiState());
    navigate("/login");
  };
  return (
    <ul className="hidden h-full justify-between px-2 md:flex lg:px-16">
      <div className="flex">
        <div className="content-center-x h-full p-2">
          <NavLink to="/">
            <img src={logo} alt="logo" className="h-12" />
          </NavLink>
        </div>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/new">New</NavLink>
        </li>
        <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
          <NavLink to="/this-season">This Season</NavLink>
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
            <span>{isOpen ? <FaCaretUp /> : <FaCaretDown />}</span>
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
          <NavLink to={user ? "/watchlist" : "/login"}>
            <button className="content-center-x gap-1">
              <span>
                <BsBookmarkPlusFill />
              </span>
              <span className="hidden md:block">Watchlist</span>
            </button>
          </NavLink>
        </li>
        {user ? (
          <>
            <li className="content-center-x transtion-colors text-main-btn h-full p-2 duration-300 hover:bg-red-500/20">
              <button onClick={handleLogout} className="content-center-x gap-1">
                <RiLogoutBoxRFill className="size-5" />
                <span className="">Logout</span>
              </button>
            </li>
          </>
        ) : (
          <li className="content-center-x transtion-colors h-full p-2 duration-300 hover:bg-white/10">
            <NavLink to="/login">
              <button className="content-center-x gap-1">
                <RiLoginBoxFill className="size-5" />
                <span className="">Login</span>
              </button>
            </NavLink>
          </li>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="bg-nav/50 fixed top-(--nav-height) left-0 h-screen w-full backdrop-blur-3xl!"
            ></div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-nav absolute top-(--nav-height) left-63.5 z-50 w-[50vw] p-4 lg:w-[30vw]"
            >
              <h3 className="border-b border-b-slate-600 px-2 font-bold">
                Genres:
              </h3>
              <ul className="grid grid-cols-3">
                {genres.map((genre) => (
                  <li className="hover:bg-bg w-full px-2 py-4" key={genre.id}>
                    <NavLink
                      to={`/genre/${genre.id}`}
                      onClick={() => setIsOpen(false)}
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
    </ul>
  );
}

export default BigScreen;
