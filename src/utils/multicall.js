import { Interface } from "@ethersproject/abi";
import MultiCallAbi from "../config/Multicall.json";
import {
  mulltiCallAddressFiero,
  default_RPC_URL,
  getWeb3ContractObject,
} from "./index";

const multicall = async (abi, calls) => {
  try {
    const multi = await getWeb3ContractObject(
      MultiCallAbi,
      mulltiCallAddressFiero,
      default_RPC_URL
    );
    const itf = new Interface(abi);
    console.log("multi", multi);
    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ]);
    const { returnData } = await multi.methods.aggregate(calldata).call();
    const res = returnData.map((call, i) =>
      itf.decodeFunctionResult(calls[i].name, call)
    );
    return res;
  } catch (err) {
    console.log("multicall  err", err);
  }
};

export default multicall;
