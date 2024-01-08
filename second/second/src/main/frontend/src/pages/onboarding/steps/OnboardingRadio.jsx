import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingRadio({ onNext, query }) {
  const { register, handleSubmit, getValues } = useFormContext();
  return (
    <>
      <h2>{query.query}</h2>
      <form onSubmit={handleSubmit(() => onNext())}>
        <RadioList>
          {query.options?.map((option) => (
            <RadioItem key={option.name}>
              <input
                type="radio"
                name={query.key}
                value={option.name}
                {...register(query.key)}
              />
              {option.name}
              {option.description}
            </RadioItem>
          ))}
        </RadioList>
        <button type="submit">다음</button>
      </form>
    </>
  );
}

export default OnboardingRadio;

const RadioList = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;
const RadioItem = styled.label`
  width: 100%;
  border: 1px solid green;
  margin-bottom: 30px;
`;
