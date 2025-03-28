import Web3 from "web3";

// test net--------matic
// export const mulltiCallAddressFiero =
//   "0x4445286592CaADEB59917f16826B964C3e7B2D36"; // MATIC
// export const default_RPC_URL = "https://polygon-mumbai-pokt.nodies.app/";
// export const default_RPC_URL =
//   "https://polygon-mumbai.infura.io/v3/c7dfdf62595b4093a3d8b78bfad151c3";

//mainNet    /////-----this
export const default_RPC_URL = "https://rpc2.fieroscan.com/";
export const mulltiCallAddressFiero =
  "0xDC32ce73f6Ff2f784c0c1Ab8a212eC9151f21179"; // FIERO

export function sortAddress(add) {
  const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
  return sortAdd;
}

export function HandleTrim(data) {
  let temp = data.split("_");
  // console.log(" data remove", temp.join(" "));
  return temp.join(" ");
}
export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
export function checkNumber(value) {
  const re = /^(?!0+$)[0-9]{1,10}$/gm;
  return re.test(value);
}
export const setCryptoDecimals = (amt) => {
  amt = exponentialToDecimal(amt || 0);

  amt = amt?.replace(",", "");
  let arr = amt?.toString().split(".");

  if (arr.length > 1) {
    if (arr[1].length > 8) {
      return numberWithCommas(
        // exponentialToDecimal(parseFloat(amt).toFixed(8)).toString(),
        exponentialToDecimal(parseFloat(amt)).toString()
      ).toString();
    } else {
      return numberWithCommas(amt).toString();
    }
  } else {
    if (amt) {
      return numberWithCommas(amt).toString();
    }
    return "0";
  }
};
export const exponentialToDecimal = (exponential) => {
  let decimal = exponential?.toString()?.toLowerCase();
  if (decimal?.includes("e+")) {
    const exponentialSplitted = decimal?.split("e+");
    let postfix = "";
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes(".")
          ? exponentialSplitted[0].split(".")[1].length
          : 0);
      i++
    ) {
      postfix += "0";
    }
    const addCommas = (text) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)},${text.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal?.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal?.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};
const numberWithCommas = (x) => {
  let str = toFixedFunction(x, 4);

  let arr = str.split(".");

  let numbers = arr[0];
  let decimalNum = "";
  if (arr.length > 1) {
    decimalNum = arr[1];
    return `${numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalNum}`;
  } else {
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const toFixedFunction = (amt, decimals) => {
  let str = amt?.toString();
  if (str?.includes(".")) {
    str = str.slice(0, str.indexOf(".") + (decimals + 1));
  }
  return str;
};

export const getWeb3Obj = async (RPC_URL = default_RPC_URL) => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = await new Web3(httpProvider);
  return web3;
};

export const getWeb3ContractObject = async (
  abi,
  contractAddress,
  RPC_URL = default_RPC_URL
) => {
  const web3 = await getWeb3Obj(RPC_URL);
  const contract = await new web3.eth.Contract(abi, contractAddress);
  return contract;
};
