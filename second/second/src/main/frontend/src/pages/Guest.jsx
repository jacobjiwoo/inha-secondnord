import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Guest() {
  const navigate = useNavigate();
  return (
    <GuestLayout>
      <h1 className="title">{"안녕하세요\n쉬운 IT입문\n세컨노드입니다!"}</h1>
      <div className="button-container">
        <Button type="button" onClick={() => navigate("/login")}>
          로그인
        </Button>
        <Button type="button" onClick={() => navigate("/join")}>
          회원가입
        </Button>
        <Link to="#">로그인/회원가입 문의하기</Link>
      </div>
    </GuestLayout>
  );
}

export default Guest;

const GuestLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100svh;
  background-color: #9852f9;
  color: #fff;

  & .title {
    width: 21rem;
    margin-top: 10rem;
    font-weight: 800;
    font-size: 2rem;
    white-space: pre-line;
  }

  & .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    & a {
      font-size: 0.7rem;
      color: #d9d9d9;
    }
  }
`;

const Button = styled.button`
  width: 21rem;
  height: 3rem;
  border: none;
  border-radius: 4rem;
  background-color: #fff;
  margin-bottom: 1rem;
  color: #000;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
