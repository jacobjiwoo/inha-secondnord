import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";

function EmailStep({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const handleEmailSubmit = () => {
    console.log("email");
    onNext();
  };

  const emailRegister = register("email", {
    required: { value: true, message: "이메일을 입력해주세요" },
    maxLength: { value: 320, message: "이메일 길이를 확인해주세요" },
    pattern: {
      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "유효한 이메일 주소를 입력해주세요.",
    },
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleEmailSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          maxLength={320}
          autoFocus
          {...emailRegister}
        />
        <NextButton type="submit" />
      </form>
      <ErrorMessage
        name="email"
        errors={errors}
        render={({ message }) => <h3>{message}</h3>}
      />
    </Wrapper>
  );
}

export default EmailStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 100vw;
  & form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NextButton = styled.input`
  width: 50px;
  height: 50px;
`;
