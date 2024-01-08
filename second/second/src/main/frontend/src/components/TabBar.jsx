import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

function TabBar() {
  return (
    <TabBarLayout>
      <TabBarItem>
        <Link to="/home">홈</Link>
      </TabBarItem>
      <TabBarItem>2</TabBarItem>
      <TabBarItem>3</TabBarItem>
      <TabBarItem>4</TabBarItem>
      <TabBarItem>
        <Link to="/profile">내정보</Link>
      </TabBarItem>
    </TabBarLayout>
  );
}

export default TabBar;

const MainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const TabBarLayout = styled.div`
  background-color: #c2d1f6;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 8vh;
`;

const TabBarItem = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  height: 100%;
`;
