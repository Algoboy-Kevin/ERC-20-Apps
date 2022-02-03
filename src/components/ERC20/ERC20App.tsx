import ERC20Create from "./ERC20Create";
import ERC20MainMenu from "./ERC20MainMenu";
import { useRecoilState } from "recoil";
import ERC20TokenInfo from "./ERC20TokenInfo";
import { AppState } from "../../store";
import { Menu } from "../../interface";
import NewForm from "../../UI/newInputForm";

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
  <div className="flex flex-col items-stretch w-full h-full gap-4">
      {appState.menu !== Menu.MAIN && <BackButton/>}
      {appState.menu == Menu.MAIN && <ERC20MainMenu onClickCreate={onClickCreate}/>}
      {appState.menu == Menu.CREATE && <NewForm />}
      {appState.menu == Menu.IMPORT && <ERC20TokenInfo />}
    </div>
  )
}

export default ERC20App;