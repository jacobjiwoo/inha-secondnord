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
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          maxLength={16}
          autoFocus
          {...passwordRegister}
        />
        <NextButton type="submit" />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          비밀번호 표시
        </button>
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
`;

const NextButton = styled.input`
  width: 50px;
  height: 50px;
`;
