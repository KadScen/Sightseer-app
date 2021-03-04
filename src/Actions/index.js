export const signinup = () => {
  return {
    type: "SIGNINUP",
  };
};

export const card = () => {
  return {
    type: "CARD",
  };
};

export const isLogged = () => {
  return {
    type: "SIGNEDIN",
  };
};

export const imageInfos = infos => {
  return {
    type: "IMAGEINFOS",
    payload: infos
  };
};