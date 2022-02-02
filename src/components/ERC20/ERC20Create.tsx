import { useEffect, useState } from "react";
import applyDecimals from "../../utils/ethereumAPI";
import { toDecimal } from "../../utils/ethereumAPI";
import ERC20Token from "./ERC20Token";
import { ContractInterface, ethers, Signer } from "ethers";
import { useRecoilState } from "recoil";
import { InputState, LoadingState, MenuState, TokenDataState } from "../../store";
import { Input, InputNumber } from "../../UI/inputForm";
import Alert, { AlertType } from "../../UI/Alert";
import { Web3Provider } from "@ethersproject/providers";



const ERC20Create = () => {
  const [inputState, setInputState] = useRecoilState(InputState);
  const [isLoading, setIsLoading] = useRecoilState(LoadingState);
  const [alertState, setAlertState] = useState(AlertType.DEFAULT);
  const [menu, setMenu] = useRecoilState(MenuState)
  const [tokenData, setTokenData] = useRecoilState(TokenDataState)
  
  const [message, setMessage] = useState("");

  let updatedState;

  const ERC20Import = async (address:string, contractAbi:ContractInterface, provider:any, deployer:string) => {
    
    const token = new ethers.Contract(address,contractAbi, provider)
    console.log(token)
    const name = await token.name()
    const symbol = await token.symbol()
    const totalSupply = await token.totalSupply()
    const decimals = await token.decimals()
    const currentBalance = await token.balanceOf(deployer)
  
    const updatedData = [
      { ...tokenData[0], value: address },
      { ...tokenData[1], value: name },
      { ...tokenData[2], value: symbol },
      { ...tokenData[3], value: applyDecimals(+totalSupply, +decimals) },
      { ...tokenData[4], value: decimals },
      { ...tokenData[5], value: applyDecimals(+currentBalance, +decimals) },
    ]
    console.log(updatedData)
    setTokenData(updatedData)
  }

  const onChangeHandler = (
    data:string, 
    event: any) => {    
    switch (data) {
      case "name" :
        updatedState = {
          ...inputState,
          name: event.target.value
        }
        
        console.log(updatedState.name)
        setInputState(updatedState)
        break;
      case "symbol" :
        updatedState = {
          ...inputState,
          symbol: event.target.value.toLocaleUpperCase()
        }
        console.log(updatedState.symbol)
        setInputState(updatedState)
        break;
      case "initialSupply" :
        updatedState = {
          ...inputState,
          initialSupply: event.target.value
        }
        setInputState(updatedState)
        break;
      case "decimals" :
        updatedState = {
          ...inputState,
          decimals: event.target.value
        }
        console.log(updatedState.decimals)
        setInputState(updatedState)
        break;
      case "initialSupplyRaw" :
        updatedState = {
          ...inputState,
          initialSupplyRaw: event.target.value
        }
        setInputState(updatedState)
        break;
      default:
        console.log("ERROR")
        break;
    };
  }
  

  const createToken = async () => {
    setIsLoading(true);
    let contract:ethers.Contract;
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      const signer =  provider.getSigner()
      const deployer = await signer.getAddress()
      console.log(signer)
      console.log(deployer)

      const factory = new ethers.ContractFactory(
        ERC20Token.abi,
        ERC20Token.bytecode,
        signer
      )

      contract = await factory
        .deploy(
          inputState.name, 
          inputState.symbol, 
          inputState.initialSupplyRaw,
      )

      const result = await contract.deployTransaction.wait()


      setMessage(`Token sucessfully deployed at: ${result.contractAddress}`)
      console.log(`Token sucessfully deployed at: ${result.contractAddress}`)
      
      await ERC20Import(result.contractAddress, contract.interface, contract.provider, result.from)
      setAlertState(AlertType.SUCCESS)
    
    } catch (e:any) {
      setMessage(e.message);
      setAlertState(AlertType.ERROR)
      console.log(e)
    }
    setIsLoading(false);
  }

  const SubmitButton = () => {
    const buttonEnable = <button className="btn btn-outline w-full" onClick={createToken}>Create Token</button>

    const buttonLoading = <button className="btn w-full btn-disabled ">LOADING...</button>

    const buttonImport = <button className="btn w-full " onClick={() => {setMenu(2)}}>Import Token</button>

    return (
      <div className="w-full">
        {isLoading ? 
          buttonLoading : 
          alertState === AlertType.SUCCESS ?
            buttonImport : buttonEnable 
        }
      </div>
    )
  }

  return (
    <div className="card max-w-6xl">
    <div className="card-body flex flex-col gap-4 bg-base-100 shadow">
      <div className="flex flex-col gap-5"> 
      <div className="grid grid-cols-2 gap-4 text-lg font-bold items-end">
        <h1 className="col-span-2 text-4xl font-black tracking-tight">Create Token</h1>
        <Input 
          title="Name" 
          type="text"
          placeholder={inputState.name} 
          onChange ={(e:React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            onChangeHandler("name", e)}}
        />
        <Input 
          title="Symbol" 
          type="text"
          placeholder={inputState.symbol}
          onChange ={(e:React.ChangeEvent<HTMLInputElement>) => onChangeHandler("symbol", e)}
        />
        <InputNumber 
          title="Initial Supply"
          type="number"
          placeholder={inputState.initialSupply.toString()}
          tokenSymbol={inputState.symbol}
          defaultValue={applyDecimals(inputState.initialSupplyRaw,inputState.decimals)}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            onChangeHandler("initialSupply", e)}}
        />
        <Input 
          title="Decimals" 
          type="number"
          min={1}
          max={20}
          defaultValue={inputState.decimals}
          placeholder={inputState.decimals.toString()} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            onChangeHandler("decimals", e)}}
        />
        <Input 
          title="Initial supply (raw)" 
          type="number"
          placeholder={toDecimal(inputState.initialSupply,inputState.decimals)}
          value={toDecimal(inputState.initialSupply,inputState.decimals)}
          disabled={true}
          onChange ={(e:React.ChangeEvent<HTMLInputElement>) => onChangeHandler("initialSupplyRaw", e)}
        />
        <SubmitButton />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <Alert 
        type={alertState} 
        message={message} 
        onClick={() => {setAlertState(AlertType.DEFAULT)} }/>
    </div>
  </div>
  </div>
    
  )
}

export default ERC20Create