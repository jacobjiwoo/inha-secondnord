import { useEffect, useState } from "react";
import { Mobile, PC, Tablet } from "./configResponsive";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/join/Join";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/login";

function App() {
  return (
    <>
      <PC>pc</PC>
      <Tablet>tablet</Tablet>
      <Mobile>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </Mobile>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
