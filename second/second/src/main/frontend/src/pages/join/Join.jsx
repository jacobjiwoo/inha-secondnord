import React, { Suspense, useEffect, useState } from "react";
import { useFunnel } from "../../useFunnel";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import EmailStep from "./steps/EmailStep";
import SubmitStep from "./steps/SubmitStep";
import { DevTool } from "@hookform/devtools";
import styled from "styled-components";
import { LeftArrow } from "../../assets/svg";
import RestStep from "./steps/RestStep";
import { useMatch, useNavigate } from "react-router-dom";

const steps = ["email", "rest", "submit"];

function Join() {
  const navigate = useNavigate();
  const { Funnel, Step, onNext, onPrev, progress } = useFunnel({
    steps: steps,
    defaultStep: steps[0],
  });
  return (
    <JoinLayout>
      {steps[progress] === "submit" ? null : (
        <>
          <header className="header">
            <div className="prev-button" onClick={() => navigate(-1)}>
              <LeftArrow fill={"black"} />
              <span className="prev-text">회원가입</span>
            </div>
          </header>
          <span className="progress">{`${progress + 1}/${
            steps.length - 1
          }`}</span>
        </>
      )}
      <Funnel>
        <Step name={steps[0]}>
          <EmailStep onNext={onNext} />
        </Step>
        <Step name={steps[1]}>
          <RestStep onNext={onNext} />
        </Step>
        <Step name="submit">
          <Suspense fallback={<h3>로딩중...</h3>}>
            <SubmitStep />
          </Suspense>
        </Step>
      </Funnel>
    </JoinLayout>
  );
}

export default Join;

const JoinLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100svh;

  & .header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;

    & .prev-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.3rem;
      cursor: pointer;

      & .prev-text {
        line-height: 1.5rem;
      }

      & svg {
        width: 1rem;
        height: 1.5rem;
      }
    }
  }

  & .progress {
    margin-top: 4.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: black;
  }
`;
