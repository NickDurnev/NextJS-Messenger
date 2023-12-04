const scrollTo = <T extends { current?: HTMLElement | null }>(ref: T) => {
  ref?.current?.scrollIntoView({ behavior: "smooth" });
};

export default scrollTo;
