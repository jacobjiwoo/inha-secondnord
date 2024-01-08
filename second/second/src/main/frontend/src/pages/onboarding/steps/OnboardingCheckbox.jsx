import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingCheckbox({ onNext, query }) {
  const { register, handleSubmit, getValues } = useFormContext();
  console.log(getValues());
  return (
    <>
      <h2>{query.query}</h2>
      <form onSubmit={handleSubmit(() => onNext())}>
        <CheckboxList>
          {query.options?.map((option, index) => (
            <CheckboxItem key={index}>
              <input
                type="checkbox"
                name={query.key}
                value={option.name}
                {...register(query.key)}
              />
              {option.name}
              {option.description}
            </CheckboxItem>
          ))}
        </CheckboxList>
        <button type="submit">다음</button>
      </form>
    </>
  );
}

export default OnboardingCheckbox;

const CheckboxList = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;
const CheckboxItem = styled.label`
  width: 100%;
  border: 1px solid green;
  margin-bottom: 70px;
`;
