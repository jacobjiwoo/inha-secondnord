import React from "react";
import { useMediaQuery } from "react-responsive";

// export const PC = ({ children }) => {
//   const isPc = useMediaQuery({
//     query: "(min-width:1024px)",
//   });

//   return <>{isPc && children}</>;
// };
export const PC = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  return <>{isPc && children}</>;
};
export const PCAndTablet = ({ children }) => {
  const isPCAndTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  return <>{isPCAndTablet && children}</>;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  return <>{isTablet && children}</>;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return <>{isMobile && children}</>;
};
