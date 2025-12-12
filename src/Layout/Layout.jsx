import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // used for nested routing

function Layout() {
  return (
    <>
      {/* Fixed Header */}
      <Header />

      {/* Dynamic content changes here */}
      <main className="container py-4" style={{ minHeight: "75vh" }}>
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </>
  );
}

export default Layout;
