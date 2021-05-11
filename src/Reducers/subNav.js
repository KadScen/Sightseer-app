const subNavLocation = (state = "", action) => {
  switch (action.type) {
    case "HOME":
      return state;
    case "SIGNINUP":
      return (state = "Signin / SignUp");
    case "CARD":
      return (state = "Activity name");
    case "MYACCOUNT":
      return (state = "My account");
    case "ADDDEAL":
      return (state = "Add a deal");
    default:
      return state;
  }
};

export default subNavLocation;
