import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const handleOnboardingGuardSubmit = async (data) => {
  //parse to json
  const categoryArr = [];
  data.category.forEach((id) => categoryArr.push({ id }));
  data.category = categoryArr;

  //data fetch
  const response = await axios.post("/api/onboarding/guard", data);
  return response;
};

const handleOnboardingPrincessSubmit = async (data) => {
  //parse to json
  const brandArr = [];
  const categoryArr = [];
  data.brand.forEach((id) => brandArr.push({ id }));
  data.category.forEach((id) => categoryArr.push({ id }));
  data.brand = brandArr;
  data.category = categoryArr;

  //data fetch
  const response = await axios.post("/api/onboarding/princess", data);
  return response;
};

function OnboardingSubmit({ type }) {
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const { data } = useQuery({
    queryKey: ["onbardingSubmit"],
    queryFn: async () => {
      if (type === "princess")
        return await handleOnboardingPrincessSubmit(getValues());
      if (type === "guard")
        return await handleOnboardingGuardSubmit(getValues());
    },
  });
  return (
    <Layout>
      <h1 className="title">
        {type === "princess"
          ? "감사합니다!\n궁금한 모든 정보를\n세컨노드의 핑거가드에게\n질문 해 보세요!"
          : "감사합니다!\n핑거프린세스에게\n궁금한 모든 정보를\n알려주러 가 볼까요?"}
      </h1>
      <div className="button-container">
        <Button type="button" onClick={() => navigate("/")}>
          시작하기
        </Button>
      </div>
    </Layout>
  );
}

export default OnboardingSubmit;

const Layout = styled.div`
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
    margin-top: 13rem;
    font-weight: 800;
    font-size: 1.8rem;
    line-height: 2.5rem;
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
