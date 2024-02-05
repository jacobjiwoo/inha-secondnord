import styled from "styled-components";
import ProfileImage from "../../assets/profile_image.jpg";
function MyProfile() {
  return (
    <Layout>
      <MyProfileContainer>
        <div className="my-box">
          <div className="my-image" />
          <span className="my-name">{"MyProfile"}</span>
        </div>
        <span className="my-introduction">{"My Introduction"}</span>
        <div className="my-category__list">
          {["category1", "category2", "category3"].map((category, index) => (
            <span className="my-category__item" key={index}>
              {`#${category}`}
            </span>
          ))}
        </div>
      </MyProfileContainer>
    </Layout>
  );
}

export default MyProfile;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 21rem;
  margin-top: 5rem;

  & .my-box {
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
    width: 100%;
    margin-bottom: 1rem;
    word-wrap: break-word;
  }

  & .my-category__list {
    display: flex;
    align-items: center;
    width: 100%;

    & .my-category__item {
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
