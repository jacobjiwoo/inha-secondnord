import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";
import { Mobile, PC } from "./../../configResponsive";
import HeaderPrev from "../../components/header/HeaderPrev";
import HeaderHome from "../../components/header/HeaderHome";

function CategoriesLayout() {
  const categoriesMatch = useMatch("/categories");
  return (
    <>
      <PC>
        <PCLayout>
          <section className="section-left">
            <Categories />
          </section>
          <section className="section-right">
            <Outlet />
          </section>
        </PCLayout>
      </PC>
      <Mobile>
        <MobileLayout>
          {categoriesMatch ? (
            <>
              <HeaderHome />
              <Categories />
            </>
          ) : (
            <>
              <Outlet />
            </>
          )}
        </MobileLayout>
      </Mobile>
    </>
  );
}

export default CategoriesLayout;

const PCLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  & .section-left {
    width: 50%;
    height: 100%;
    border-right: 1px solid #d9d9d9;
  }

  & .section-right {
    width: 50%;
    height: 100%;
    background-color: rgba(217, 217, 217, 0.5);
  }
`;

const MobileLayout = styled.div`
  width: 100%;
  height: 100%;
`;
