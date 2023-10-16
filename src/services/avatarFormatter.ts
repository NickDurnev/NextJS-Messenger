const stringAvatar = (name: string): string => {
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
};

export default stringAvatar;
