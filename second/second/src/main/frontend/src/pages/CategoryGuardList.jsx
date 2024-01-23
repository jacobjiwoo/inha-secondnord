import styled from "styled-components";
import { LeftArrow, PlusIcon, RightArrow } from "../assets/svg";
import { useNavigate, useParams } from "react-router-dom";
import ProfileImage from "../assets/profile_image.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";

const GuardList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: guards } = useQuery({
    queryKey: ["guards"],
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
    <GuardListLayout>
      {guards.map((guard) => (
        <div className="guardItem-container" key={guard.finger_guard_id}>
          <GuardItem
            onClick={() => navigate(`/profile/guard/${guard.finger_guard_id}`)}
          >
            <div className="guard-profile">
              <div className="guard-image" />
              <div className="guard-profile-text">
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
    </GuardListLayout>
  );
};
function CategoryGuardList() {
  const navigate = useNavigate();
  return (
    <Layout>
      <header className="header">
        <div className="prev-button" onClick={() => navigate(-1)}>
          <LeftArrow fill={"#000"} />
        </div>
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

export default CategoryGuardList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & .header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;

    & .prev-button {
      cursor: pointer;
    }

    & svg {
      width: 1rem;
      height: 1.5rem;
    }
  }
`;

const GuardListLayout = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  /* 마지막 요소의 경계선 제거 */
  & .guardItem-container:last-child hr {
    display: none;
  }
`;

const GuardItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 21rem;

  & .guard-profile {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

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

  & .guard-introduction {
  }
`;

const ItemBoundary = styled.hr`
  border: 1px solid #d9d9d9;
  width: 21rem;
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
