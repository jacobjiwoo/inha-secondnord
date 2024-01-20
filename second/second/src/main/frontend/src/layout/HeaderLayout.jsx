import styled from "styled-components";

function HeaderLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default HeaderLayout;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  outline: 1px solid red;
`;
