import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CheckedIcon } from "../../../assets/svg";
function OnboardingCheckbox({ onNext, query }) {
  const { register, handleSubmit, getValues } = useFormContext();

  return (
    <Container>
      <h1 className="onboarding-query">{query.query}</h1>
      <form onSubmit={handleSubmit(() => onNext())}>
        <CheckboxList>
          {query.options?.map((option, index) => (
            <div className="checkboxItem-container" key={index}>
              <CheckboxItem>
                <input
                  id="input-item"
                  type="checkbox"
                  name={query.key}
                  value={option.id}
                  {...register(query.key)}
                />
                <span className="item-name">{option.name}</span>
                <div className="checkbox-button" htmlFor="input-item">
                  <CheckedIcon />
                </div>
              </CheckboxItem>
              <ItemBoundary />
            </div>
          ))}
        </CheckboxList>
        <Button type="submit">다음</Button>
      </form>
    </Container>
  );
}

export default OnboardingCheckbox;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .onboarding-query {
    width: 21rem;
    margin-top: 3rem;
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
