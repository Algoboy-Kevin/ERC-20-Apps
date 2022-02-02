import { ErrorIcon, SuccessIcon } from "./SVGIcons";

export enum AlertType {
  DEFAULT = "DEFAULT",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

const Alert = (props:{type:AlertType, message:string, onClick?:any}) => {
  let type=props.type

  switch (type) {
    case "DEFAULT":
      return (
        <></>
      )
    case "ERROR":
      return (
        <div className="alert alert-error" onClick={props.onClick}>
          <div className="flex-1">
            <ErrorIcon className="h-6 w-6 mr-4"/>
            <label>{props.message}</label>
          </div>
        </div>
      )
    case "SUCCESS":
      return (
        <div className="alert alert-success" onClick={props.onClick}>
          <div className="flex-1">
            <SuccessIcon className="h-6 w-6 mr-4"/>
            <label>{props.message}</label>
          </div>
        </div>
      )
    default:
      return (
        <>Test</>
      )
  }
}

export default Alert