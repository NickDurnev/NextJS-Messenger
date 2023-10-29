const stringAvatar = (name: string): string => {
  const splitted = name.split(" ");
  if (splitted.length === 1) {
    return splitted[0][0];
  }
  return `${splitted[0][0]}${splitted[1][0]}`;
};

export default stringAvatar;
