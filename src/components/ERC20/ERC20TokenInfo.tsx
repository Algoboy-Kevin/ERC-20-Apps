import { useRecoilState } from "recoil"
import { AppState, TokenDataState } from "../../store"
import { AlertType } from "../../UI/Alert"
import Alert from "../../UI/Alert"

const ERC20TokenInfo = () => {
  const [appState, setAppState] = useRecoilState(AppState)

  const Table = () => {
    const [data, setData] = useRecoilState(TokenDataState)
    

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
              <td >{data[0]}</td> 
            </tr>
            <tr className="hover">
              <th>Name</th> 
              <td>{data[1]}</td> 
            </tr>
            <tr className="hover">
              <th>Symbol</th> 
              <td>{data[2]}</td> 
            </tr>
            <tr className="hover">
              <th>Total Supply</th> 
              <td>{data[3]}</td> 
            </tr>
            <tr className="hover">
              <th>Decimals</th> 
              <td>{data[4]}</td> 
            </tr>
            <tr className="hover">
              <th>Current Balance</th> 
              <td>{data[5]}</td> 
            </tr>
          </tbody> 
          <tfoot>
        
          </tfoot>
        </table>
      </div>
    )
  }

  return (
    <div className="w-full ">
     <div className="card">
        <div className="flex flex-col items-stretch gap-10 p-5 card-body card-boy bg-base-100">
          <h1 className="col-span-2 text-4xl font-black tracking-tight">
            Token Info
          </h1>
          <Table />
          <Alert 
            type={appState.alert} 
            message={appState.message} />
        </div>
      </div>
    </div>


  )
}

export default ERC20TokenInfo;