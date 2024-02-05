import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { InputValid } from "../../../assets/svg";
import { DevTool } from "@hookform/devtools";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

function IdStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext();
  const handleIdSubmit = () => {
    onNext();
  };
  const idRegister = register("id", {
    required: { value: true, message: "아이디를 입력해주세요" },
    minLength: { value: 6, message: "6~12글자로 입력해주세요" },
    maxLength: { value: 12, message: "6~12글자로 입력해주세요" },
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "영문, 숫자만 사용 가능합니다",
    },
  });
  return (
    <Container>
      <h1 className="title">{"사용하실 아이디를\n입력 해 주세요"}</h1>
      <form
        id="form-join"
        onSubmit={handleSubmit(handleIdSubmit)}
        autoComplete="off"
      >
        <InputContainer>
          <InputWrapper>
            <Input
              id="id"
              type="text"
              maxLength={12}
              placeholder="아이디"
              autoFocus
              {...idRegister}
              style={{
                outline: isValid && "2px solid #9852f9",
                backgroundColor: isValid && "#fff",
              }}
            />
            {isValid && (
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
      </form>
      <Buttonwrapper>
        <button type="submit" form="form-join">
          다음 단계
        </button>
      </Buttonwrapper>
    </Container>
  );
}

export default IdStep;

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
