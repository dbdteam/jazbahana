import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-star bg-cover">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
