import { useEffect, useState } from "react";
import { Mobile, PC, Tablet } from "./configResponsive";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/join/Join";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Onboarding from "./pages/onboarding/OnBoarding";
import Home from "./pages/Home";
import OnboardingPrincess from "./pages/onboarding/princess/OnboardingPrincess";
import OnboardingGuard from "./pages/onboarding/guard/OnboardingGuard";
import TabBar from "./components/TabBar";
import Profile from "./pages/Profile";
import HomeLayout from "./layout/HomeLayout";

function App() {
  return (
    <>
      <PC>pc</PC>
      <Tablet>tablet</Tablet>
      <Mobile>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/join" element={<Join />} />
          <Route path="/onboarding" element={<Onboarding />}>
            <Route path="princess" element={<OnboardingPrincess />} />
            <Route path="guard" element={<OnboardingGuard />} />
          </Route>
        </Routes>
      </Mobile>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </>
  );
}

export default App;
