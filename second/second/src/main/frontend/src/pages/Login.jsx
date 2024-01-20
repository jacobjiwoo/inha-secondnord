import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { LeftArrow, PasswordEye } from "../assets/svg";
import { DevTool } from "@hookform/devtools";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
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
      message: "영문, 숫자, 특수기호를 포함해야 합니다",
    },
  });

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("/api/login", getValues());
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setLoginErrors(error.response.data.message);
    }
  };

  return (
    <LoginLayout>
      <header className="header-login">
        <div className="prev-button" onClick={() => navigate(-1)}>
          <LeftArrow fill={"black"} />
        </div>
      </header>
      <h2 className="login-title">로그인</h2>
      <div className="login-type"></div>
      <LoginBox>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <InputContainer>
            <Input
              type="text"
              placeholder="아이디"
              maxLength={12}
              {...idRegister}
            />
            <ErrorMessage
              name="id"
              errors={errors}
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              maxLength={20}
              {...passwordRegister}
            />

            <div
              className="password-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <PasswordEye />
            </div>
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

  & .header-login {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding-left: 3rem;
    background-color: #fff;

    & .prev-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.3rem;
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

  & .login-type {
    width: 20rem;
    height: 2rem;
    margin-bottom: 2rem;
    /* border-bottom: 0.1rem solid #9852f9; */
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;

  & .error-message {
    padding-left: 1rem;
    color: red;
  }

  & .password-eye {
    position: absolute;
    top: 0.6rem;
    right: 1rem;
    cursor: pointer;

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const Input = styled.input`
  width: 20rem;
  height: 3rem;
  margin-bottom: 0.3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f1f1f1;
  padding-left: 1rem;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4.5rem;
  background-color: #9852f9;
  color: #f1f1f1;
  cursor: pointer;
`;
