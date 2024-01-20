import styled from "styled-components";
import { LeftArrow } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "카메라",
  },
  {
    id: 2,
    name: "노트북",
  },
  {
    id: 3,
    name: "휴대폰",
  },
];

const HomeCategoryList = () => {
  const navigate = useNavigate();
  return (
    <CategoryLayout>
      <h2 className="category-title">{"카테고리별 질문하기"}</h2>
      <CategoryList>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoryLayout>
  );
};

const CategoryLayout = styled.div`
  border: 1px solid red;
  width: 100%;
  margin-top: 20rem;

  & .layout-item {
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20rem;
`;
const CategoryItem = styled.div`
  width: 100%;
  border: 1px solid blue;
  height: 6rem;
`;

function Home() {
  return (
    <Layout>
      <header className="header-home">
        <div className="prev-button">
          <LeftArrow fill={"#000"} />
        </div>
      </header>
      <HomeCategoryList />
    </Layout>
  );
}

export default Home;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & .header-home {
    border: 1px solid red;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;

    & .prev-button {
      cursor: pointer;
    }

    & svg {
      width: 1rem;
      height: 1.5rem;
    }
  }
`;
