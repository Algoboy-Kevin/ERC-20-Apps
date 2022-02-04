import { Formik, Form } from "formik";
import { TextField } from "../../../UI/Fields";
import { ViewingState, AppState } from "../../../store";
import { useRecoilState } from "recoil";
import { validate } from "./viewValidate";
import Alert, { AlertType } from "../../../UI/Alert";
import * as Type from "../../../interface";
import importToken from "../../../utils/importToken";
import { ethers } from "ethers";

const Table = (props: {data:any[]}) => {

  if (props.data.length === 0) {
    return (<></>);
  }

  return (
    <div className="overflow-x-auto ">
      <table className="table w-full table-compact">
        <thead>
          <tr >
            <th>Token</th> 
            <th>Value</th> 
          </tr>
        </thead> 
        <tbody>
          <tr className="hover">
            <th>Address</th> 
            <td >{props.data[0]}</td> 
          </tr>
          <tr className="hover">
            <th>Name</th> 
            <td>{props.data[1]}</td> 
          </tr>
          <tr className="hover">
            <th>Symbol</th> 
            <td>{props.data[2]}</td> 
          </tr>
          <tr className="hover">
            <th>Total Supply</th> 
            <td>{props.data[3]}</td> 
          </tr>
          <tr className="hover">
            <th>Decimals</th> 
            <td>{props.data[4]}</td> 
          </tr>
          <tr className="hover">
            <th>Current Balance</th> 
            <td>{props.data[5]}</td> 
          </tr>
        </tbody> 
        <tfoot>
        </tfoot>
      </table>
    </div>
  )
}

const initialValues = {
  address: "",
  tokenData: []
}



const ERC20View = () => {
  const [importedData, setImportedData] = useRecoilState(ViewingState)
  const [appState, setAppState] = useRecoilState(AppState)

  const submitHandler = async (inputAddress:string) => {
    
    setAppState({...appState, loading:true})

    try {
      const provider= new ethers.providers.Web3Provider(window.ethereum, "any");
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const result = await importToken(inputAddress, provider, address);
      setImportedData({address: inputAddress, tokenData: result});

      setAppState({
        ...appState, 
        loading:false,
        message: `Contract is successfully imported`, 
        alert: AlertType.SUCCESS
      });
      
    } catch (e:any) {
      
      setAppState({
        ...appState, 
        loading:false,
        message: e.message, 
        alert: AlertType.ERROR
      });
    };
  };

  const resetHandler = () => {
    console.log(importedData)
    setImportedData({address: "", tokenData: []})
    setAppState({
      ...appState, 
      alert: AlertType.DEFAULT
      })
  }

  const Buttons = () => {
    const ButtonSubmit = <>
      <button 
        className="btn btn-primary" 
        type="submit"
      >
        Import Token
      </button>
      <button 
        className="btn" 
        type="reset" 
        onClick={() => {resetHandler()}} 
      >
        Reset
      </button>
    </>

    const ButtonLoading = <button 
      className="btn btn-disabled" 
      type="button"
    >
      Loading . . . 
    </button>

    return (
      <div className="flex self-end gap-4">
        {appState.loading && ButtonLoading}
        {!appState.loading &&  ButtonSubmit}
      </div>
    )
  }

  return (
    <div className="shadow-lg card">
      <div className="gap-4 card-body bg-base-100">
      <h1 className="text-4xl font-black tracking-tight ">Import Token</h1>
      <Formik 
      initialValues={initialValues} 
      validationSchema={validate} 
      onSubmit={values=>{submitHandler(values.address)}}
      onReset={() => resetHandler}
    >
      {formik => (
        <div className="flex flex-col gap-4">
          <Form className="flex flex-col gap-4">
            <TextField label="Address" name="address" type="text"/>
            <Alert 
            type={appState.alert} 
            message={appState.message} 
            onClick={() => {setAppState({...appState,alert: AlertType.DEFAULT})}} />
            <Buttons />
          </Form>
        </div>
      )}
      </Formik>
      <Table data={importedData.tokenData} />

      </div>
      
      </div>
  )
}

export default ERC20View;