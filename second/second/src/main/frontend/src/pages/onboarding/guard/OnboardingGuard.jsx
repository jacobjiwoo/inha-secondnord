import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../../../useFunnel";
import OnboardingCheckbox from "../onboardingCheckbox";
import { guard_questions } from "../questions";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import OnboardingSubmit from "../OnboardingSubmit";

function OnboardingGuard() {
  const { Funnel, Step, setStep } = useFunnel("q1");
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <Funnel>
          <Step name="q1">
            <OnboardingCheckbox
              onNext={() => setStep("q2")}
              question={guard_questions[0].question}
              choice={guard_questions[0].choice}
            />
          </Step>
          <Step name="q2">
            <OnboardingCheckbox
              onNext={() => setStep("submit")}
              question={guard_questions[1].question}
              choice={guard_questions[1].choice}
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
