import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/ApiConfig";
import { calculateTimeLeft } from "src/utils/index";
import { injected } from "../connectors";
import { useWeb3React } from "@web3-react/core";

import { default_RPC_URL, getWeb3ContractObject, getWeb3Obj } from "src/utils";
import VestingABI from "src/config/VestingABI.json";
import OldVestingABI from "src/config/OldVestingABI.json";
import { ACTIVE_NETWORK, NetworkDetails } from "src/constants";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("token", accessToken);
  } else {
    sessionStorage.removeItem("token");
  }
};
function checkLogin() {
  const accessToken = window.sessionStorage.getItem("token");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState();
  const [allocatedAmount, setAllocatedAmount] = useState(false);
  const [isConnectMetamask, setisConnectMetamask] = useState(false);
  const [walletAddress, setwalletAddress] = useState(false);
  const [lockedAmount, setLockedAmount] = useState(false);
  const [unlockedAmount, setunlockedAmount] = useState(false);
  const [totalClaimedAmount, settotalClaimedAmount] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadingbalance, setloadingBalance] = useState(true);
  const [endTime, setEndtime] = useState();
  const [coinList, setCoinList] = useState([]);
  let listadCoin = [
    "Usdtbsc",
    "Bnbbsc",
    "Usdttrc20",
    "Eth",
    "Btc",
    "Usdterc20",
    "Tusd",
  ];
  const [kycData, setKycData] = useState([]);
  const [timeLeft, setTimeLeft] = useState();

  let data = {
    walletAddress,
    isConnectMetamask,
    setisConnectMetamask,
    allocatedAmount,
    loadingbalance,
    lockedAmount,
    unlockedAmount,
    totalClaimedAmount,
    userLoggedIn: isLogin,
    userData,
    kycData,
    timeLeft,
    coinList,
    setTimeLeft,
    setEndtime,
    loading,
    account,
    isCorrectNetwork: chainId === ACTIVE_NETWORK ? true : false,
    connectWallet: () => connectWallet(),
    swichNetworkHandler: () => swichNetworkHandler(),
    getLaserValue: () => getLaserValue(),
    getProfileHandler: () => getProfileHandler(),
    getCoinlistHandler: () => getCoinlistHandler(),
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  const connectWallet = () => {
    try {
      activate(injected, undefined, true).catch((error) => {
        if (error) {
          console.log("ERROR", error);
          const errorMSG = error.message; //+ ' Please install Metamask';
          toast.warn(errorMSG);
          // alert(errorMSG);
          activate(injected);
        }
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const swichNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
      if (error.code === 4902) {
        addNetworkHandler();
      }
    }
  };
  const addNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };
  const getProfileHandler = async () => {
    try {
      const res = await axios.get(ApiConfig.myAccount, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setKycData(res?.data?.data?.kyc?.document?.reverse()[0]);
        setUserData(res?.data?.data);
        setisConnectMetamask(
          res?.data?.data.withdrawAddress === "NA" ? true : false
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.status === 400) {
          window.sessionStorage.removeItem("token");
          checkLogin();
        }
      }
    }
  };
  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime * 1000));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const getLaserValue1 = async () => {
    getLaserValue();
    // setloadingBalance(true);
    // setAllocatedAmount();
    // setLockedAmount();
    // setunlockedAmount();
    settotalClaimedAmount(0);

    setAllocatedAmount(0);
    setLockedAmount(0);
    setunlockedAmount(0);
    const web3 = await getWeb3Obj(default_RPC_URL);
    let WalletAddress;
    let filteredUsers = [];
    let laserValue = 0;
    let amount = 0;
    let totalClaimedAm = 0;
    let unlockedTokenAmount = 0;
    try {
      // console.log(" ---- oldconstantObj ", oldconstantObj);
      const resLaserValue = await axios({
        method: "GET",
        url: ApiConfig.laserValue,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (resLaserValue.data.status === 200) {
        // console.log(" --------- res", res.data.data);
        laserValue = resLaserValue.data.data;
      }
    } catch (err) {
      console.log(" error ", err);
      setloadingBalance(false);
    }
    try {
      const resGetAddress = await axios({
        method: "GET",
        url: ApiConfig.getAddress,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          coinName: "FIERO",
        },
      });
      if (resGetAddress.data.status === 200) {
        WalletAddress = resGetAddress.data.data.walletAddress;
        setwalletAddress(resGetAddress.data.data.walletAddress);
      }

      const oldconstantObj = await getWeb3ContractObject(
        OldVestingABI,
        "0xB02C238dBcA61c3e91BfcF37cA1097a42560d485",
        default_RPC_URL
      );
      const getUserTotalVesting1 = await oldconstantObj.methods
        .getUserTotalVesting(WalletAddress)
        .call();

      if (Number(getUserTotalVesting1) > 0) {
        // console.log(" ------ constantObj ", oldconstantObj);

        const userInfo1 = await oldconstantObj.methods
          .userInfo(WalletAddress)
          .call();

        for (let i = 0; i < Number(getUserTotalVesting1); i++) {
          const getUnlockedTokenAmount1 = await oldconstantObj.methods
            .getUnlockedTokenAmount(WalletAddress, i.toString())
            .call();
          unlockedTokenAmount +=
            Number(getUnlockedTokenAmount1[0]) > 0
              ? Number(web3.utils.fromWei(getUnlockedTokenAmount1[0]))
              : 0;
        }

        let balance1 =
          Number(
            web3.utils.fromWei(userInfo1.totalAllocatedAmount.toString())
          ) -
          Number(web3.utils.fromWei(userInfo1.totalClaimedAmount.toString()));
        amount = amount + Number(balance1.toString());

        let totalClAmount = Number(userInfo1.totalClaimedAmount);
        totalClaimedAm =
          totalClaimedAm + Number(totalClAmount) > 0
            ? Number(web3.utils.fromWei(totalClAmount.toString()))
            : 0;

        // console.log(amount, " amount  ------ constantObj old  ");
      }

      // -------- getParticipatedPool ----------
      const res = await axios({
        method: "GET",
        url: ApiConfig.getParticipatedPool,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        filteredUsers = res.data.data;

        setloadingBalance(false);
      }
    } catch (err) {
      console.log(" <error totalAvalableAmount ------ userInfo ", err);
      setloadingBalance(false);
      setAllocatedAmount(0);
      setLockedAmount(0);
      setunlockedAmount(0);
    }
    await Promise.all(
      filteredUsers.map(async (listData) => {
        const constantObj = await getWeb3ContractObject(
          VestingABI,
          listData.contractAddress,
          default_RPC_URL
        );
        const getUserTotalVesting = await constantObj.methods
          .getUserTotalVesting(WalletAddress)
          .call();

        if (Number(getUserTotalVesting) > 0) {
          // console.log(" ------ constantObj ", getUserTotalVesting);
          const userInfo = await constantObj.methods
            .userInfo(WalletAddress)
            .call();
          console.log(
            getUserTotalVesting,
            " unlockedTokenAmount ------ userInfo ",
            userInfo
          );
          for (let i = 0; i < Number(getUserTotalVesting); i++) {
            try {
              console.log(" unlockedTokenAmount ------ userInfo ", i);
              const getUnlockedTokenAmount = await constantObj.methods
                .getUnlockedTokenAmount(WalletAddress, i.toString())
                .call();
              console.log(
                getUnlockedTokenAmount,
                " unlockedTokenAmount ------ userInfo ",
                i
              );
              unlockedTokenAmount +=
                Number(getUnlockedTokenAmount[0]) > 0
                  ? Number(web3.utils.fromWei(getUnlockedTokenAmount[0]))
                  : 0;
            } catch (error) {
              console.log(" ------- error ", error);
            }
          }

          let balance =
            Number(
              web3.utils.fromWei(userInfo.totalAllocatedAmount.toString())
            ) -
            Number(web3.utils.fromWei(userInfo.totalClaimedAmount.toString()));
          amount = amount + Number(balance.toString());
          let totalClAmount = Number(
            web3.utils.fromWei(userInfo.totalClaimedAmount.toString())
          );
          totalClaimedAm = totalClaimedAm + totalClAmount;
        }
      })
    );
    // console.log(
    //   " ------ Number(totalClaimedAm) - Number(laserValue) ",
    //   Number(totalClaimedAm) - Number(laserValue)
    // );
    settotalClaimedAmount(Number(totalClaimedAm) - Number(laserValue));
    let totalAvalableAmount = amount - (unlockedTokenAmount + laserValue);
    setAllocatedAmount(unlockedTokenAmount + laserValue);
    setLockedAmount(totalAvalableAmount);
    setunlockedAmount(unlockedTokenAmount);
  };

  const getLaserValue = async () => {
    setAllocatedAmount(0);
    setLockedAmount(0);
    setunlockedAmount(0);
    settotalClaimedAmount(0);
    // const web3 = await getWeb3Obj(default_RPC_URL);
    let arrayA = [];
    let laserValue = 0;
    let amount = 0;
    let totalClaimedAm = 0;
    let unlockedTokenAmount = 0;
    try {
      const resLaserValue = await axios({
        method: "GET",
        url: ApiConfig.laserValue,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (resLaserValue.data.status === 200) {
        laserValue = resLaserValue.data.data;
      }
    } catch (err) {
      console.log("error fetching laser value", err);
      setloadingBalance(false);
    }
    let WalletAddress;
    // let resOld;
    // let resNew;
    try {
      const resGetAddress = await axios({
        method: "GET",
        url: ApiConfig.getAddress,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        params: {
          coinName: "FIERO",
        },
      });
      if (resGetAddress.data.status === 200) {
        WalletAddress = resGetAddress.data.data.walletAddress;
        setwalletAddress(resGetAddress.data.data.walletAddress);
      }

      const res = await axios({
        method: "GET",
        url: ApiConfig.getParticipatedPool,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        const filteredUsers = res.data.data;
        arrayA = filteredUsers.map((listData) => listData.contractAddress);
      }
    } catch (err) {
      console.log("error fetching addresses or participated pool", err);
    }
    if (arrayA.length > 0) {
      try {
        const body = { contractAddress: arrayA, WalletAddress: WalletAddress };
        let resNew = await axios({
          method: "POST",
          //     url: `http://172.16.1.217:1969/vesting/newUserAllocaltionLockFund`,
          url: ApiConfig.newAllocaltionLockFund,
          headers: {
            authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
          data: body,
        });
        if (resNew.status === 200) {
          if (resNew.data.status === 200) {
            // if (resNew.data.data.status === 200) {
            console.log(" ----- resNew ", resNew.data.data.result);
            let resultNew = resNew.data.data.result;
            amount += resultNew.amount;
            totalClaimedAm += resultNew.totalClaimedAm;
            unlockedTokenAmount += resultNew.unlockedTokenAmount;
            //   }
          }
        }
      } catch (error) {
        console.log("error fetching new user allocation lock fund", error);
      }
    }
    try {
      let resOld = await axios({
        method: "POST",
        //     url: `http://172.16.1.217:1969/vesting/userAllocaltionLockFund`,
        url: ApiConfig.userAllocaltionLockFund,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        data: {
          WalletAddress: WalletAddress,
        },
      });
      if (resOld.status === 200) {
        if (resOld.data.status === 200) {
          // if (resOld.data.data.status === 200) {
          console.log(" ----- resNew ", resOld.data.data.result);
          let resultOld = resOld.data.data.result;
          amount += resultOld.amount;
          totalClaimedAm += resultOld.totalClaimedAm;
          unlockedTokenAmount += resultOld.unlockedTokenAmount;
          // }
        }
      }
    } catch (err) {
      console.log("error fetching user allocation lock fund", err);
    }

    let totalAvailableAmount = amount - (unlockedTokenAmount + laserValue);
    setAllocatedAmount(unlockedTokenAmount + laserValue);
    setLockedAmount(totalAvailableAmount);
    setunlockedAmount(unlockedTokenAmount);
    settotalClaimedAmount(Number(totalClaimedAm) - Number(laserValue));
    setloadingBalance(false);
  };

  const getCoinlistHandler = async () => {
    setloading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.currencieslist,
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      if (res.data.status === 200) {
        setloading(false);
        let coinsList = res.data?.data?.currencies;
        const matchedData = listadCoin.filter((element) =>
          coinsList.includes(element.toLowerCase())
        );
        let secondaryCoinList = [];
        matchedData.forEach((element) => {
          let obj = { value: element.toString(), label: element.toUpperCase() };
          secondaryCoinList.push(obj);
        });
        setCoinList(secondaryCoinList);
      }
    } catch (err) {
      setloading(false);
      setCoinList([]);
    }
  };
  useEffect(() => {
    if (isLogin) {
      // getLaserValue();
      getCoinlistHandler();
      getProfileHandler();
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
