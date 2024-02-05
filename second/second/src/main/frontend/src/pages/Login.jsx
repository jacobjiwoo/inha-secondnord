import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { InputValid, LeftArrow, PasswordEye } from "../assets/svg";
import { DevTool } from "@hookform/devtools";
import { setCookie } from "../utils/Cookie";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    getFieldState,
  } = useForm({ mode: "onChange" });

  const idRegister = register("id", {
    required: { value: true, message: "아이디를 입력해주세요" },
    minLength: { value: 6, message: "6~12글자로 입력해주세요" },
    maxLength: { value: 12, message: "6~12글자로 입력해주세요" },
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "영문, 숫자만 사용 가능합니다",
    },
  });

  const passwordRegister = register("password", {
    required: { value: true, message: "비밀번호를 입력해주세요" },
    minLength: { value: 8, message: "8~20글자로 입력해주세요" },
    maxLength: { value: 20, message: "8~20글자로 입력해주세요" },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      message: "영문, 숫자, 특수기호를 포함해주세요",
    },
  });

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("/api/login", getValues());
      localStorage.setItem("accessToken", response.data);
      setCookie("loginCookie", response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoginErrors(error.response.data.message);
    }
  };

  return (
    <LoginLayout>
      <header className="header">
        <div className="prev-button" onClick={() => navigate(-1)}>
          <LeftArrow fill={"black"} />
        </div>
      </header>
      <h2 className="login-title">로그인</h2>
      <LoginBox>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <InputContainer>
            <InputWrapper>
              <Input
                key="id"
                type="text"
                maxLength={12}
                placeholder="아이디"
                autoFocus
                {...idRegister}
                style={{
                  outline:
                    getFieldState("id").isDirty &&
                    !getFieldState("id").invalid &&
                    "2px solid #9852f9",
                  backgroundColor:
                    getFieldState("id").isDirty &&
                    !getFieldState("id").invalid &&
                    "#fff",
                }}
              />
              {getFieldState("id").isDirty && !getFieldState("id").invalid && (
                <div className="valid-logo">
                  <InputValid />
                </div>
              )}
            </InputWrapper>
            <ErrorMessage
              name="id"
              errors={errors}
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </InputContainer>
          <InputContainer>
            <InputPassword>
              <Input
                type={showPassword ? "text" : "password"}
                maxLength={20}
                placeholder="비밀번호"
                {...passwordRegister}
                style={{
                  outline:
                    getFieldState("password").isDirty &&
                    !getFieldState("password").invalid &&
                    "2px solid #9852f9",
                  backgroundColor:
                    getFieldState("password").isDirty &&
                    !getFieldState("password").invalid &&
                    "#fff",
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
          <span className="login-error">{loginErrors}</span>
          <Button className="submit" type="submit">
            로그인
          </Button>
        </form>
        <Link to="/join">회원가입</Link>
      </LoginBox>
    </LoginLayout>
  );
}

export default Login;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  & .header {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;

    & .prev-button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    & svg {
      width: 1rem;
      height: 1.5rem;
    }
  }

  & .login-title {
    margin-top: 10rem;
    margin-bottom: 3rem;
  }
`;

const LoginBox = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 19rem;
  padding: 1rem;
  border: 2px solid #9852f9;
  border-radius: 1rem;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & .login-error {
    color: red;
    margin-bottom: 0.5rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  & .error-message {
    font-size: 0.9rem;
    margin-top: 0.3rem;
    padding-left: 0.5rem;
    color: red;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;

  & .valid-logo {
    position: absolute;
    right: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Input = styled.input`
  width: 16rem;
  height: 2.5rem;
  margin-bottom: 0.2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  padding-left: 1rem;

  &:focus {
    outline: 2px solid #9852f9;
    background-color: #fff;
  }
`;

const InputPassword = styled.div`
  position: relative;
  display: flex;

  & .password-eye {
    position: absolute;
    right: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4.5rem;
  background-color: #9852f9;
  color: #f1f1f1;
  cursor: pointer;
`;
