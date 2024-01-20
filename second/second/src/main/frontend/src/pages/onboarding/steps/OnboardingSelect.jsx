import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function OnboardingSelect({ onNext, query }) {
  const { register, handleSubmit, setValue, getValues } = useFormContext();
  return (
    <Container>
      <h1 className="onboarding-query">{query.query}</h1>
      <form onSubmit={handleSubmit(() => onNext())}>
        <SelectList>
          {query.options?.map((option) => (
            <SelectItem key={option.description}>
              <Button
                type="submit"
                onClick={() => setValue(query.key, option.name)}
              >
                {option.description}
              </Button>
            </SelectItem>
          ))}
        </SelectList>
      </form>
    </Container>
  );
}

export default OnboardingSelect;

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
    white-space: pre-line;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SelectList = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
`;
const SelectItem = styled.label`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 2.5rem;
  border: none;
  border-radius: 4.5rem;
  background-color: #f1f1f1;
  cursor: pointer;
`;
