const ERC20MainMenu = (props:{onClickCreate:any}) => {
  return (
    <div className="hero h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
                Main Menu
              </h1> 
          <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p> 
          <button className="btn" onClick={() => props.onClickCreate()}>Create Token</button>
        </div>
      </div>
    </div>
  )
}

export default ERC20MainMenu;