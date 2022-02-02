import { useRecoilState, useRecoilValue } from "recoil"
import { TokenDataState } from "../../store"

const ERC20TokenInfo = () => {

  const Table = () => {
    const [data, setData] = useRecoilState(TokenDataState)

    return (
      <div className="overflow-x-auto  ">
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
              <td >{data[0].value}</td> 
            </tr>
            <tr className="hover">
              <th>Name</th> 
              <td>{data[1].value}</td> 
            </tr>
            <tr className="hover">
              <th>Symbol</th> 
              <td>{data[2].value}</td> 
            </tr>
            <tr className="hover">
              <th>Total Supply</th> 
              <td>{data[3].value}</td> 
            </tr>
            <tr className="hover">
              <th>Decimals</th> 
              <td>{data[4].value}</td> 
            </tr>
            <tr className="hover">
              <th>Current Balance</th> 
              <td>{data[5].value}</td> 
            </tr>
          </tbody> 
          <tfoot>
        
          </tfoot>
        </table>
      </div>
    )
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="card-boy  flex flex-col gap-10 items-stretch bg-base-100 p-5">
        <h1 className="col-span-2 text-4xl font-black tracking-tight">Token Info</h1>
        <Table />
      </div>
    </div>


  )
}

export default ERC20TokenInfo;