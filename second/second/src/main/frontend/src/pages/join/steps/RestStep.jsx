import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { InputValid, PasswordEye } from "../../../assets/svg";
import { useRecoilState } from "recoil";
import { joinState } from "../../../recoil/join/atoms";

const defaultValues = {
  birth: "",
  gender: "",
  id: "",
  password: "",
};

function RestStep({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const [joinData, setJoinData] = useRecoilState(joinState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    getFieldState,
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });
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

  const birthRegister = register("birth", {
    required: { value: true, message: "생년월일을 입력해주세요." },
    minLength: { value: 8, message: "8자리 생년월일을 입력해주세요." },
    onChange: (e) => {
      if (e.target.value.length > e.target.maxLength)
        e.target.value = e.target.value.slice(0, e.target.maxLength);
    },
  });
  console.log();
  const genderRegister = register("gender", {
    required: { value: true, message: "성별을 선택해주세요." },
  });
  const handleRestSubmit = () => {
    setJoinData({ ...joinData, ...getValues() });
    onNext();
  };
  return (
    <Container>
      <form id="form-rest" onSubmit={handleSubmit(handleRestSubmit)}>
        <InputContainer>
          <span className="input-title">{"1. 아이디를 입력 해 주세요."}</span>
          <InputWrapper>
            <Input
              key="id"
              type="text"
              maxLength={12}
              placeholder="아이디"
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
          <span className="input-title">{"2. 비밀번호를 입력 해 주세요."}</span>
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
        <InputContainer>
          <span className="input-title">{"3. 생년월일을 입력 해 주세요."}</span>
          <InputWrapper>
            <Input
              type="number"
              name="birth"
              maxLength={8}
              placeholder="생년월일"
              pattern="\d*"
              {...birthRegister}
              style={{
                outline:
                  getFieldState("birth").isDirty &&
                  !getFieldState("birth").invalid &&
                  "2px solid #9852f9",
                backgroundColor:
                  getFieldState("birth").isDirty &&
                  !getFieldState("birth").invalid &&
                  "#fff",
              }}
            />
            {getFieldState("birth").isDirty &&
              !getFieldState("birth").invalid && (
                <div className="valid-logo">
                  <InputValid />
                </div>
              )}
          </InputWrapper>
          <ErrorMessage
            name="birth"
            errors={errors}
            render={({ message }) => (
              <span className="error-message">{message}</span>
            )}
          />
        </InputContainer>
        <InputContainer>
          <span className="input-title">{"4. 성별을 등록 해 주세요."}</span>
          <RadioContainer>
            <input id="male" type="radio" value="male" {...genderRegister} />
            <label className="radio-button" htmlFor="male">
              남성
            </label>
            <input
              id="female"
              type="radio"
              value="female"
              {...genderRegister}
            />
            <label className="radio-button" htmlFor="female">
              여성
            </label>
          </RadioContainer>
          <ErrorMessage
            name="gender"
            errors={errors}
            render={({ message }) => (
              <span className="error-message">{message}</span>
            )}
          />
        </InputContainer>
      </form>
      <Buttonwrapper>
        <button type="submit" form="form-rest">
          다음 단계
        </button>
      </Buttonwrapper>
    </Container>
  );
}

export default RestStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & .email-title {
    width: 21rem;
    margin-bottom: 2rem;
    color: black;
    font-size: 1.8rem;
    white-space: pre-line;
  }

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 4rem;

  & .input-title {
    padding-left: 0.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  & .error-message {
    margin-top: 0.3rem;
    padding-left: 0.5rem;
    color: red;
  }

  /* input[type="number"] 오른쪽 화살표 제거 */
  & input[type="number"]::-webkit-outer-spin-button,
  & input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & .valid-logo {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
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
    width: 3rem;
    height: 3rem;
    cursor: pointer;

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 21rem;
  height: 3rem;

  & .radio-button {
    display: block;
    text-align: center;
    width: 10rem;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: #f1f1f1;
    font-weight: bold;
    line-height: 3rem;
    cursor: pointer;
  }

  & input[type="radio"] {
    display: none;
  }

  & input[type="radio"]:checked + label {
    background-color: #9852f9;
    color: #fff;
  }
`;

const Buttonwrapper = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 3rem;
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
