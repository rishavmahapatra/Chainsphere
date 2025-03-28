import { InjectedConnector } from "@web3-react/injected-connector";
// [1, 3, 4, 5, 42, 56, 97, 1287, 361, 365, 43114, 43113]
export const injected = new InjectedConnector({
  supportedChainIds: [
    43113, 137, 4, 5, 42, 56, 97, 1287, 361, 365, 43114, 80001, 1, 9731, 1001,
    5656,
  ],
});
