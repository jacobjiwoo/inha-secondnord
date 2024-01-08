import { Outlet } from "react-router-dom";
import TabBar from "../components/TabBar";
import Header from "./../components/header/Header";

function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <TabBar />
    </>
  );
}

export default HomeLayout;
