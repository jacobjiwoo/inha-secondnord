import React, { Suspense, useEffect, useState } from "react";
import EmailStep from "./steps/EmailStep";
import SubmitStep from "./steps/SubmitStep";
import styled from "styled-components";
import { LeftArrow, PasswordEye, WarningIcon, XIcon } from "../../assets/svg";
import RestStep from "./steps/RestStep";
import { useMatch, useNavigate } from "react-router-dom";
import IdStep from "./steps/IdStep";
import PasswordStep from "./steps/PasswordStep";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useFunnel } from "../../utils/useFunnel";

const JoinExitModal = ({ setModalOpen }) => {
  const navigate = useNavigate();
  return (
    <ModalContainer>
      <ModalBox>
        <div className="x-icon" onClick={() => setModalOpen(false)}>
          <XIcon />
        </div>
        <div className="warning-icon">
          <WarningIcon />
        </div>
        <span className="modal-text">
          {"회원가입을 취소하시겠습니까?\n입력한 내용들이 모두 사라집니다"}
        </span>
        <div className="button-container">
          <button type="button" onClick={() => setModalOpen(false)}>
            회원가입 계속하기
          </button>
          <button type="button" onClick={() => navigate("/")}>
            처음 화면으로
          </button>
        </div>
      </ModalBox>
    </ModalContainer>
  );
};

const steps = ["email", "id", "password", "submit"];

const JoinFunnel = ({ Funnel, Step, onNext }) => {
  const defaultValues = {
    email: "",
    id: "",
    password: "",
    birth: "00000000",
    gender: "none",
  };
  const methods = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <FormProvider {...methods}>
      <Funnel>
        <Step name={steps[0]}>
          <EmailStep onNext={onNext} />
        </Step>
        <Step name={steps[1]}>
          <IdStep onNext={onNext} />
        </Step>
        <Step name={steps[2]}>
          <PasswordStep onNext={onNext} />
        </Step>
        <Step name={"submit"}>
          <Suspense fallback={<h3>Loading...</h3>}>
            <SubmitStep />
          </Suspense>
        </Step>
      </Funnel>
    </FormProvider>
  );
};

function Join() {
  const [modalOpen, setModalOpen] = useState(false);
  const { Funnel, Step, onNext, progress } = useFunnel({
    steps: steps,
    defaultStep: steps[0],
  });
  return (
    <>
      <JoinLayout>
        {steps[progress] === "submit" ? null : (
          <header className="header">
            <div className="prev-button" onClick={() => setModalOpen(true)}>
              <LeftArrow fill={"black"} />
              <span className="prev-text">회원가입</span>
            </div>
            <div
              className="progress-bar"
              style={{
                width: `${100 * ((progress + 1) / (steps.length - 1))}%`,
              }}
            ></div>
          </header>
        )}
        <JoinFunnel Funnel={Funnel} Step={Step} onNext={onNext} />
      </JoinLayout>
      {modalOpen && <JoinExitModal setModalOpen={setModalOpen} />}
    </>
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
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;

    & .prev-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1.5rem;
      cursor: pointer;

      & .prev-text {
        line-height: 1.5rem;
      }

      & svg {
        width: 1rem;
        height: 1.5rem;
      }
    }

    & .progress-bar {
      position: absolute;
      bottom: -0.1rem;
      height: 0.2rem;
      border-radius: 1rem;
      background-color: #9852f9;
      transition: ease-out 0.5s;
    }
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  height: 16rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);

  & .x-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    cursor: pointer;
  }

  & .warning-icon {
    width: 3.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  & .modal-text {
    margin-bottom: 1.5rem;
    color: #000;
    text-align: center;
    white-space: pre-line;
  }

  & .button-container {
    display: flex;
    flex-direction: column;
  }

  & button[type="button"] {
    width: 15rem;
    height: 2rem;
    border: none;
    border-radius: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    &:first-child {
      background-color: #9852f9;
      color: white;
    }

    &:last-child {
      color: #000;
    }
  }
`;
