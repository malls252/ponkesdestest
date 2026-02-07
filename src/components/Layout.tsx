import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 pb-16 md:pb-0 w-full">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;
