import { ethers } from "ethers";
import { applyDecimals } from "./ethereumAPI";
import ERC20Token from "../components/ERC20/ERC20Token";

const importToken = async (address:string, provider: any, deployer:string) => {

  const importedToken = new ethers.Contract(address, ERC20Token.abi, provider);
  const name = await importedToken.name();
  const symbol = await importedToken.symbol();
  const totalSupply = await importedToken.totalSupply();
  const decimals = await importedToken.decimals();
  const currentBalance = await importedToken.balanceOf(deployer);

  const result = [
    address,
    name,
    symbol,
    applyDecimals(+totalSupply, +decimals),
    decimals,
    applyDecimals(+currentBalance, +decimals)
  ]
  
  return result;
}

export default importToken