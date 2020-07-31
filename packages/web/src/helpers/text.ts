// TODO : fix typos
export default {
  // axios config
  serverError: "Server error, try again later",

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
  pleaseActivte: "Please activate your account",
  didntReciveMain: (email: string) => `Didn't received mail to ${email}?`,
  clickHere: "Click here",
  resendActivation: "to resend activation link",
  accActivated: "Account activated!",
  redirectingToLogin: "Redirecting to login page...",
  notRedirected: "if you're not being redirected",

  // login
  login: "Login",
  loginParagraph: "Enter info to login",
  noAccount: "dont have account?",
  forgotPass: "Forgot password?",

  // regsiter
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
