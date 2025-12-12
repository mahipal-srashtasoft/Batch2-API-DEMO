import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© {new Date().getFullYear()} MyBrand. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
