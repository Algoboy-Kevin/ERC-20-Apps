interface inputForm {
  className?: string,
  title: string,
  type: string,
  placeholder: string,
  onChange: any,
  value?: any,
  defaultValue?: any,
  max?:number,
  min?:number,
  disabled?:boolean,
  tokenSymbol?:string,
}


export const Input = (props:inputForm) => {
  return (
    <div className={`form-control ${props.className}`}>
      <label className="label">
        <span className="label-text">
          {props.title}
        </span>
      </label> 
      <input 
        defaultValue={props.defaultValue} 
        type={props.type} 
        value={props.value} 
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        className="input input-bordered" 
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div> 
  )
}

export const InputNumber = (props:inputForm) => {
  return(
    <div className={`form-control ${props.className}`}>
      <label className="label">
        <span className="label-text">
          {props.title}
        </span>
      </label> 
      <div className="relative">
        <label className="input-group input-group-sm">
          <input 
            id="Initial Supply" 
            defaultValue={props.defaultValue} 
            value={props.value} 
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={props.onChange} 
            className="w-full input input-bordered"/> 
          <span>
            {props.tokenSymbol}
          </span>
        </label>
      </div>
    </div> 
  )
}