const subNavLocation = (state = "", action) => {
  switch (action.type) {
    case "HOME":
      return state;
    case "SIGNINUP":
      return (state = "Login / SignUp");
    case "CARD":
      return (state = "Activity Name");
    default:
      return state;
  }
};

export default subNavLocation;
