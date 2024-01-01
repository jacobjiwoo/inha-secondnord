import React, { Suspense, useEffect, useState } from "react";
import IdStep from "./steps/IdStep";
import PasswordStep from "./steps/PasswordStep";
import { useFunnel } from "../../useFunnel";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import EmailStep from "./steps/EmailStep";
import SubmitStep from "./steps/SubmitStep";
import GenderAndBirthStep from "./steps/GenderAndBirthStep";
import { DevTool } from "@hookform/devtools";

const steps = ["genderAndbirth", "id", "password", "email"];
const defaultValues = {
  birth: "",
  email: "",
  gender: "",
  id: "",
  password: "",
};

function Join() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);
  const methods = useForm({ defaultValues, mode: "onChange" });
  return (
    <>
      <FormProvider {...methods}>
        <Funnel>
          <Step name="genderAndbirth">
            <GenderAndBirthStep onNext={() => setStep("id")} />
          </Step>
          <Step name="id">
            <IdStep onNext={() => setStep("password")} />
          </Step>
          <Step name="password">
            <PasswordStep onNext={() => setStep("email")} />
          </Step>
          <Step name="email">
            <EmailStep onNext={() => setStep("submit")} />
          </Step>
          <Step name="submit">
            <Suspense fallback={<h3>로딩중...</h3>}>
              <SubmitStep />
            </Suspense>
          </Step>
        </Funnel>
      </FormProvider>
      <DevTool control={methods.control} />
    </>
  );
}

export default Join;
