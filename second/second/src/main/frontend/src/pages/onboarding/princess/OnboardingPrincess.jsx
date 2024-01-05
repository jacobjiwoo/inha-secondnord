import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../../../useFunnel";
import OnboardingCheckbox from "../onboardingCheckbox";
import { princess_questions } from "../questions";
import { Link } from "react-router-dom";

function OnboardingPrincess() {
  const { Funnel, Step, setStep } = useFunnel("q1");
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Funnel>
        <Step name="q1">
          <OnboardingCheckbox
            onNext={() => setStep("q2")}
            question={princess_questions[0].question}
            choice={princess_questions[0].choice}
          />
        </Step>
        <Step name="q2">
          <OnboardingCheckbox
            onNext={() => setStep("submit")}
            question={princess_questions[1].question}
            choice={princess_questions[1].choice}
          />
        </Step>
        <Step name="submit">
          <Link to="/home">홈으로</Link>
        </Step>
      </Funnel>
    </FormProvider>
  );
}

export default OnboardingPrincess;
