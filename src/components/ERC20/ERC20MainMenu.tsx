import { Button } from '@windmill/react-ui'
import { Badge } from '@windmill/react-ui'

const ERC20MainMenu = (props:{onClickCreate:any}) => {
  return (
    <div className="h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
                Main Menu
              </h1> 
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p> 
          <Button className=" btn" size="larger" onClick={() => props.onClickCreate()}>Create Token</Button>
          <Badge>primary</Badge>
          <Badge type="neutral">neutral</Badge>
          <Badge type="success">success</Badge>
          <Badge type="danger">danger</Badge>
          <Badge type="warning">warning</Badge>
        </div>
      </div>
    </div>
  )
}

export default ERC20MainMenu;