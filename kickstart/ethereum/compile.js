const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); //deletes the folder

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // create build folder if it doesn't exist

// output contains the bytecode and interface for each contract object
for (let contract in output) {
  // converts it into a json
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"), // creates json file into build folder
    output[contract]
  );
}
