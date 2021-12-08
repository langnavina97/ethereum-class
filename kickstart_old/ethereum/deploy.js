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

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  // 0xb3caBEF0D8D792496F2f18fDb380A08cCfb9411f
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
