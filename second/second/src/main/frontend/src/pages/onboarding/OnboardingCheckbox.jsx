import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingCheckbox({ onNext, question, choice }) {
  const { register, handleSubmit } = useFormContext();
  return (
    <>
      <h2>{question}</h2>
      <form onSubmit={handleSubmit(() => onNext())}>
        {choice?.map((c, index) => (
          <CheckboxItem key={index} htmlFor={index}>
            <input
              type="checkbox"
              name="temp"
              id={index}
              value={c.name}
              {...register(question)}
            />
            {c.name}
            {c.description}
          </CheckboxItem>
        ))}
        <button type="submit">다음</button>
      </form>
    </>
  );
}

export default OnboardingCheckbox;

const CheckboxItem = styled.label`
  width: 80%;
`;
