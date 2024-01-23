import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingInput({ onNext }) {
  const { register, handleSubmit, getValues, setValue } = useFormContext();

  const handleSkipClick = () => {
    setValue("open_url", "");
    onNext();
  };

  return (
    <Container>
      <h1 className="onboarding-query">
        {
          "정보 제공을 위해\n핑거프린세스들과 연락 할\n오픈채팅 링크를\n등록 해 주세요"
        }
      </h1>
      <form onSubmit={handleSubmit(() => onNext())}>
        <Input
          type="text"
          placeholder="카카오톡 오픈채팅 링크"
          {...register("open_url")}
        />
        <div className="button-container">
          <NextButton type="submit">다음</NextButton>
          <SkipButton type="button" onClick={handleSkipClick}>
            건너뛰기
          </SkipButton>
        </div>
      </form>
    </Container>
  );
}

export default OnboardingInput;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .onboarding-query {
    width: 21rem;
    margin-bottom: 2rem;
    color: #f1f1f1;
    font-size: 1.7rem;
    line-height: 2rem;
    white-space: pre-line;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .button-container {
    position: absolute;
    bottom: 3rem;
  }
`;

const Input = styled.input`
  width: 20rem;
  height: 3rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  color: #fff;
  background-color: rgba(217, 217, 217, 0.15);

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus {
    outline: none;
    border: 1px solid #fff;
    color: #fff;
  }
`;

const Button = styled.button`
  width: 21rem;
  height: 3rem;
  border: none;
  border-radius: 4.5rem;
  cursor: pointer;
`;

const NextButton = styled(Button)`
  margin-bottom: 1rem;
  background-color: #fff;
`;

const SkipButton = styled(Button)`
  border: 2px solid #fff;
  color: #fff;
  background-color: transparent;
`;
