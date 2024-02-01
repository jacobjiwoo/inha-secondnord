import styled from "styled-components";
import {
  CategoryIcon,
  LeftArrow,
  PlusIcon,
  RightArrow,
} from "../../assets/svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileImage from "../../assets/profile_image.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GuardProfile from "../profile/GuardProfile";
import { Suspense } from "react";
import HeaderPrev from "../../components/header/HeaderPrev";

function CategoriesById() {
  const navigate = useNavigate();
  const category_name = useLocation().state;
  return (
    <Layout>
      <header>
        <div className="prev-button" onClick={() => navigate("/categories")}>
          <LeftArrow fill={"black"} />
        </div>
        <span className="header-title">{category_name}</span>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <GuardList />
      </Suspense>
      <RegisterButton onClick={() => navigate("/onboarding/guard")}>
        <PlusIcon />
        <span>등록하기</span>
      </RegisterButton>
    </Layout>
  );
}

export default CategoriesById;

const GuardList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: guards } = useQuery({
    queryKey: ["guards", params.category_id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/categories/${params.category_id}`
        );
        return response.data.allMember;
      } catch (error) {
        console.log("error", error);
      }
    },
  });
  return (
    <GuardListContainer>
      {guards.map((guard) => (
        <div className="guardItem-container" key={guard.finger_guard_id}>
          <GuardItem
            onClick={() => navigate(`/profile/guard/${guard.finger_guard_id}`)}
          >
            <div className="guard-profile">
              <div className="guard-image" />
              <div className="guard-profile__text">
                <span className="guard-name">{guard.id}</span>
                <br />
                <span className="guard-category">
                  {guard.categories.map((category, index) => {
                    if (index === guard.categories.length - 1)
                      return `${category.name}`;
                    else return `${category.name}/`;
                  })}
                </span>
              </div>
            </div>
            <span className="guard-introduction">{guard.introduction}</span>
          </GuardItem>
          <ItemBoundary />
        </div>
      ))}
    </GuardListContainer>
  );
};

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 4rem;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;

    & .prev-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1.5rem;
      cursor: pointer;

      & svg {
        width: 1rem;
        height: 1.5rem;
      }
    }

    & .header-title {
      margin-left: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
  & .boundary {
    width: 95%;
    border: 1px solid #d9d9d9;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const GuardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;

  & .guardItem-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    min-width: 21rem;
  }

  /* 마지막 요소의 경계선 제거 */
  & .guardItem-container:last-child hr {
    display: none;
  }
`;

const GuardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  cursor: pointer;

  & .guard-profile {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;

    & .guard-image {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 1rem;
      background: url(${ProfileImage});
      background-size: cover;
      background-position: center;
    }

    & .guard-name {
      font-weight: 800;
    }

    & .guard-category {
      font-size: 0.8rem;
      color: #7e7e7e;
    }
  }

  & .guard-introduction {
    width: 100%;
    word-wrap: break-word;
  }
`;

const ItemBoundary = styled.hr`
  border: 1px solid #d9d9d9;
  width: 100%;
  margin: 1rem 0;
`;

const RegisterButton = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5rem;
  height: 3rem;
  border-radius: 6rem;
  background-color: #9852f9;
  color: #fff;
  cursor: pointer;

  & svg {
    width: 1.5rem;
    height: 2rem;
  }
`;
