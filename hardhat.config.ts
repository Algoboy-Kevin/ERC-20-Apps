import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});


const config: HardhatUserConfig = {
  solidity: "0.8.3",
  paths: {
    sources: "./src/solidity/contracts",
    tests: "./src/solidity/test",
    cache: "./src/solidity/cache",
    artifacts: "./src/solidity/artifacts"
  }
}

export default config;