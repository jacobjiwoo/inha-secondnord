import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CheckedIcon } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";

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

function OnboardingRadio() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: { service_type: null },
  });

  const handleOnboardingSubmit = (data) => {
    if (data.service_type === null) return;
    navigate(`/onboarding/${data.service_type}`);
  };

  return (
    <Container>
      <h1 className="onboarding-query">{query.query}</h1>
      <form onSubmit={handleSubmit(handleOnboardingSubmit)}>
        <RadioList>
          {query.options?.map((option) => (
            <div className="radioItem-container" key={option.value}>
              <RadioItem key={option.name}>
                <input
                  id="input-item"
                  type="radio"
                  name={query.key}
                  value={option.value}
                  {...register(query.key)}
                />
                <span className="item-name">{option.description}</span>
                <div className="radio-button" htmlFor="input-item">
                  <CheckedIcon />
                </div>
              </RadioItem>
              <ItemBoundary />
            </div>
          ))}
        </RadioList>
        <Button type="submit">다음</Button>
      </form>
    </Container>
  );
}

export default OnboardingRadio;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .onboarding-query {
    width: 21rem;
    margin-top: 6rem;
    margin-bottom: 3rem;
    color: #f1f1f1;
    font-size: 1.7rem;
    white-space: pre-line;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 마지막 요소의 경계선 제거 */
  & .radioItem-container:last-child hr {
    display: none;
  }
`;

const RadioItem = styled.label`
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

  & input[type="radio"] {
    display: none;
  }

  & input[type="radio"]:checked {
    & ~ .item-name {
      color: #fff;
      font-weight: bold;
    }

    & ~ .radio-button {
      border: 2px solid #fff;
      background-color: #fff;
    }

    & ~ .radio-button svg {
      display: block;
    }
  }

  & .radio-button {
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
