import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/index")),
  },
  {
    exact: true,
    guard: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DashboardMain/DashboardIndex")
    ),
  },
  // {
  //   exact: true,
  //   guard: true,
  //   path: "/dashboardV2",
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/Dashboard/DashboardMain/DashboardIndexV1")
  //   ),
  // },
  {
    exact: true,
    guard: true,
    path: "/vesting",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/BuyToken/Vesting")),
  },
  {
    exact: true,
    guard: true,
    path: "/transaction",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Transaction/TransactionHistory")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/payment-history",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DashboardMain/PaymentHistoryView")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/order-history",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DashboardMain/OrderHistoryView")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/my-wallet",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Wallet/MyWallet")),
  },
  {
    exact: true,
    guard: true,
    path: "/my-wallet/approve",
    component: lazy(() => import("src/views/pages/Dashboard/Wallet/Approve")),
  },
  {
    exact: true,
    guard: true,
    path: "/kyc",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/KycMain/index")),
  },

  {
    exact: true,
    guard: true,
    path: "/buy-csp",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/BuyToken/Token")),
  },
  {
    exact: true,
    guard: true,
    path: "/edit-profile",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/EditProfile/Profile")
    ),
  },

  {
    exact: true,
    guard: true,
    path: "/my-profile",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/EditProfile/Profile")
    ),
  },

  // {
  //   exact: true,
  //   guard: true,
  //   path: "/fieres-academy",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Dashboard/Academy/Academy")),
  // },
  {
    exact: true,
    guard: true,
    path: "/videos-details",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Academy/VideosDetails")
    ),
  },
  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/Login")),
  },
  {
    exact: true,
    path: "/reset-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/ResetPassword")),
  },
  {
    exact: true,
    path: "/verify-otp",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/VerifyOTP")),
  },
  {
    exact: true,
    path: "/verify-password-otp",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/VerifyPasswordOtp")),
  },
  {
    exact: true,
    path: "/register",

    component: lazy(() => import("src/views/auth/Register")),
  },
  {
    exact: true,
    path: "/forgotpassword",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/ForgotPassword")),
  },
  {
    exact: true,
    path: "/contactus",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/ContactUs/ContactUs")),
  },
  {
    exact: true,
    path: "/getintouch",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/GetInTouch/GetInTouch")),
  },
  {
    exact: true,
    path: "/termscondition",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContent/Termscondition")
    ),
  },
  {
    exact: true,
    path: "/privacy-policy",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContent/PrivacyPolicy")
    ),
  },
  {
    exact: true,
    path: "/risk-disclosure",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContent/RiskDisclosure")
    ),
  },
  {
    exact: true,
    path: "/aml-Policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/StaticContent/AmlPolicy")),
  },
  {
    exact: true,
    path: "/terms-service",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/StaticContent/TermsService")),
  },

  {
    exact: true,
    path: "/about-us",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/StaticContent/AboutUs")),
  },
  {
    exact: true,
    path: "/authentication",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/2FA/Authentication")
    ),
  },
  {
    exact: true,
    path: "/notification",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Home/Notification/Notification")
    ),
  },
  {
    exact: true,
    path: "/vesting-purchase",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/BuyToken/PurchaseCheckout")
    ),
  },
  // {
  //   exact: true,
  //   path: "/white-paper",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Dashboard/Whitepaper")),
  // },
  {
    exact: true,
    path: "/ambassador",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Ambassador")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
