import ERC20Create from "./ERC20Create";
import ERC20MainMenu from "./ERC20MainMenu";
import { useRecoilState } from "recoil";
import ERC20TokenInfo from "./ERC20TokenInfo";
import { AppState } from "../../store";
import { Menu } from "../../interface";
import ERC20View from "./ERC20View";
import { Outlet, Routes, Route } from "react-router-dom";

const MainMenu = () => {
  const [appState, setAppState] = useRecoilState(AppState);

  const onClickCreate = () => {
    setAppState({...appState, menu: Menu.CREATE})
  }

  const BackButton = () => {
    return(
      <div>
        <a className="link link-hover" onClick={() => {setAppState({...appState, menu: Menu.MAIN})}}>
          Back
        </a>
      </div>
    )
  }

  return (
  <div className="flex flex-col items-stretch w-full h-full gap-4">
    <Outlet />
      {appState.menu !== Menu.MAIN && <BackButton/>}
      {appState.menu == Menu.MAIN && <ERC20MainMenu onClickCreate={onClickCreate}/>}
      {appState.menu == Menu.CREATE && <ERC20Create />}
      {appState.menu == Menu.IMPORT && <ERC20TokenInfo />}
      {appState.menu == Menu.VIEW && <ERC20View />}
    </div>
  )
}

const ERC20App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu/>}/>
      <Route path="create" element={<ERC20Create/>}/>
      <Route path="import" element={<ERC20View/>}/>
    </Routes>
  )
}



export default ERC20App;