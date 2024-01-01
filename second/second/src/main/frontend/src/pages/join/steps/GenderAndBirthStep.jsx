import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

function GenderAndBirthStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleGenderAndBirthSubmit = () => {
    console.log("gender and birth");
    onNext();
  };

  const genderRegister = register("gender", {
    required: { value: true, message: "성별을 선택해주세요." },
  });

  const birthRegister = register("birth", {
    required: { value: true, message: "생년월일을 선택해주세요." },
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleGenderAndBirthSubmit)}>
        <div>성별</div>
        <input id="male" type="radio" value="male" {...genderRegister} />
        <label htmlFor="male">남성</label>
        <input id="female" type="radio" value="female" {...genderRegister} />
        <label htmlFor="female">여성</label>
        <ErrorMessage
          name="gender"
          errors={errors}
          render={({ message }) => <h3>{message}</h3>}
        />

        <br />

        <div>생년월일</div>
        <input
          name="birth"
          type="number"
          maxLength={8}
          placeholder="YYYY.MM.DD"
          {...birthRegister}
        />
        {/* <input name="year" type="number" maxLength={4} placeholder="YYYY" />
        <input name="month" type="number" maxLength={2} placeholder="MM" />
        <input name="day" type="number" maxLength={2} placeholder="DD" /> */}
        <ErrorMessage
          name="birth"
          errors={errors}
          render={({ message }) => <h3>{message}</h3>}
        />
        <NextButton type="submit" />
      </form>
    </Wrapper>
  );
}

export default GenderAndBirthStep;

const Wrapper = styled.div`
  border: 1px solid red;
  width: 100vw;
`;

const NextButton = styled.input`
  width: 50px;
  height: 50px;
`;
