import BigScreen from "./BigScreen";
import SmallScreen from "./SmallScreen";

function MainNavigation() {
  return (
    <nav className="bg-nav/80 fixed z-50 h-(--nav-height) w-full border-b border-white/10 backdrop-blur-md">
      <BigScreen />
      <SmallScreen />
    </nav>
  );
}

export default MainNavigation;
