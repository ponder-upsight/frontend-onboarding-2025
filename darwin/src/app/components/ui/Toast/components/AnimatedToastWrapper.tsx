import { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";

interface AnimatedToastWrapperProps {
  children: React.ReactNode;
  data?: {
    title: string;
    requestId?: string;
    errorCode?: string;
  };
}

const shakeVariant = {
  shake: {
    x: [0, -5, 5, -3, 3, 0],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const AnimatedToastWrapper = ({ children, data }: AnimatedToastWrapperProps) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start("shake");
  }, [data?.requestId]);

  return (
    <motion.div variants={shakeVariant} animate={controls}>
      {children}
    </motion.div>
  );
};
