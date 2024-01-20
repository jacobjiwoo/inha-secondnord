import styled from "styled-components";
import { LeftArrow, PlusIcon, RightArrow } from "../assets/svg";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../assets/profile_image.jpg";
const arr = [111, 222, 333, 444, 555, 666, 777];

function CategoryGuardList() {
  const navigate = useNavigate();
  return (
    <Layout>
      <header className="header-guardList">
        <div className="prev-button" onClick={() => navigate(-1)}>
          <LeftArrow fill={"#000"} />
        </div>
      </header>
      <GuardList>
        {arr.map((item, index) => (
          <div className="guardItem-container" key={index}>
            <GuardItem>
              <div className="guard-profile">
                <div className="guard-image" />
                <div className="guard-profile-text">
                  <span className="guard-name">{item}</span>
                  <br />
                  <span className="guard-category">{item}</span>
                </div>
              </div>
              <span className="guard-introduction">{item}</span>
            </GuardItem>
            <ItemBoundary />
          </div>
        ))}
      </GuardList>
      <RegisterButton>
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

  & .header-guardList {
    border: 1px solid red;
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
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

const GuardList = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;

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
