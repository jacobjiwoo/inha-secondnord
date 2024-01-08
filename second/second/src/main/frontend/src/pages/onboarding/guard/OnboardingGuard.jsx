import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../../../useFunnel";
import OnboardingCheckbox from "../steps/onboardingCheckbox";
import { guard_queries } from "../OnboardingQuery";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import OnboardingSubmit from "../steps/OnboardingSubmit";
import OnboardingRadio from "../steps/OnboardingRadio";

const steps = [guard_queries[0].key, guard_queries[1].key];
const defaultValues = {
  product: [],
  job: false,
};

function OnboardingGuard() {
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const methods = useForm({ defaultValues });
  return (
    <>
      <FormProvider {...methods}>
        <Funnel>
          <Step name={steps[0]}>
            <OnboardingCheckbox
              onNext={() => setStep(steps[1])}
              query={guard_queries[0]}
            />
          </Step>
          <Step name={steps[1]}>
            <OnboardingRadio
              onNext={() => setStep("submit")}
              query={guard_queries[1]}
            />
          </Step>
          <Step name="submit">
            <Suspense fallback={<h3>로딩중...</h3>}>
              <OnboardingSubmit />
            </Suspense>
          </Step>
        </Funnel>
      </FormProvider>
    </>
  );
}

export default OnboardingGuard;
