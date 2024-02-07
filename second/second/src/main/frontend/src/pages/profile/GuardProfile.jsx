import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileImage from "../../assets/profile_image.jpg";

const handleCopyClick = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("클립보드에 링크가 복사되었어요.");
  } catch (err) {
    console.log(err);
  }
};

const GuardProfileInfo = ({ guard }) => {
  return (
    <>
      <GuardProfileContainer>
        <div className="guard-box">
          <div className="guard-image" />
          <span className="guard-name">{guard.id}</span>
        </div>
        <span className="guard-introduction">{guard.introduction}</span>
        <div className="guard-category__list">
          {guard.categories.map((category) => (
            <span className="guard-category__item" key={category.category_id}>
              {`#${category.name}`}
            </span>
          ))}
        </div>
      </GuardProfileContainer>
      <URLContainer>
        <span className="url-title">{"오픈채팅 링크"}</span>
        <URLInputWrapper>
          <input
            className="url-input"
            type="text"
            value={guard.open_url}
            readOnly
          />
          <div
            className="copy-button"
            onClick={() => handleCopyClick(guard.open_url)}
          >
            copy
          </div>
        </URLInputWrapper>
        <button
          type="button"
          className="connect-button"
          onClick={() => window.open(`${guard.open_url}`)}
        >
          질문하기
        </button>
      </URLContainer>
    </>
  );
};

function GuardProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: guard } = useQuery({
    queryKey: ["guardProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/profile/guard/${params.finger_guard_id}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <Mobile>
        <header>
          <div className="header-logo" onClick={() => navigate("/")}>
            {"SecondNORD"}
          </div>
        </header>
      </Mobile>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <GuardProfileInfo guard={guard} />
        </Suspense>
      </section>
    </Layout>
  );
}

export default GuardProfile;

const Layout = styled.div`
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

  & section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const GuardProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 21rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  & .guard-box {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  & .guard-image {
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 1rem;
    background: url(${ProfileImage});
    background-size: cover;
    background-position: center;
  }

  & .guard-name {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 2rem;
  }

  & .guard-introduction {
    width: 100%;
    margin-bottom: 1rem;
    word-wrap: break-word;
  }

  & .guard-category__list {
    display: flex;
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
`;

const URLContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 21rem;

  & .url-title {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  & .connect-button {
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    background-color: #9852f9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
`;

const URLInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;

  & .url-input {
    width: 100%;
    height: 3rem;
    padding-left: 1rem;
    padding-right: 5rem;
    border: none;
    border-radius: 1rem;
    outline: 2px solid #9852f9;
    background-color: #d9d9d950;
    color: #000;
  }

  & .copy-button {
    position: absolute;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 2rem;
    text-align: center;
    color: #9852f9;
    font-weight: 600;
    cursor: pointer;
  }
`;
