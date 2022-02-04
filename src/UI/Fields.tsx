import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { applyDecimals } from "../utils/ethereumAPI";
import { ErrorMessage } from "formik";


export const TextField = ( { ...props }:any ) => {
  const [field, meta] = useField(props);
  return (
    <div className={`form-control `}>
      <label htmlFor={field.name} className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input 
        className={`relative input input-bordered ${meta.touched && meta.error &&   "input-error"} ${meta.touched && !meta.error && "input-success"}`}
        {...field} {...props}
        autoComplete="off"
      />
      <label className="text-xs label text-error">
        <ErrorMessage className="" name={field.name} />
      </label>
    </div>
  )
}

export const RawValueField = ( { ...props }:any ) => {

  const {
    values: { initialSupply, decimals }, 
    touched, 
    setFieldValue,
  } = useFormikContext<any>();

  const [field, meta] = useField(props);

  useEffect(() => {
    setFieldValue(field.name, applyDecimals(+initialSupply,+decimals,true))
  }, [initialSupply, decimals, touched.initialSupply, touched.decimals, setFieldValue, field.name])

  return (
    <div className={`form-control `}>
      <label htmlFor={field.name} className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input 
        className={`relative input input-bordered ${meta.touched && meta.error &&   "input-error"} ${meta.touched && !meta.error && "input-success"}`}
        {...field} {...props}
        autoComplete="off"
      />
      <label className="text-xs label text-error">
        <ErrorMessage className="" name={field.name} />
      </label>
    </div>
  )
}