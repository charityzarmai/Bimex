import { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import { useTranslation } from "react-i18next";

const TOUR_STORAGE_KEY = "bimex.tourCompletado";

export default function OnboardingTour({ run, onComplete }) {
  const { t } = useTranslation();
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    setRunTour(run);
  }, [run]);

  const steps = [
    {
      target: ".wallet-chip",
      content: t("tour.step1"),
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".grid-proyectos",
      content: t("tour.step2"),
      placement: "top",
    },
    {
      target: ".project-card",
      content: t("tour.step3"),
      placement: "top",
    },
    {
      target: ".navbar-hide-tablet",
      content: t("tour.step4"),
      placement: "bottom",
    },
    {
      target: "[data-tour='mi-cuenta']",
      content: t("tour.step5"),
      placement: "bottom",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
      if (onComplete) onComplete();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      locale={{
        back: t("tour.back"),
        close: t("tour.close"),
        last: t("tour.last"),
        next: t("tour.next"),
        skip: t("tour.skip"),
      }}
      styles={{
        options: {
          primaryColor: "#16A34A",
          textColor: "#1E293B",
          backgroundColor: "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          arrowColor: "#FFFFFF",
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: "8px",
          padding: "16px 20px",
          fontSize: "0.88rem",
          lineHeight: 1.6,
        },
        tooltipTitle: {
          fontSize: "0.95rem",
          fontWeight: 600,
          marginBottom: "8px",
        },
        buttonNext: {
          backgroundColor: "#16A34A",
          borderRadius: "6px",
          padding: "8px 16px",
          fontSize: "0.84rem",
          fontWeight: 600,
        },
        buttonBack: {
          color: "#64748B",
          marginRight: "8px",
          fontSize: "0.84rem",
        },
        buttonSkip: {
          color: "#94A3B8",
          fontSize: "0.84rem",
        },
      }}
    />
  );
}

export function shouldShowTour() {
  return localStorage.getItem(TOUR_STORAGE_KEY) !== "true";
}

export function resetTour() {
  localStorage.removeItem(TOUR_STORAGE_KEY);
}
