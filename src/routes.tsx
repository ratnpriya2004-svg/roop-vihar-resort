import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ScrollToTop from "./Components/ScrollToTop"; // <--- Import karein

// Public Pages
import Home from "./Components/Home";
import About from "./Pages/About";
import Rooms from "./Pages/Rooms";
import RoomDetail from "./Pages/RoomDetail";
import Booking from "./Pages/Booking";
import Weddings from "./Pages/Weddings";
import Events from "./Pages/Events";
import VenueDetail from "./Pages/VenueDetail";
import DiningPage from "./Pages/DiningPage";
import Gallery from "./Pages/Gallery";
import ContactPage from "./Pages/ContactPage";
import FAQ from "./Pages/FAQ";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Cancellation from "./Pages/Cancellation";
import NotFound from "./Pages/NotFound";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/AdminOverview";
import AdminRooms from "./admin/AdminRooms";
import AdminBookings from "./admin/AdminBookings";
import AdminEnquiries from "./admin/AdminEnquiries";

// Root Layout for Public Pages
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

// Protected Route Wrapper
function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex min-h-screen items-center justify-center bg-[#142522] text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    // Yahan RootLayout laga diya hai taaki ScrollToTop sab par kaam kare
    element: <RootLayout />, 
    children: [
      // PUBLIC ROUTES
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/rooms/:slug", element: <RoomDetail /> },
      { path: "/bookings", element: <Booking /> },
      { path: "/weddings", element: <Weddings /> },
      { path: "/events", element: <Events /> },
      { path: "/venues/:slug", element: <VenueDetail /> },
      { path: "/dining", element: <DiningPage /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/cancellation", element: <Cancellation /> },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
  
  // ADMIN ROUTES (Admin ke liye ScrollToTop nahi chahiye, isliye alag rakha hai)
  { path: "/admin", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "rooms", element: <AdminRooms /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "enquiries", element: <AdminEnquiries /> },
        ],
      },
    ],
  },
]);