import { FC } from "react";

import { AnimatedToastWrapper } from "./AnimatedToastWrapper";
import { ErrorToast } from "./ErrorToast";

type ToastProps = {
  data: { title: string };
  closeToast?: () => void;
};

export const ShakingErrorToast: FC<ToastProps> = ({ data, closeToast }) => (
  <AnimatedToastWrapper data={data}>
    <ErrorToast data={data} closeToast={closeToast} />
  </AnimatedToastWrapper>
);
