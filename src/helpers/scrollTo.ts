const scrollTo = <T extends { current?: HTMLElement | null }>(ref?: T) => {
  if (!ref) {
    console.log("SCROLL");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }
  ref.current?.scrollIntoView({ behavior: "smooth" });
};

export default scrollTo;
