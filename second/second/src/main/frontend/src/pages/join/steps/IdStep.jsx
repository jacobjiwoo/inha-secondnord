import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";

function IdStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    <>
      <form onSubmit={handleSubmit(handleIdSubmit)}>
        <InputWrapper htmlFor="id">
          <input
            id="id"
            type="text"
            maxLength={12}
            placeholder="아이디"
            autoFocus
            {...idRegister}
          />
        </InputWrapper>
        <FunnelButton type="submit" disabled={isValid ? false : true}>
          다음
        </FunnelButton>
        <ErrorMessage
          name="id"
          errors={errors}
          render={({ message }) => <h3>{message}</h3>}
        />
      </form>
    </>
  );
}

export default IdStep;

const InputWrapper = styled.label`
  border: 1px solid blue;
`;

const FunnelButton = styled.button`
  width: 80%;
  height: 50px;
`;
