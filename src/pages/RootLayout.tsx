import { Outlet } from "react-router-dom";
import MainNavigation from "../shared/UIElements/mainNavigation/MainNavigation";
import ScrollToTop from "../shared/utils/ScrollToTop";

function RootLayout() {
  return (
    <div className="bg-bg text-text-main">
      <MainNavigation />
      <ScrollToTop />
      <main className="pt-(--nav-height)">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
