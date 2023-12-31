import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <HeaderLayout>
      <h1>Header</h1>
      <Link to="/login">로그인</Link>
    </HeaderLayout>
  );
}

export default Header;

const HeaderLayout = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 8vh;
`;
