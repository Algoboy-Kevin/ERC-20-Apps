import { useEffect, useState } from "react"
import {themeChange} from 'theme-change'
import { ethers } from "ethers";
import AppAuthenticated from "./components/AppAuthenticated";
import NotAuthenticated from "./components/NotAutenticated";
import { useRecoilState } from "recoil";
import { WalletState } from "./store";



function App() {
  const [walletState, setWalletState] = useRecoilState(WalletState);
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState("waiting for connection with wallet")
  const [signerAddress, setSignerAddress] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      const sleep = (m:number) => new Promise(r => setTimeout(r, m))

      setWalletState({
        ...walletState, 
        message: "Checking wallet connection", 
      })
      await sleep(1000);


      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        await provider.send("eth_requestAccounts",[])
        const signer = provider.getSigner()
        const address = await signer.getAddress();

        setWalletState({
          ...walletState, 
          message: `Wallet is connected with address ${address}`, 
          address: address
        })
        await sleep(1000);

        setWalletState({
          ...walletState, 
          connected: true, 
        })
        

      } catch (e: any) {
        setWalletState({
          ...walletState, 
          connected: false, 
          message: "Wallet connection denied, reload the page to try again.", 
          address: ""
        })
      }
    };
    connectWallet();
  }, [])
  
  useEffect(() => themeChange(false), [])
  
  return (
    <div className="min-h-screen bg-base-200">
      { window.ethereum ?
        (walletState.connected ?
          <AppAuthenticated />
          : <NotAuthenticated message={walletState.message}/>)
        : <NotAuthenticated message={walletState.message}/>
      }
    </div>
  )
}

export default App
