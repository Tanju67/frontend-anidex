import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiLoginBoxFill, RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { backendApi, useGetCurrentUserQuery } from "../../api/backendApi";
import MenuSmallScreen from "./MenuSmallScreen";

function SmallScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(backendApi.util.resetApiState());
    navigate("/login");
  };
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
            <NavLink to={user ? "/watchlist" : "/login"}>
              <button className="content-center-x gap-1">
                <span>
                  <BsBookmarkPlusFill />
                </span>
              </button>
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="content-center-x transtion-colors text-main-btn h-full p-2 duration-300 hover:bg-red-500/20">
                <button
                  onClick={handleLogout}
                  className="content-center-x gap-1"
                >
                  <RiLogoutBoxRFill className="size-5" />
                  <span className="">Logout </span>
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
