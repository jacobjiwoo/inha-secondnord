import styled from "styled-components";
import {
  CategoryIcon,
  HomeIcon,
  LeftArrow,
  LogoutIcon,
  UserIcon,
} from "../../assets/svg";
import { Outlet, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Mobile, PC, PCAndTablet, Tablet } from "../../configResponsive";
import { getCookie } from "../../utils/Cookie";

function HomeLayout() {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const categoriesMatch = useMatch("/categories");
  const myMatch = useMatch("/profile/my");
  return (
    <>
      <PCAndTablet>
        <PCAndTabletLayout>
          <PC>
            <PCNav>
              <div className="nav-logo">{"SecondNORD"}</div>
              <div className="nav-list">
                <div
                  className="nav-item"
                  onClick={() => navigate("/")}
                  style={{ outline: homeMatch ? "1px solid #d9d9d9" : "none" }}
                >
                  <HomeIcon />홈
                </div>
                <div
                  className="nav-item"
                  onClick={() => navigate("/categories")}
                  style={{
                    outline: categoriesMatch ? "1px solid #d9d9d9" : "none",
                  }}
                >
                  <CategoryIcon />
                  카테고리
                </div>
                <div
                  className="nav-item"
                  onClick={() => navigate("/profile/my")}
                  style={{ outline: myMatch ? "1px solid #d9d9d9" : "none" }}
                >
                  <UserIcon />
                  마이
                </div>
                <div
                  className="nav-item"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/guest");
                  }}
                >
                  <LogoutIcon />
                  로그아웃
                </div>
              </div>
            </PCNav>
          </PC>
          <Tablet>
            <TabletNav>
              <div className="nav-logo">{"Second\nNORD"}</div>
              <div className="nav-list">
                <div
                  className="nav-item"
                  onClick={() => navigate("/")}
                  style={{ outline: homeMatch ? "1px solid #d9d9d9" : "none" }}
                >
                  <HomeIcon />
                </div>
                <div
                  className="nav-item"
                  onClick={() => navigate("/categories")}
                  style={{
                    outline: categoriesMatch ? "1px solid #d9d9d9" : "none",
                  }}
                >
                  <CategoryIcon />
                </div>
                <div
                  className="nav-item"
                  onClick={() => navigate("/profile/my")}
                  style={{ outline: myMatch ? "1px solid #d9d9d9" : "none" }}
                >
                  <UserIcon />
                </div>
                <div className="nav-item" onClick={() => {}}>
                  <LogoutIcon />
                </div>
              </div>
            </TabletNav>
          </Tablet>
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </section>
        </PCAndTabletLayout>
      </PCAndTablet>
      <Mobile>
        <MobileLayout>
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </section>
          <TabBar>
            <div className="tabbar-list">
              <div className="tabbar-item" onClick={() => navigate("/")}>
                <HomeIcon />
              </div>
              <div
                className="tabbar-item"
                onClick={() => navigate("/categories")}
              >
                <CategoryIcon />
              </div>
              <div
                className="tabbar-item"
                onClick={() => navigate("/profile/my")}
              >
                <UserIcon />
              </div>
            </div>
          </TabBar>
        </MobileLayout>
      </Mobile>
    </>
  );
}

export default HomeLayout;

const PCAndTabletLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr;
  width: 100vw;
  height: 100svh;

  & section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PCNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  border-right: 1px solid #d9d9d9;

  & .nav-logo {
    width: 14rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-left: 1rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: #9852f9;
    cursor: pointer;
  }

  & .nav-list {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  & .nav-item {
    display: flex;
    align-items: center;
    width: 14rem;
    height: 3rem;
    margin-bottom: 1rem;
    border-radius: 0.7rem;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      background-color: rgba(217, 217, 217, 0.5);
    }

    & svg {
      width: 2rem;
      margin-left: 0.5rem;
      margin-right: 1rem;
    }
  }
`;

const TabletNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  border-right: 1px solid #d9d9d9;

  & .nav-logo {
    margin-top: 3rem;
    margin-bottom: 3rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: #9852f9;
    white-space: pre-line;
    cursor: pointer;
  }

  & .nav-list {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  & .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 1rem;
    border-radius: 0.7rem;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      background-color: rgba(217, 217, 217, 0.5);
    }

    & svg {
      width: 2rem;
    }
  }
`;

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & section {
    width: 100%;
    height: calc(100% - 4rem);
  }
`;

const TabBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  border-top: 1px solid #d9d9d9;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 -1px 10px px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  & .tabbar-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  & .tabbar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
      background-color: rgba(217, 217, 217, 0.5);
    }

    & svg {
      width: 2rem;
    }
  }
`;
