import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
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
    minLength: { value: 8, message: "8자리 생년월일을 입력해주세요." },
    maxLength: { value: 8, message: "8자리 생년월일을 입력해주세요." },
  });

  // const handleBirthChange = (event) => {
  //   console.log(event.target.value);
  //   const input = event.target.value.replace(/\D/g, "").substring(0, 8);
  //   const year = event.target.value.substring(0, 4);
  //   const month = event.target.value.substring(4, 6);
  //   const day = event.target.value.substring(6, 8);

  //   if (input.length > 6) {
  //     event.target.value = `${year} ${month} ${day}`;
  //   } else if (input.length > 4) {
  //     event.target.value = `${year} ${month}`;
  //   } else if (input.length > 0) {
  //     event.target.value = `${year}`;
  //   }
  // };
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
          type="text"
          maxLength={8}
          autoFocus
          placeholder="YYYY.MM.DD"
          {...birthRegister}
          // onChange={handleBirthChange}
        />
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
