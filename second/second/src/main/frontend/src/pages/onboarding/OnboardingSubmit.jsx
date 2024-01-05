import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

const handleOnboardingGuardSubmit = async (data) => {
  const response = await axios.post("/api/onboarding/guard", data);
  console.log(response);
  return response;
};

function OnboardingSubmit() {
  const { getValues } = useFormContext();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["onbardingGuard"],
    queryFn: async () => {
      return await handleOnboardingGuardSubmit(getValues());
    },
  });
  return (
    <>
      <div>설문조사 감사합니다.</div>
      <Link to="/home">홈으로</Link>
    </>
  );
}

export default OnboardingSubmit;
