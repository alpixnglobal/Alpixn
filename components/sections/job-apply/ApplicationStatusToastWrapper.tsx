import { Suspense } from "react";
import ApplicationStatusToast from "./ApplicationStatusToast";

export default function ApplicationStatusToastWrapper() {
  return (
    <Suspense>
      <ApplicationStatusToast />
    </Suspense>
  );
}
