import { Outlet } from "react-router-dom";
import TabBar from "../components/TabBar";
import Header from "./../components/header/Header";
import styled from "styled-components";

function HomeLayout() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <TabBar />
    </Layout>
  );
}

export default HomeLayout;

const Layout = styled.div``;
