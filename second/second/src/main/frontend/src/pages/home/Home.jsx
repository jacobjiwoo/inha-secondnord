import styled from "styled-components";
import { CategoryIcon, HomeIcon, LeftArrow, UserIcon } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import ProfileImage from "../../assets/profile_image.jpg";
import { Mobile, PC } from "../../configResponsive";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <PC>
        <PCLayout>
          <nav>
            <div className="nav-logo">{"SecondNORD"}</div>
            <div className="nav-list">
              <div className="nav-item" onClick={() => navigate("/home")}>
                <HomeIcon />홈
              </div>
              <div className="nav-item" onClick={() => {}}>
                <CategoryIcon />
                카테고리
              </div>
              <div className="nav-item" onClick={() => {}}>
                <UserIcon />
                마이
              </div>
            </div>
          </nav>
          <MyProfilePreview />
          <Suspense fallback={<span>Loading...</span>}>
            <HomeCategoryList />
          </Suspense>
        </PCLayout>
      </PC>
      <Mobile>
        <Layout>
          <header className="header-home">
            <div className="header-logo">{"SecondNORD"}</div>
          </header>
          <MyProfilePreview />
          <Suspense fallback={<span>Loading...</span>}>
            <HomeCategoryList />
          </Suspense>
        </Layout>
      </Mobile>
    </>
  );
}

export default Home;

const PCLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & nav {
    position: fixed;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 15rem;
    height: 100%;
    padding-left: 1.5rem;
    border-right: 1px solid #d9d9d9;

    & .nav-logo {
      margin-top: 2rem;
      margin-bottom: 2rem;
      margin-left: 0.5rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: #9852f9;
      cursor: pointer;
    }

    & .nav-list {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    & .nav-item {
      display: flex;
      align-items: center;
      width: 14rem;
      height: 3rem;
      margin-bottom: 1rem;
      border-radius: 0.7rem;
      font-weight: 800;
      cursor: pointer;

      &:hover {
        background-color: rgba(217, 217, 217, 0.5);
      }

      & svg {
        width: 2rem;
        margin-left: 0.5rem;
        margin-right: 1rem;
      }
    }
  }
`;

const MyProfilePreview = () => {
  // const { data: my } = useQuery({
  //   queryKey: ["myProfile"],
  //   queryFn: async () => {
  //     const response = await axios.get("/api/profile/my");
  //     console.log(response);
  //     return response;
  //   },
  // });
  return (
    <MyProfilePreviewLayout>
      <MyProfileContainer>
        <div className="myProfile-container">
          <div className="my-image" />
          <span className="my-name">{"MyProfile"}</span>
        </div>
        <span className="my-introduction">{"My Introduction"}</span>
        <div className="my-category-container">
          {["category1", "category2", "category3"].map((category, index) => (
            <span className="categoryItem" key={index}>
              {`#${category}`}
            </span>
          ))}
        </div>
      </MyProfileContainer>
    </MyProfilePreviewLayout>
  );
};

const HomeCategoryList = () => {
  const { data: categories, error } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/home");
        return response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const navigate = useNavigate();
  return (
    <CategoryLayout>
      <h2 className="category-title">{"카테고리별 질문하기"}</h2>
      <CategoryList>
        {categories?.map((category) => (
          <CategoryItem
            key={category.category_id}
            onClick={() => navigate(`/categories/${category.category_id}`)}
          >
            <span className="categoryItem-name">{`${category.name} 핑거가드 모음`}</span>
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoryLayout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & .header-home {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 2rem;
    border-bottom: 1px solid #d9d9d9;

    & .header-logo {
      font-size: 1.25rem;
      font-weight: 800;
      color: #9852f9;
      cursor: pointer;
    }
  }
`;

const MyProfilePreviewLayout = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 21rem;

  & .myProfile-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  & .my-image {
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 1rem;
    background: url(${ProfileImage});
    background-size: cover;
    background-position: center;
  }

  & .my-name {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 2rem;
  }

  & .my-introduction {
    margin-bottom: 2rem;
  }

  & .my-category-container {
    display: flex;
    align-items: center;
    width: 100%;

    & .categoryItem {
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
  }
`;
const CategoryLayout = styled.div`
  /* border: 1px solid red; */
  width: 21rem;

  & .category-title {
    margin-left: 1rem;
    font-size: 1.25rem;
    font-weight: 800;
  }
`;
const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #9852f9 0%, rgba(152, 82, 249, 0) 100%);
  cursor: pointer;

  & .categoryItem-name {
    font-weight: 600;
    color: #000;
    margin-right: 2rem;
  }
`;
