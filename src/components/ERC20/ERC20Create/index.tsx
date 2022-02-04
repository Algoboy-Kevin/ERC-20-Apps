import { Formik, Form } from "formik"
import { useRecoilState } from "recoil";
import { ethers } from "ethers";
import { TextField, RawValueField } from "../../../UI/Fields";
import {validate} from "./createValidate";
import { AppState, TokenDataState, InputState } from "../../../store";
import { InputTokenType, Menu } from "../../../interface";
import createToken from "../../../utils/createToken";
import Alert, { AlertType } from "../../../UI/Alert";
import importToken from "../../../utils/importToken";
import ERC20TokenInfo from "../ERC20TokenInfo";
import { Link } from "react-router-dom";

const NewForm = () => {

  const [appState, setAppState] = useRecoilState(AppState);
  const [tokenData, setTokenData] = useRecoilState(TokenDataState);
  const [inputState, setInputState] = useRecoilState(InputState);

  const submitHandler = async (input: InputTokenType) => {

    setInputState(input)
    setAppState({...appState, loading:true})

    try {
      const provider= new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner()
      const result = await createToken(inputState,signer)
      const importedData = await importToken(result.contractAddress, provider, result.from)
      setTokenData(importedData)

      setAppState({
        ...appState, 
        loading:false,
        message: `Contract is successfully deployed at ${result.contractAddress} with signer ${result.from})`, 
        alert: AlertType.SUCCESS
      });

    } catch (e:any) {
      setAppState({
        ...appState, 
        loading:false,
        message: e.message, 
        alert: AlertType.ERROR
      });
    }
  }

  const Buttons = () => {
    const ButtonSubmit = <>
      <button className="btn btn-primary" type="submit">Deploy Token</button>
      <button 
        className="btn" 
        type="reset" 
        onClick={() => {setAppState({
        ...appState, 
        alert: AlertType.DEFAULT
        })}
      }>Reset</button>
    </>

    const ButtonImport = <button 
      className="btn btn-primary" 
      type="button" 
      onClick={() => {setAppState({
        ...appState, 
        menu:Menu.IMPORT,
        alert: AlertType.DEFAULT
        })}
      }
    >
      Import Token
    </button>

    const ButtonLoading = <button 
      className="btn btn-disabled" 
      type="button"
    >
      Loading . . . 
    </button>

    return (
      <div className="flex self-end gap-4">
        {appState.loading && ButtonLoading}
        {(!appState.loading && appState.alert !== AlertType.SUCCESS) && ButtonSubmit}
        {(!appState.loading && appState.alert === AlertType.SUCCESS) && ButtonImport}
      </div>
    )
  }
  
  return (
    <div className="mt-10 shadow-lg card">
      <div className="flex flex-col gap-4 card-body bg-base-100">
        <Link to="/" className="link" onClick={() => {setAppState({...appState,alert:AlertType.DEFAULT})}}>Back</Link>
        {appState.alert === AlertType.SUCCESS && <ERC20TokenInfo/>}
        {appState.alert !== AlertType.SUCCESS && 
        <Formik 
        initialValues={inputState} 
        validationSchema={validate} 
        onSubmit={values=>{submitHandler(values)}}
        >
          {formik => (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-black tracking-tight">Smart Contract</h1>
              <Form className="grid grid-cols-2 gap-4">
                <TextField label="Token Name" name="name" type="text"/>
                <TextField label="Symbol" name="symbol" type="text"/>
                <TextField label="Initial Supply" name="initialSupply" type="number"/>
                <TextField label="Decimals" name="decimals" type="number" max={20} min={1}/>
                <RawValueField label="Initial Supply" name="initialSupplyRaw" type="string" disabled={true}/> 
                <Buttons/>
              </Form>
              
            </div>
          )}
        </Formik>}
      </div>
    </div>

    
  )
}

export default NewForm

