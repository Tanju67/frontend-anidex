import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../shared/UIElements/footer/Footer";
import GlobalLoadingScreen from "../shared/UIElements/globalLoadingScreen/GlobalLoadingScreen";
import MainNavigation from "../shared/UIElements/mainNavigation/MainNavigation";
import ScrollToTop from "../shared/utils/ScrollToTop";
import ScrollToTopButton from "../shared/utils/ScrollToTopButton";

/**
 * RootLayout Component
 * Serves as the main shell for the application.
 * It includes persistent UI elements like Navigation, Footer, and Global Utilities.
 */
function RootLayout() {
  return (
    <div className="bg-bg text-text-main">
      {/* Handles window scrolling logic on route changes */}
      <ScrollToTop />

      {/* Persistent Top Navigation Bar */}
      <MainNavigation />

      <main className="pt-(--nav-height)">
        {/* Suspense handles the loading state for lazy-loaded pages.
          While the JS chunk for a specific route is being fetched, 
          the GlobalLoadingScreen will be displayed.
        */}
        <Suspense fallback={<GlobalLoadingScreen />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Back to top utility button */}
      <ScrollToTopButton />

      {/* Centralized Toast notifications. 
        Placing it here ensures notifications can be triggered from anywhere 
        without re-mounting the container.
      */}
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default RootLayout;
