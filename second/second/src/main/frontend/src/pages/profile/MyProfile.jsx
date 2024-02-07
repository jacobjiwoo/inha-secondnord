import styled from "styled-components";
import ProfileImage from "../../assets/profile_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Mobile } from "../../config/configResponsive";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { guardIdState } from "../../recoil/profile/atoms";
import { LogoutIcon } from "../../assets/svg";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyProfile() {
  const guardId = useRecoilValue(guardIdState);
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Mobile>
          <header>
            <div className="header-logo" onClick={() => navigate("/")}>
              {"SecondNORD"}
            </div>
            <div
              className="header-logout"
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/guest");
              }}
            >
              <LogoutIcon />
            </div>
          </header>
        </Mobile>
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <MyProfileInfo />
          </Suspense>
          {guardId ? (
            <Suspense fallback={<div>Loading...</div>}>
              <GuardProfileInfo guardId={guardId} />
            </Suspense>
          ) : (
            <>
              <Link to="/onboarding/guard">핑거가드 등록하기</Link>
            </>
          )}
        </section>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default MyProfile;

const MyProfileInfo = () => {
  const [guardId, setGuardId] = useRecoilState(guardIdState);
  const { data: my } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/profile/my");
        console.log(response.data);
        setGuardId(response.data.finger_guard_id);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <MyProfileInfoContainer>
      <div className="my-image" />
      <div className="my-text">
        <span className="my-name">{my.id}</span>
        <span className="my-email">{my.email}</span>
      </div>
    </MyProfileInfoContainer>
  );
};

const GuardProfileInfo = ({ guardId }) => {
  const { data: guard } = useQuery({
    queryKey: ["myGuardProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/profile/guard/${guardId}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <GuardProfileInfoContainer>
      <span className="guard-title">가드 프로필</span>
      <div className="guard-category__list">
        {guard.categories.map((category, index) => (
          <span className="guard-category__item" key={index}>
            {`#${category.name}`}
          </span>
        ))}
      </div>
      <div className="guard-introduction">
        <span>{guard.introduction}</span>
      </div>
      <div className="guard-url">
        <span>{guard.open_url}</span>
      </div>
    </GuardProfileInfoContainer>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & header {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;

    & .header-logo {
      margin-left: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: #9852f9;
      cursor: pointer;
    }

    & .header-logout {
      position: absolute;
      right: 1rem;
      width: 1.6rem;
    }
  }

  & section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MyProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 21rem;
  margin-top: 4rem;
  margin-bottom: 7rem;

  & .my-image {
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 1rem;
    background: url(${ProfileImage});
    background-size: cover;
    background-position: center;
  }

  & .my-text {
    display: flex;
    flex-direction: column;

    & .my-name {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 2rem;
    }

    & .my-email {
      color: #a1a1a1;
    }
  }
`;

const GuardProfileInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 21rem;
  height: 14rem;

  & .guard-title {
    position: absolute;
    top: -4rem;
    left: 0;
    width: 21rem;
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid #d9d9d9;
    font-size: 1.5rem;
    font-weight: 600;
  }

  & .guard-introduction {
    display: flex;
    align-items: start;
    width: 90%;
    height: 5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgba(217, 217, 217, 0.5);
    word-wrap: break-word;
    overflow-y: scroll;
  }

  & .guard-category__list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & .guard-category__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    margin-right: 1rem;
    border: 1px solid #9852f9;
    border-radius: 1.25rem;
    padding: 0 0.6rem;
    color: #9852f9;
  }

  & .guard-url {
    display: flex;
    align-items: center;
    height: 2rem;
    width: 100%;
    border: 1px solid #9852f9;
    border-radius: 0.5rem;

    & span {
      margin-left: 1rem;
    }
  }
`;
