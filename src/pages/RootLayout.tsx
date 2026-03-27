import { Outlet } from "react-router-dom";
import MainNavigation from "../shared/UIElements/mainNavigation/MainNavigation";

function RootLayout() {
  return (
    <div className="bg-bg text-text-main">
      <MainNavigation />
      <main className="pt-(--nav-height)">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
