import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

const handleJoinSubmit = async (data) => {
  console.log(data);
  const response = await axios.post("/api/signup", data);
  console.log(response);
  return response;
};

function SubmitStep() {
  const { getValues } = useFormContext();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["join"],
    queryFn: () => {
      handleJoinSubmit(getValues());
    },
  });
  return <>{isError ? <div>에러 발생</div> : <div>회원가입 성공</div>}</>;
}

export default SubmitStep;
