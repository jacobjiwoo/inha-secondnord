import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Categories from "./Categories";
import { Mobile, PC, PCAndTablet } from "../../config/configResponsive";
import HeaderPrev from "../../components/header/HeaderPrev";
import HeaderHome from "../../components/header/HeaderHome";

function CategoriesLayout() {
  const categoriesMatch = useMatch("/categories");
  return (
    <>
      <PCAndTablet>
        <PCAndTabletLayout>
          <section className="section-left">
            <Categories />
          </section>
          <section className="section-right">
            <Outlet />
          </section>
        </PCAndTabletLayout>
      </PCAndTablet>
      <Mobile>
        <MobileLayout>
          {categoriesMatch ? (
            <>
              <header>
                <div className="header-logo" onClick={() => navigate("/")}>
                  {"SecondNORD"}
                </div>
              </header>
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

const PCAndTabletLayout = styled.div`
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

  & header {
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
  }
`;
