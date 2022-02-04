import { ethers } from "ethers";
import ERC20Token from "../components/ERC20/ERC20Token";

const createToken = async (input:any, signer:any) => {

  const factory = new ethers.ContractFactory(
    ERC20Token.abi, 
    ERC20Token.bytecode, 
    signer
  )

  const contract = await factory.deploy(
    input.name,
    input.symbol,
    input.initialSupplyRaw,
  )

  const result = await contract.deployTransaction.wait();
  return result;
}

export default createToken