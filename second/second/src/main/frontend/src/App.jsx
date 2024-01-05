import { useEffect, useState } from "react";
import { Mobile, PC, Tablet } from "./configResponsive";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/join/Join";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import Onboarding from "./pages/onboarding/OnBoarding";
import Header from "./components/Header";
import Home from "./pages/Home";
import OnboardingPrincess from "./pages/onboarding/princess/OnboardingPrincess";
import OnboardingGuard from "./pages/onboarding/guard/OnboardingGuard";
import TabBar from "./components/TabBar";

function App() {
  return (
    <>
      <PC>pc</PC>
      <Tablet>tablet</Tablet>
      <Mobile>
        <Routes>
          <Route element={<TabBar />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
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
