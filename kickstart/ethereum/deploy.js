const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "destroy tiger please stove express supply good asthma digital sibling refuse unhappy",
  "https://rinkeby.infura.io/v3/e1e1da44f01a444787dcaae0e533817d"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });

  // 0x714a172980cE0FccFd6b6f068E34CE5C5609CE0b
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();