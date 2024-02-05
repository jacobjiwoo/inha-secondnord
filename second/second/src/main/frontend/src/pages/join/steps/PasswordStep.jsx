import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { InputValid, PasswordEye } from "../../../assets/svg";
import { useState } from "react";

function PasswordStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordSubmit = () => {
    onNext();
  };
  const passwordRegister = register("password", {
    required: { value: true, message: "비밀번호를 입력해주세요" },
    minLength: { value: 8, message: "8~20글자로 입력해주세요" },
    maxLength: { value: 20, message: "8~20글자로 입력해주세요" },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      message: "영문, 숫자, 특수기호 포함",
    },
  });

  return (
    <Container>
      <h1 className="title">{"사용하실 비밀번호를\n입력 해 주세요"}</h1>
      <form id="form-join" onSubmit={handleSubmit(handlePasswordSubmit)}>
        <InputContainer>
          <InputPassword>
            <Input
              type={showPassword ? "text" : "password"}
              maxLength={20}
              placeholder="비밀번호"
              autoFocus
              {...passwordRegister}
              style={{
                outline: isValid && "2px solid #9852f9",
                backgroundColor: isValid && "#fff",
              }}
            />
            <div
              className="password-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <PasswordEye />
            </div>
          </InputPassword>
          <ErrorMessage
            name="password"
            errors={errors}
            render={({ message }) => (
              <span className="error-message">{message}</span>
            )}
          />
        </InputContainer>
      </form>
      <Buttonwrapper>
        <button type="submit" form="form-join">
          다음 단계
        </button>
      </Buttonwrapper>
    </Container>
  );
}

export default PasswordStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 5rem;

  & .title {
    width: 21rem;
    margin-top: 3.5rem;
    margin-bottom: 2rem;
    color: black;
    font-size: 1.8rem;
    line-height: 2.5rem;
    white-space: pre-line;
  }

  & .form-join {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & .error-message {
    margin-top: 0.5rem;
    padding-left: 0.5rem;
    color: red;
  }
`;

const InputPassword = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & .password-eye {
    position: absolute;
    right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 20rem;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  padding-left: 1rem;

  &:focus {
    outline: 2px solid #9852f9;
    background-color: #fff;
  }
`;

const Buttonwrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 4rem;
  background-color: #fff;

  & button {
    width: 21rem;
    height: 2.5rem;
    border: none;
    border-radius: 4.5rem;
    color: #f1f1f1;
    background-color: #9852f9;
    cursor: pointer;
  }
`;
