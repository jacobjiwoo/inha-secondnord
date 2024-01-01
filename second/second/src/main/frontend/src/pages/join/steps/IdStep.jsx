import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";

function IdStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleIdSubmit = () => {
    console.log("id");
    onNext();
  };

  const idRegister = register("id", {
    required: { value: true, message: "아이디를 입력해주세요" },
    minLength: { value: 6, message: "6~12글자" },
    maxLength: { value: 12, message: "6~12글자" },
    pattern: { value: /^[A-Za-z0-9]+$/, message: "영문, 숫자" },
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleIdSubmit)}>
        <label htmlFor="id">아이디</label>
        <input id="id" type="text" maxLength={12} autoFocus {...idRegister} />
        <NextButton type="submit" />
        <ErrorMessage
          name="id"
          errors={errors}
          render={({ message }) => <h3>{message}</h3>}
        />
      </form>
    </Wrapper>
  );
}

export default IdStep;

const Wrapper = styled.div`
  border: 1px solid red;
  width: 100vw;
`;

const NextButton = styled.input`
  width: 50px;
  height: 50px;
`;
