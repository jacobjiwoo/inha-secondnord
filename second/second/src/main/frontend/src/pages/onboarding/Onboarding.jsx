import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CheckedIcon, LeftArrow } from "../../assets/svg";
import OnboardingCheckbox from "./steps/OnboardingCheckbox";
import { useForm } from "react-hook-form";
import OnboardingRadio from "./steps/OnboardingRadio";
import { DevTool } from "@hookform/devtools";

const query = {
  key: "service_type",
  query: "어떤 서비스를 원하시나요?",
  options: [
    { value: "princess", description: "궁금한 제품에 대해 알고 싶습니다." },
    {
      value: "guard",
      description: "다양한 제품에 대한 정보를 알려주고 싶습니다.",
    },
  ],
};

function Onboarding() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout>
      <header className="header-onboarding">
        <div className="prev-button" onClick={() => navigate(-1)}>
          <LeftArrow fill={"#f1f1f1"} />
        </div>
      </header>
      <OnboardingRadio />
    </OnboardingLayout>
  );
}

export default Onboarding;

const OnboardingLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100svh;
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

  & .onboarding-title {
    width: 21rem;
    margin-top: 8rem;
    margin-bottom: 2rem;
    color: #f1f1f1;
    font-size: 1.8rem;
    white-space: pre-line;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 마지막 요소의 경계선 제거 */
  & .checkboxItem-container:last-child hr {
    display: none;
  }
`;

const CheckboxItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 21rem;
  height: 4rem;
  cursor: pointer;

  & .item-name {
    width: 18rem;
    font-size: 1.25rem;
    color: #d9d9d9;
  }

  & input[type="checkbox"] {
    display: none;
  }

  & input[type="checkbox"]:checked {
    & ~ .item-name {
      color: #fff;
      font-weight: bold;
    }

    & ~ .checkbox-button {
      border: 2px solid #fff;
      background-color: #fff;
    }

    & ~ .checkbox-button svg {
      display: block;
    }
  }

  & .checkbox-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid red;
    border: 2px solid #d9d9d9;
    border-radius: 50%;

    & svg {
      display: none;
    }
  }
`;

const ItemBoundary = styled.hr`
  border: 1px solid #d9d9d9;
  width: 21rem;
  margin: 0.5rem 0%;
`;

const Button = styled.button`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 2.5rem;
  margin-bottom: 3rem;
  border: none;
  border-radius: 4.5rem;
  background-color: #f1f1f1;
  cursor: pointer;
`;
