import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingText({ onNext }) {
  const { register, handleSubmit, getValues, setValue } = useFormContext();
  const [characterCount, setCharacterCount] = useState(0);

  const handleSkipClick = () => {
    setValue("introduction", "");
    onNext();
  };

  return (
    <Container>
      <h1 className="onboarding-query">
        {"핑거프린세스들을 위해\n간단한 프로필을\n작성 해 주세요!"}
      </h1>
      <form onSubmit={handleSubmit(() => onNext())}>
        <TextAreaContainer>
          <TextArea
            type="text"
            placeholder="최소 20자 이상 작성 해 주세요 :)"
            maxLength={200}
            onChange={(e) => setCharacterCount(e.target.value.length)}
            {...register("introduction")}
          />
          <span className="character-count">{`${characterCount}/200`}</span>
        </TextAreaContainer>
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

export default OnboardingText;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .onboarding-query {
    width: 21rem;
    margin-bottom: 2rem;
    color: #f1f1f1;
    font-size: 1.8rem;
    line-height: 2.5rem;
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

const TextAreaContainer = styled.label`
  display: flex;
  justify-content: center;
  position: relative;
  width: 21rem;
  height: 15rem;
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  background-color: rgba(217, 217, 217, 0.15);

  & .character-count {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: #d9d9d9;
  }
`;

const TextArea = styled.textarea`
  width: 19rem;
  height: 11rem;
  margin-top: 1rem;
  border: none;
  color: #fff;
  background-color: transparent;

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff;
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
