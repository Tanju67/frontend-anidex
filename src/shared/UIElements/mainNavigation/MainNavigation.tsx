import BigScreen from "./BigScreen";
import SmallScreen from "./SmallScreen";

function MainNavigation() {
  return (
    <nav className="fixed z-50 h-(--nav-height) w-full bg-slate-800 text-white">
      <BigScreen />
      <SmallScreen />
    </nav>
  );
}

export default MainNavigation;
