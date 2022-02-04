import { IconMenu } from "../UI/SVGIcons"
import ERC20App from "./ERC20/ERC20App"
import { useRecoilState } from "recoil";
import { AppState } from "../store";
import { Menu } from "../interface";
import { Link } from "react-router-dom";

const AppAuthenticated = () => {
  const [appState, setAppState] = useRecoilState(AppState);


  const changeMenu = (menu:number) => {
    setAppState({...appState, menu: {menu}})
  }
  
  const MenuItem = () => {
    
    return(
    <div className="shadow-lg drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay backdrop-blur-sm" />
      <label  htmlFor="my-drawer-2" className="backdrop-blur-sm">
        <ul className="h-full p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content ">
          <li>
            <Link to="/create">Create Token</Link>
          </li> 
          <li>
            <Link to="/import">Import Token</Link>
          </li>
        </ul>
      </label>
    </div>
    )
  }

  const DrawerContent = () => {
    return(
      <section className="relative flex flex-col items-stretch w-full justify-content drawer-content">
        <nav className="fixed left-0 right-0 z-10 flex items-center p-2 shadow-md lg:left-80 bg-base-100 h-content">
          <label htmlFor="my-drawer-2" className="btn btn-sm btn-ghost drawer-button lg:invisible">
            <IconMenu className="w-6 h-6"/>
          </label>
          <h1 className="mr-16 font-light text-center grow">
            ERC20 Token Apps
          </h1>
        </nav>
        <div className="w-full h-screen max-w-6xl px-10 pt-20 mx-auto">
          <ERC20App />
        </div> 
        
      </section>
    )
  }

  return (
    <div className="min-h-screen rounded-lg bg-base-200 drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <DrawerContent/>
    <MenuItem />
  </div>
  )
}

export default AppAuthenticated;