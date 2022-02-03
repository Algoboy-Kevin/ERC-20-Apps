import { ContractInterface, ethers } from "ethers";
import { applyDecimals } from "./ethereumAPI";

const importToken = async (address:string, contractAbi:ContractInterface, provider: any, deployer:string) => {

  const importedToken = new ethers.Contract(address, contractAbi, provider);
  const name = await importedToken.name();
  const symbol = await importedToken.symbol();
  const totalSupply = await importedToken.totalSupply();
  const decimals = await importedToken.decimals();
  const currentBalance = await importedToken.balanceOf(deployer);

  const updatedData = [
    address,
    name,
    symbol,
    applyDecimals(+totalSupply, +decimals),
    decimals,
    applyDecimals(+currentBalance, +decimals)
  ]

  console.log(updatedData)

  return updatedData;
}

export default importToken