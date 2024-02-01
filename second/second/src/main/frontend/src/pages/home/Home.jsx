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
import { Suspense } from "react";
import ProfileImage from "../../assets/profile_image.jpg";
import { Mobile, PC, PCAndTablet } from "../../configResponsive";
import Categories from "../category/CategoriesLayout";
import HeaderHome from "../../components/header/HeaderHome";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <PCAndTablet>
        <PCLayout>
          <h1>당신을 위한 세컨노드</h1>
        </PCLayout>
      </PCAndTablet>
      <Mobile>
        <MobileLayout>
          <HeaderHome />
          <h1>당신을 위한 세컨노드</h1>
        </MobileLayout>
      </Mobile>
    </>
  );
}

export default Home;

const PCLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100svh;
`;

const MobileLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
