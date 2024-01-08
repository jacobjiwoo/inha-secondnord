import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import { useMemo, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";

function PasswordStep({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handlePasswordSubmit = () => {
    console.log("password");
    onNext();
  };

  const passwordRegister = register("password", {
    required: { value: true, message: "비밀번호를 입력해주세요" },
    minLength: { value: 8, message: "8~20글자" },
    maxLength: { value: 20, message: "8~20글자" },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      message: "영문, 숫자, 특수기호 포함",
    },
  });
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <InputWrapper htmlFor="password">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            maxLength={16}
            placeholder="비밀번호"
            autoFocus
            {...passwordRegister}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            비밀번호 표시
          </button>
        </InputWrapper>
        <NextButton type="submit" />
        <ErrorMessage
          name="password"
          errors={errors}
          render={({ message }) => <h3>{message}</h3>}
        />
      </form>
    </Wrapper>
  );
}

export default PasswordStep;

const Wrapper = styled.div`
  border: 1px solid red;
  width: 100vw;
  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputWrapper = styled.label`
  border: 1px solid blue;
`;

const NextButton = styled.input`
  width: 50px;
  height: 50px;
`;
