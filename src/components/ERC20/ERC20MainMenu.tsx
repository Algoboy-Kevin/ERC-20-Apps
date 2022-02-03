const ERC20MainMenu = (props:{onClickCreate:any}) => {
  return (
    <div className="h-full hero bg-base-200 ">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
                Welcome to ERC20 Token Apps
              </h1> 
              <p className="mb-5">
                This application enables you to create your own ERC20 and view your deployment result. 
              </p> 
          <button className=" btn" onClick={() => props.onClickCreate()}>Create Token</button>
         
        </div>
      </div>
    </div>
  )
}

export default ERC20MainMenu;