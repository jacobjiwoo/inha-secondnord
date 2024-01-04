import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const handleJoinSubmit = async (data) => {
  const response = await axios.post("/api/join", data);
  console.log("response", response);
  return response;
};

function SubmitStep() {
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  // const { isLoading, data, isError, error } = useQuery({
  //   queryKey: ["join"],
  //   queryFn: async () => {
  //     return await handleJoinSubmit(getValues());
  //   },
  // });
  return (
    <>
      <div>
        <h3>가입해주셔서 감사합니다!</h3>
        <h4>맞춤 서비스 제공을 위한 몇가지 질문에 답해주실 수 있나요?</h4>
        <button type="button" onClick={() => navigate("/onboarding")}>
          네
        </button>
        <button type="button" onClick={() => navigate("/home")}>
          나중에 하기
        </button>
      </div>
    </>
  );
}

export default SubmitStep;
