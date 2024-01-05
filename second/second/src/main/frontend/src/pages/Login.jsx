import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const idRegister = register("id", {
    required: { value: true, message: "아이디를 입력해주세요" },
    minLength: { value: 6, message: "6~12글자" },
    maxLength: { value: 12, message: "6~12글자" },
    pattern: { value: /^[A-Za-z0-9]+$/, message: "영문, 숫자" },
  });

  const passwordRegister = register("password", {
    required: { value: true, message: "비밀번호를 입력해주세요" },
    minLength: { value: 8, message: "8~20글자" },
    maxLength: { value: 20, message: "8~20글자" },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      message: "영문, 숫자, 특수기호 포함",
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
      <LoginBox>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Input
            id="id"
            type="text"
            placeholder="아이디"
            {...idRegister}
            autoFocus
          />
          <ErrorMessage
            name="id"
            errors={errors}
            render={({ message }) => <span>{message}</span>}
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            {...passwordRegister}
          />
          <ErrorMessage
            name="password"
            errors={errors}
            render={({ message }) => <span>{message}</span>}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            비밀번호 표시
          </button>
          <span style={{ color: "red" }}>{loginErrors}</span>
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

const FlexCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoginBox = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40%;
  border-color: #9852f9;
  border-radius: 10px;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const Input = styled.input`
  border: none;
  width: 60%;
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 0 1px #979797;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 2rem;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  background-color: #9852f9;
  border: none;
  cursor: pointer;
`;
