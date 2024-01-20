import { Mobile, PC, Tablet } from "./configResponsive";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/join/Join";
import Login from "./pages/Login";
import Onboarding from "./pages/onboarding/OnBoarding";
import Home from "./pages/home/Home";
import OnboardingPrincess from "./pages/onboarding/princess/OnboardingPrincess";
import OnboardingGuard from "./pages/onboarding/guard/OnboardingGuard";
import Profile from "./pages/Profile";
import UserList from "./admin/UserList";
import AdminLogin from "./admin/AdminLogin";
import Guest from "./pages/Guest";
import CategoryGuardList from "./pages/CategoryGuardList";

function App() {
  return (
    <>
      <PC>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/users" element={<UserList />} />
        </Routes>
      </PC>
      <Tablet>tablet</Tablet>
      <Mobile>
        <Routes>
          {/*게스트 화면*/}
          <Route path="/" element={<Guest />} />
          {/*홈 화면*/}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/*로그인&회원가입*/}
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          {/*온보딩*/}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/princess" element={<OnboardingPrincess />} />
          <Route path="/onboarding/guard" element={<OnboardingGuard />} />
          {/*가드 리스트*/}
          <Route
            path="/categories/:category_id"
            element={<CategoryGuardList />}
          />
        </Routes>
      </Mobile>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </>
  );
}

export default App;
