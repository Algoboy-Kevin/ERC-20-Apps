import { Link } from "react-router-dom";

const ERC20MainMenu = (props:{onClickCreate:any}) => {
  return (
    <div className="h-full hero bg-base-200 ">
      <div className="text-center hero-content">
        <div className="flex flex-col items-center max-w-md gap-4">
          <h1 className="text-5xl font-black tracking-tight">
            Hello World
          </h1> 
          <p className="mb-5">
            This application enables you to create your own ERC20 and view your deployment result. 
          </p>
          <Link to="/create"><button className=" btn btn-primary">Create Token</button>
         </Link> 
          
        </div>
      </div>
    </div>
  )
}

export default ERC20MainMenu;