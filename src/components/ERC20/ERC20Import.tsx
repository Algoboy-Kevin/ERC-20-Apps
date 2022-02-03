import React from "react";
import { useRecoilState } from "recoil";
import {  ethers } from "ethers";
import { applyDecimals, toDecimal } from "../../utils/ethereumAPI";
import ERC20Token from "./ERC20Token";
import { AppState, InputState, TokenDataState } from "../../store";
import { ImportToken, Input, InputNumber } from "../../UI/InputForm"
import Alert, { AlertType } from "../../UI/Alert";
import { Menu } from "../../interface";
import importToken from "../../utils/importToken";


const ERC20Create = () => {
  const [appState, setAppState] = useRecoilState(AppState);
  const [tokenData, setTokenData] = useRecoilState(TokenDataState);
  const [inputState, setInputState] = useRecoilState(InputState);

  const provider= new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer= provider.getSigner()
  
  let updatedState, deployer:string;

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
      case "address" :
        updatedState = {
          ...inputState,
          address: event.target.value
        }
        setInputState(updatedState)
        break;
      default:
        console.log("ERROR")
        break;
    };
  }
  
  const createToken = async () => {

    let result!:ethers.providers.TransactionReceipt;
    setAppState({...appState, loading:true});
    
    try {
      deployer = await signer.getAddress();
      console.log(deployer);

      const factory = new ethers.ContractFactory(
        ERC20Token.abi,
        ERC20Token.bytecode,
        signer
      );

      const contract:ethers.Contract = await factory
        .deploy(
          inputState.name, 
          inputState.symbol, 
          inputState.initialSupplyRaw,
      );

      result = await contract.deployTransaction.wait();
      await ImportHandler(result.contractAddress)
      console.log(tokenData);

      console.log(`Token sucessfully deployed at: ${result.contractAddress}`)
      setAppState({
        ...appState, 
        loading:false,
        message: `Token sucessfully deployed at: ${result.contractAddress}`, 
        alert: AlertType.SUCCESS
      });
    } 

    catch (e:any) {
      console.log(e.message)
      setAppState({
        ...appState, 
        loading:false, 
        message: e.message, 
        alert: AlertType.ERROR
      });
    }

  }

  const SubmitButton = () => {
    const buttonEnable = <button className="w-full btn btn-outline" onClick={createToken}>Create Token</button>
    const buttonLoading = <button className="w-full btn btn-disabled ">LOADING...</button>
    const buttonImport = <button className="w-full btn " onClick={() => {setAppState({...appState, menu: Menu.IMPORT, alert: AlertType.DEFAULT})}}>Import Token</button>

    return (
      <div className="w-full">
        {appState.loading ? 
          buttonLoading : appState.alert === AlertType.SUCCESS ?
            buttonImport : buttonEnable 
        }
      </div>
    )
  }

  const ImportHandler = async (address: string) => {
    console.log("Import triggered")
    let data;

    try {
      setAppState({...appState, loading:true});
      deployer = await signer.getAddress()
      data = await importToken(address, ERC20Token.abi, provider, deployer)
      setTokenData(data);

      setAppState({
        ...appState, 
        loading:false,
        menu: Menu.IMPORT,
        message: `Contract is successfully imported (address: ${address})`, 
        alert: AlertType.DEFAULT
      });

    }

    catch (e:any) {
      setAppState({
        ...appState, 
        loading:false,
        message: e.message,
        menu: Menu.CREATE,
        alert: AlertType.ERROR
      });
    }
  }

  return (
    <div className="max-w-6xl card">
      <div className="flex flex-col gap-4 shadow card-body bg-base-100">
        <div className="flex flex-col gap-5"> 
        <div className="grid items-end grid-cols-2 gap-4 text-lg font-bold">
          <h1 className="col-span-2 text-4xl font-black tracking-tight">
            Import Token
          </h1>
          <ImportToken
            title="Or Import Token at"
            placeholder="ERC20Token Address"
            onChange ={(e:React.ChangeEvent<HTMLInputElement>) => onChangeHandler("address", e)}
            onClick={async() => await ImportHandler(inputState.address)} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Alert 
          type={appState.alert} 
          message={appState.message}
          onClick={() => setAppState({
            ...appState, 
            alert: AlertType.DEFAULT})} />
      </div>
    </div>
  </div>
  )
}

export default ERC20Create