import { useEffect, useState } from "react"
import {themeChange} from 'theme-change'
import { ethers } from "ethers";
import AppAuthenticated from "./components/AppAuthenticated";



function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState("waiting for connection with wallet")
  const [signerAddress, setSignerAddress] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      console.log("Checking wallet connection")
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        await provider.send("eth_requestAccounts",[])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setSignerAddress(address)
        console.log(`Wallet is connected with address ${address}`)

      } catch (e: any) {
        const errorMessage = "Wallet connection denied, reload the page to try again."
        console.log(errorMessage)
        setInstruction(errorMessage)
      }
      setInstruction("");
      setWalletConnected(true);
    };
    connectWallet();
    console.log(window.ethereum)
  }, [])
  
  useEffect(() => themeChange(false), [])
  
  return (
    <div className="min-h-screen bg-base-200">
      { window.ethereum ?
        (walletConnected ?
          <AppAuthenticated />
          : instruction)
        : "Metamask or other EIP-1102 / EIP-1193 compliant wallet not found."
      }
    </div>
  )
}

export default App
