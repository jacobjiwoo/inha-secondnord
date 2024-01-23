import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../../../useFunnel";
import { guard_queries } from "../OnboardingQuery";
import { Suspense, useState } from "react";
import OnboardingSubmit from "../steps/OnboardingSubmit";
import styled from "styled-components";
import { LeftArrow } from "../../../assets/svg";
import OnboardingCheckbox from "../steps/OnboardingCheckbox";
import OnboardingSelect from "../steps/OnboardingSelect";
import OnboardingText from "../steps/OnboardingText";
import OnboardingInput from "../steps/OnboardingInput";
import { useNavigate } from "react-router-dom";

const steps = ["category", "job", "introduction", "open_url", "submit"];
const defaultValues = {
  category: [],
  job: null,
  introduction: "",
  open_url: "",
};

function OnboardingGuard() {
  const methods = useForm({ defaultValues });
  const navigate = useNavigate();
  const { Funnel, Step, onNext, onPrev, progress } = useFunnel({
    steps: steps,
    defaultStep: steps[0],
  });

  return (
    <Layout>
      {steps[progress] === "submit" ? null : (
        <>
          <header className="header-onboarding">
            <div className="prev-button" onClick={() => navigate(-1)}>
              <LeftArrow fill={"#f1f1f1"} />
            </div>
          </header>
          <span className="progress">{`${progress + 1}/${
            steps.length - 1
          }`}</span>
        </>
      )}
      <FormProvider {...methods}>
        <Funnel>
          <Step name={steps[0]}>
            <OnboardingCheckbox onNext={onNext} query={guard_queries[0]} />
          </Step>
          <Step name={steps[1]}>
            <OnboardingSelect onNext={onNext} query={guard_queries[1]} />
          </Step>
          <Step name={steps[2]}>
            <OnboardingText onNext={onNext} />
          </Step>
          <Step name={steps[3]}>
            <OnboardingInput onNext={onNext} />
          </Step>
          <Step name={"submit"}>
            <Suspense fallback={<h3>로딩중...</h3>}>
              <OnboardingSubmit type={"guard"} />
            </Suspense>
          </Step>
        </Funnel>
      </FormProvider>
    </Layout>
  );
}

export default OnboardingGuard;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #9852f9;

  & .header-onboarding {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    background-color: #9852f9;

    & .prev-button {
      cursor: pointer;
    }

    & svg {
      width: 1rem;
      height: 1.5rem;
    }
  }

  & .progress {
    margin-top: 4rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #f1f1f1;
  }
`;
