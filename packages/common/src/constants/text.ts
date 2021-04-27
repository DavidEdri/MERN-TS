export const text = {
  emailExist: "Email address already in use",
  emailNotFound: "Email address not found",
  serverError: "Server error try again later",
  passOrEmailError: "Invalid Email or Password",
  registerInstructions: (mail: string) =>
    `Follow the instructions sent to the mail: ${mail}`,
  tokenLinkError: "Token Invalid or Expired",
  passwordChanged: "Password changed successfully",
  // dialog
  dialogClose: "Close",

  // navbar
  logo: "Logo",
  profile: "Profile",
  logout: "Logout",
  menu: "Menu",

  // navbar links
  loginLink: "Login",
  homeLink: "Home",
  registerLink: "Register",
  dashboardLink: "Dashboard",
  adminLink: "Admin",

  // tableAbstract
  tableAdd: "Add new item",
  tableEdit: "Edit",
  // admin links
  adminUsersLink: "Users",
  adminPanel: "Admin Panel",

  // admin tables
  adminUsers: "Users",
  usersNameTitle: "Full Name",
  usersEmailTitle: "Email",
  usersRankTitle: "Rank",
  usersChangePassTitle: "Click to change password",
  usersActiveTitle: "Active?",
  usersChangePassFor: (email: string) => `Changing pass for ${email}`,

  // 404 page
  _404main: "oops looks like you're lost",
  _404sub: "go back home",

  // activate account
  activateInvalid: "Invalid or expired token!",
  pleaseActivate: "Please activate your account",
  didntReceiveMail: (email: string) => `Didn't received mail to ${email}?`,
  clickHere: "Click here",
  resendActivation: "to resend activation link",
  accActivated: "Account activated!",
  redirectingToLogin: "Redirecting to login page...",
  notRedirected: "if you're not being redirected",

  // login
  login: "Login",
  loginParagraph: "Enter info to login",
  noAccount: "don't have account?",
  forgotPass: "Forgot password?",

  // register
  register: "Register",
  registerParagraph: "Enter info to register",
  alreadyUser: "already a user?",

  // reset password
  changePassword: "Change Password",
  rstPwdFor: "Resetting Password for :",
  error: "Error",
  success: "Success",
  followMail: "Follow the instructions in your mail",

  // profile
  editProfileInfo: "Edit Info",
  clickToEditPass: "Change Password",

  // labels
  emailLabel: "Email Address",
  passLabel: "Password",
  passConfirmLabel: "Password Confirm",
  fullNameLabel: "Full Name",
  rankLabel: "User Rank",
  isActiveLabel: "Active?",
};
