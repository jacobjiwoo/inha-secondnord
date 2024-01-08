import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

const parseJobValue = (data) => {
  data.job === "예 " ? (data.job = true) : (data.job = false);
  return data;
};
const handleOnboardingGuardSubmit = async (data) => {
  const productArr = [];
  data.product.forEach((val) => productArr.push({ name: val }));
  data.product = productArr;

  console.log("request", data);
  data = parseJobValue(data);

  const response = await axios.post("/api/onboarding/guard", data);
  console.log("response", response);
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
