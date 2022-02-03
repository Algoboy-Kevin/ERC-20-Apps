import ERC20Create from "./ERC20Create";
import ERC20MainMenu from "./ERC20MainMenu";
import { useRecoilState } from "recoil";
import ERC20TokenInfo from "./ERC20TokenInfo";
import { AppState } from "../../store";
import { Menu } from "../../interface";

const ERC20App = () => {
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
  <div className="flex flex-col gap-4 items-stretch w-full h-full">
      {appState.menu !== Menu.MAIN && <BackButton/>}
      {appState.menu == Menu.MAIN && <ERC20MainMenu onClickCreate={onClickCreate}/>}
      {appState.menu == Menu.CREATE && <ERC20Create />}
      {appState.menu == Menu.IMPORT && <ERC20TokenInfo />}
    </div>
  )
}

export default ERC20App;