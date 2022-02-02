import { IconMenu } from "../UI/SVGIcons"
import ERC20App from "./ERC20/ERC20App"

const AppAuthenticated = () => {
  const MenuItem = () => {
    return(
    <div className="drawer-side shadow-lg">
      <label htmlFor="my-drawer-2" className="drawer-overlay backdrop-blur-sm" />
      <label  htmlFor="my-drawer-2" className="backdrop-blur-sm">
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content h-full  ">
          <li>
            <a>ERC20</a>
          </li> 
          <li>
            <a>Test</a>
          </li>
        </ul>
      </label>
    </div>
    )
  }

  const DrawerContent = () => {
    return(
      <section className="flex flex-col items-stretch justify-content drawer-content w-full  relative">
        <nav className="left-0 lg:left-80 right-0 bg-base-100 fixed shadow-md p-2 h-content flex items-center ">
          <label htmlFor="my-drawer-2" className="btn btn-sm btn-ghost drawer-button lg:invisible"><IconMenu className="h-6 w-6"/></label>
          <h1 className="grow text-center mr-16 font-light">ERC20 Token Apps</h1>
        </nav>
        <div className="max-w-6xl w-full mx-auto px-10 mt-20 h-full">
          <ERC20App />
        </div> 
        
      </section>
    )
  }

  return (
    <div className="rounded-lg bg-base-200 drawer drawer-mobile min-h-screen">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <DrawerContent/>
    <MenuItem />
  </div>
  )
}

export default AppAuthenticated;