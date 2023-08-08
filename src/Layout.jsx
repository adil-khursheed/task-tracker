import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <>
      <div className="absolute top-16 left-1/2 max-w-xl w-full -translate-x-1/2 px-4">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
