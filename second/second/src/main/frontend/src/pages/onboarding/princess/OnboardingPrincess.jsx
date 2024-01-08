import { FormProvider, useForm } from "react-hook-form";
import { useFunnel } from "../../../useFunnel";
import { Link } from "react-router-dom";
import { princess_queries } from "../OnboardingQuery";
import OnboardingCheckbox from "../steps/OnboardingCheckbox";

const steps = [princess_queries[0].key, princess_queries[1].key];

function OnboardingPrincess() {
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Funnel>
        <Step name={steps[0]}>
          <OnboardingCheckbox
            onNext={() => setStep(steps[1])}
            query={princess_queries[0]}
          />
        </Step>
        <Step name={steps[1]}>
          <OnboardingCheckbox
            onNext={() => setStep("submit")}
            query={princess_queries[1]}
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
