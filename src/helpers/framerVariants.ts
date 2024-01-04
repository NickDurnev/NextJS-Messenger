export const userMenuSidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const fadeVariant = {
  initial: { opacity: 0, scale: 0.7 },
  open: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 },
};
