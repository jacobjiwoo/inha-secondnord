import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { joinState } from "../../../recoil/join/atoms";

const handleJoinSubmit = async (data) => {
  try {
    console.log("request", data);
    const response = await axios.post("/api/join", data);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

function SubmitStep() {
  const navigate = useNavigate();
  const joinData = useRecoilValue(joinState);
  const { data } = useQuery({
    queryKey: ["joinSubmit"],
    queryFn: async () => {
      return await handleJoinSubmit(joinData);
    },
  });
  console.log("query_Data", data);
  return (
    <Layout>
      <h1 className="title">
        {
          "가입해주셔서\n감사합니다!\n맞춤 서비스 제공을 위해\n몇가지 질문에\n답 해 주실 수 있나요?"
        }
      </h1>
      <div className="button-container">
        <Button type="button" onClick={() => navigate("/onboarding")}>
          네
        </Button>
        <Button type="button" onClick={() => navigate("/home")}>
          아니요
        </Button>
      </div>
    </Layout>
  );
}

export default SubmitStep;

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #9852f9;
  color: #fff;

  & .title {
    width: 21rem;
    margin-top: 13rem;
    font-weight: 800;
    font-size: 1.8rem;
    white-space: pre-line;
  }

  & .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
  }
`;

const Button = styled.button`
  width: 21rem;
  height: 3rem;
  border: none;
  border-radius: 4rem;
  background-color: #fff;
  margin-bottom: 1rem;
  cursor: pointer;
`;
