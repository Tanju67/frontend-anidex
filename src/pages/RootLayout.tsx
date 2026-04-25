import { Outlet } from "react-router-dom";
import MainNavigation from "../shared/UIElements/mainNavigation/MainNavigation";
import ScrollToTop from "../shared/utils/ScrollToTop";
import Footer from "../shared/UIElements/footer/Footer";
import ScrollToTopButton from "../shared/utils/ScrollToTopButton";
import { Suspense } from "react";
import GlobalLoadingScreen from "../shared/UIElements/globalLoadingScreen/GlobalLoadingScreen";

function RootLayout() {
  return (
    <div className="bg-bg text-text-main">
      <MainNavigation />
      <ScrollToTop />
      <main className="pt-(--nav-height)">
        <Suspense fallback={<GlobalLoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default RootLayout;
