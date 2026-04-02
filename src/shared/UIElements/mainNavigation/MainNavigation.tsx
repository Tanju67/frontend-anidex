import BigScreen from "./BigScreen";

function MainNavigation() {
  return (
    <nav className="fixed z-50 h-(--nav-height) w-full bg-slate-800 text-white">
      <BigScreen />
    </nav>
  );
}

export default MainNavigation;
