import { Route, Routes } from "react-router-dom";
import Join from "./pages/join/Join";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import OnboardingPrincess from "./pages/onboarding/princess/OnboardingPrincess";
import OnboardingGuard from "./pages/onboarding/guard/OnboardingGuard";
import UserList from "./admin/UserList";
import AdminLogin from "./admin/AdminLogin";
import Guest from "./pages/Guest";
import GuardProfile from "./pages/profile/GuardProfile";
import Onboarding from "./pages/onboarding/Onboarding";
import CategoriesById from "./pages/categories/CategoriesById";
import MyProfile from "./pages/profile/MyProfile";
import HomeLayout from "./pages/home/HomeLayout";
import CategoriesLayout from "./pages/categories/CategoriesLayout";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        {/*관리자 페이지*/}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<UserList />} />

        <Route element={<PublicRoute />}>
          {/*게스트 화면*/}
          <Route path="/guest" element={<Guest />} />
          {/*로그인&회원가입*/}
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>

        <Route element={<PrivateRoute />}>
          {/*온보딩*/}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/princess" element={<OnboardingPrincess />} />
          <Route path="/onboarding/guard" element={<OnboardingGuard />} />
          {/*메인 레이아웃*/}
          <Route element={<HomeLayout />}>
            {/*홈 화면*/}
            <Route path="/" element={<Home />} />
            {/*카테고리*/}
            <Route path="/categories" element={<CategoriesLayout />}>
              <Route path=":category_id" element={<CategoriesById />} />
            </Route>
            <Route
              path="/profile/guard/:finger_guard_id"
              element={<GuardProfile />}
            />
            {/*프로필*/}
            <Route path="/profile/my" element={<MyProfile />} />
          </Route>
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </>
  );
}

export default App;
