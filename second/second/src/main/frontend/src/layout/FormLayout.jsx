import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import HeaderLayout from "./HeaderLayout";
import { LeftArrow } from "../assets/svg";
function FormLayout() {
  return (
    <Layout>
      <HeaderLayout>
        <LeftArrow />
      </HeaderLayout>
      <Outlet />
    </Layout>
  );
}

export default FormLayout;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;
