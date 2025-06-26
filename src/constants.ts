export const OsmosisChainInfo = {
  // Chain-id of the Osmosis chain.
  chainId: "qubetics_9030-1",
  // The name of the chain to be displayed to the user.
  chainName: "Qubetics",
  // RPC endpoint of the chain. In this case we are using blockapsis, as it's accepts connections from any host currently. No Cors limitations.
  rpc: "https://tendermint.qubetics.com/",
  // REST endpoint of the chain.
  rest: "https://swagger.qubetics.com",
  // Staking coin information
  stakeCurrency: {
    // Coin denomination to be displayed to the user.
    coinDenom: "tics",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: "tics",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 18,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  },
  // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
  // The 'stake' button in Keplr extension will link to the webpage.
  // walletUrlForStaking: "",
  // The BIP44 path.
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 60,
  },

  // Bech32 configuration to show the address to user.
  // This field is the interface of
  // {
  //   bech32PrefixAccAddr: string;
  //   bech32PrefixAccPub: string;
  //   bech32PrefixValAddr: string;
  //   bech32PrefixValPub: string;
  //   bech32PrefixConsAddr: string;
  //   bech32PrefixConsPub: string;
  // }
  bech32Config: {
    bech32PrefixAccAddr: "qubetics",
    bech32PrefixAccPub: "qubeticspub",
    bech32PrefixValAddr: "qubeticsvaloper",
    bech32PrefixValPub: "qubeticsvaloperpub",
    bech32PrefixConsAddr: "qubeticsvalcons",
    bech32PrefixConsPub: "qubeticsvalconspub",
  },
  // List of all coin/tokens used in this chain.
  currencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "TICS",
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: "tics",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 18,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: "TICS",
      coinMinimalDenom: "tics",
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 18,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
      // (Optional) This is used to set the fee of the transaction.
      // If this field is not provided and suggesting chain is not natively integrated, Keplr extension will set the Keplr default gas price (low: 0.01, average: 0.025, high: 0.04).
      // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
      // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
      gasPriceStep: {
        low: 80000000000,
        average: 80000000000,
        high: 80000000000,
      },
    },
  ],
};
