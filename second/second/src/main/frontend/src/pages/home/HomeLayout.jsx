import styled from "styled-components";
import {
  CategoryIcon,
  HomeIcon,
  LeftArrow,
  LogoutIcon,
  UserIcon,
} from "../../assets/svg";
import { Outlet, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense, useEffect } from "react";
import ProfileImage from "../../assets/profile_image.jpg";
import { Mobile, PC, Tablet } from "../../configResponsive";
import Categories from "../category/CategoriesLayout";
import HeaderHome from "../../components/header/HeaderHome";
import { useRecoilValue } from "recoil";
import { loginState } from "../../recoil/login/atoms";

function HomeLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) navigate("/guest");
  }, []);
  return (
    <>
      <PC>
        <PCLayout>
          <nav>
            <div className="nav-logo">{"SecondNORD"}</div>
            <div className="nav-list">
              <div className="nav-item" onClick={() => navigate("/")}>
                <HomeIcon />홈
              </div>
              <div className="nav-item" onClick={() => navigate("/categories")}>
                <CategoryIcon />
                카테고리
              </div>
              <div className="nav-item" onClick={() => navigate("/profile/my")}>
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
          </nav>
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </section>
        </PCLayout>
      </PC>
      <Tablet>
        <TabletLayout>
          <nav>
            <div className="nav-logo">{"Second\nNORD"}</div>
            <div className="nav-list">
              <div className="nav-item" onClick={() => navigate("/")}>
                <HomeIcon />
              </div>
              <div className="nav-item" onClick={() => navigate("/categories")}>
                <CategoryIcon />
              </div>
              <div className="nav-item" onClick={() => navigate("/profile/my")}>
                <UserIcon />
              </div>
              <div className="nav-item" onClick={() => {}}>
                <LogoutIcon />
              </div>
            </div>
          </nav>
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </section>
        </TabletLayout>
      </Tablet>
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

const PCLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100svh;

  & nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15rem;
    height: 100%;
    padding: 1rem;
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
  }

  & section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 15rem);
    height: 100%;
  }
`;

const TabletLayout = styled.div`
  & nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5rem;
    height: 100%;
    padding: 1rem;
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
  }

  & section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 15rem);
    height: 100%;
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
