// const url = "https://java-iconexarise.mobiloitte.io"; //Stage

// const url = "http://172.16.1.220:8002"; //Local
const url = "https://javavesting.fieres.io"; //live

const user = `${url}/account`;
const auth = `${url}/auth`;
const account = `${url}/account`;
const wallet = `${url}/wallet`;
const notification = `${url}/notification`;
const staticData = `${url}/static`;
const vestingManagement = `${wallet}/vesting-management`;

const ApiConfig = {
  // --------user-----------------
  userLogin: `${auth}`,
  userSignUp: `${user}/signup`,
  verifyOTP: `${user}/verify-user`,
  resendOTP: `${user}/resend-verify-email`,
  verifySMSCode: `${user}/verify-sms-code-mobile-app`,
  forgotPassword: `${user}/forget-password/mobiloitApp`, ///verify-sms-code-mobile-app
  resendemail: `${user}/resend-verify-email`, ///verify-sms-code-mobile-app
  verifyOTPSMS: `${user}/verify-sms-code-mobile-app`, //verify-sms-code-mobile-app
  resetPassword: `${user}/reset-password-mobile-app`,
  getCountryList: `${user}/get-country-list`,
  changePassword: `${user}/change-password`,
  transactionHistory: `${url}/wallet/get-all-transaction-history-USER`,

  // ------------wallet---------------
  // getAddress: `${wallet}/wallet/get-address`,
  myWallet: `${wallet}/wallet/get-all-user-balance-and-coinlist`,
  getAllCoinWithWalletAddress: `${wallet}/wallet/get-all-coin-with-wallet-address`,
  getdeposits: `${wallet}/wallet/get-deposits`,
  getAddress: `${wallet}/wallet/get-address`,
  withdraw: `${wallet}/wallet/withdraw`,
  approveWithdraw: `${wallet}/wallet/approve-withdraw`,
  cancelWithdraw: `${wallet}/wallet/cancel-withdraw`,
  getcoindetails: `${wallet}/coin/get-coin-details`,
  buytoken: `${wallet}/vesting-management/buy-token`,
  getBalance: `${wallet}/vesting-management/get-balance`,
  sendclaimrequest: `${wallet}/vesting-management/send-claim-request`,
  getconvertedamount: `${wallet}/vesting-management/get-converted-amount`,
  minimumAmount: `${wallet}/vesting-management/get-minimum-amount`,
  getpaymentlist: `${wallet}/vesting-management/get-payment-list`,
  currencieslist: `${wallet}/vesting-management/currencies-list`,
  getcoinlist: `${wallet}/coin/get-coin-list`,
  orderhistorylist: `${wallet}/get-all-transaction-history-USER`,
  getsalelist: `${wallet}/get-sale-list`,
  vestingPlans: `${wallet}/vesting-plans-website`,
  getParticipatedPool: `${wallet}/get-participated-pool`,
  userAllocaltionLockFund: `${wallet}/vesting-management/userAllocaltionLockFund`,
  newAllocaltionLockFund: `${wallet}/vesting-management/newAllocaltionLockFund`,

  // ------account---

  myAccount: `${account}/my-account`,
  editProfile: `${account}/profile-update`,
  listWhitepaper: `${account}/get-whitepaper-full-list`,
  savekycdetails: `${account}/save-kyc-details`,
  uploadfile: `${account}/upload-file`,
  getkycdetails: `${account}/get-kyc-details`,
  googleauth: `${account}/google-auth`,
  VerifyGoogleOtp: `${account}/verify-google-code`,
  DisableGoogle: `${account}/twoFa-disable`,
  getUserWhitelist: `${account}/get-user-whitelist`,
  withdrawAddress: `${account}/withdraw-address`,

  verifygoogleauth: `${auth}/verify-google`,

  // ---------notification--------
  getNotificationList: `${notification}/get-notification-data`,
  clearNotification: `${notification}/clear-notification`,

  // -----------staticmanagement---------
  contactUs: `${staticData}/submit-support-ticket`,
  getfaqlist: `${staticData}/get-faq-list`,
  getstaticpage: `${staticData}/get-static-page-data`,
  academyList: `${staticData}/academy-list`,
  getTutorial: `${staticData}/get-tutorial`,
  // -----------Vestingmanagement---------
  getclaimableAmount: `${vestingManagement}/claimable-amount`,
  withdrawClaimablAmount: `${vestingManagement}/withdraw-claimable-amount`,
  getTotalClaimed: `${vestingManagement}/get-total-claimed`,
  laserValue: `${vestingManagement}/laser-value`,
};

export default ApiConfig;
