import { useState } from "react";
import ERC20Create from "./ERC20Create";
import ERC20MainMenu from "./ERC20MainMenu";
import { MenuState } from "../../store";
import { useRecoilState } from "recoil";
import ERC20TokenInfo from "./ERC20TokenInfo";

const Menu = {
  Main: 0,
  Create: 1,
  Import: 2
}

const ERC20App = () => {
  const [menuState, setMenuState] = useRecoilState(MenuState)

  const onClickCreate = () => {
    setMenuState(Menu.Create)
  }

  const BackButton = () => {
    return(
      <div>
         <a className="link link-hover" onClick={() => {setMenuState(Menu.Main)}}>
        Back
      </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 items-stretch w-full">
      {menuState !== Menu.Main && <BackButton/>}
      {menuState == Menu.Main && <ERC20MainMenu onClickCreate={onClickCreate}/>}
      {menuState == Menu.Create && <ERC20Create />}
      {menuState == Menu.Import && <ERC20TokenInfo />}
    </div>
  )
}

export default ERC20App;