const NotAuthenticated = (props:{message: string}) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            ERC20 Dapps
          </h1> 
          <p className="mb-5">
            {props.message}
          </p> 
        </div>
      </div>
    </div>
  );
}

export default NotAuthenticated;