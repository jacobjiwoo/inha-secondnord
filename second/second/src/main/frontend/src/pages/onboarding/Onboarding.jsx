import { useNavigate } from "react-router-dom";
import { common_questions } from "./questions";
import styled from "styled-components";

function Onboarding() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout>
      <h2>어떤 서비스를 원하시나요?</h2>
      <div className="buttons">
        <button type="button" onClick={() => navigate("princess")}>
          핑거 프린세스
        </button>
        <button type="button" onClick={() => navigate("guard")}>
          핑거 가드
        </button>
      </div>
    </OnboardingLayout>
  );
}

export default Onboarding;

const OnboardingLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    margin-bottom: 50px;
  }
  & .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
  }
`;
