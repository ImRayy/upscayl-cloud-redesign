import * as React from "react";
import useWindowSize from "./use-window-dimensions";

const DEFAULT_MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakpoint?: number) {
  const MOBILE_BREAKPOINT = breakpoint || DEFAULT_MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  const { width } = useWindowSize();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(width <= MOBILE_BREAKPOINT);
  }, [MOBILE_BREAKPOINT, width]);

  return isMobile;
}
