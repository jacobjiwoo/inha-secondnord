import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderHome from "../../components/header/HeaderHome";
import { UserIcon } from "../../assets/svg";

function Categories() {
  return (
    <Layout>
      <span className="category-title">{"# 카테고리별\n질문하기"}</span>
      <div className="boundary" />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList />
      </Suspense>
    </Layout>
  );
}

const CategoryList = () => {
  const navigate = useNavigate();
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
  return (
    <CategoryListContainer>
      <div className="category-list">
        {categories?.map((category) => (
          <div
            className="category-item"
            key={category.category_id}
            onClick={() =>
              navigate(`/categories/${category.category_id}`, {
                state: category.name,
              })
            }
          >
            <span className="category-item__name">{`${category.name}`}</span>
            <div className="category-item__countbox">
              <UserIcon />
              <span className="category-item__count">15</span>
            </div>
          </div>
        ))}
      </div>
    </CategoryListContainer>
  );
};
export default Categories;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & .category-title {
    width: 80%;
    margin-top: 8rem;
    font-size: 2rem;
    font-weight: 800;
    text-align: left;
    white-space: pre-line;
  }

  & .boundary {
    width: 85%;
    margin-top: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #d9d9d9;
  }
`;

const CategoryListContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & .category-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  & .category-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 4rem;
    margin-bottom: 1rem;
    border: 1px solid #9852f9;
    border-radius: 1rem;
    cursor: pointer;

    & .category-item__name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #000;
    }

    & .category-item__countbox {
      display: flex;
      align-items: center;

      & svg {
        width: 1.5rem;
      }

      & .category-item__count {
        font-size: 1.2rem;
        color: #000;
      }
    }
  }
`;
