import { Formik, Form, useField, ErrorMessage, useFormikContext } from "formik"
import { applyDecimals, toDecimal } from "../utils/ethereumAPI"
import * as Yup from "yup";
import { useEffect } from "react";

const initialValues = {
  name: "",
  symbol: "",
  initialSupply: 1,
  decimals: 18,
  initialSupplyRaw: '1000000000000000000',
}

const TextField = ( { ...props }:any ) => {
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

const RawValueField = ( { ...props }:any ) => {

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

const NewForm = () => {
  const validate = Yup.object({
    name: Yup.string()
      .matches(RegExp(`^[_A-z]*((\\s)*[_A-z])*$`), "Only capitalize word ")      
      .min(5, "Must be 5 - 15 Characters or less")
      .max(15, "Must be 5 - 15 Characters or less")
      .required("Token name is required"),
    symbol: Yup.string()
      .matches(RegExp(`^[A-Z]{3,}$`), "Must be uppercase alphabetic")
      .min(3, "Must be 3 - 5 characters")
      .max(5, "Must be 3 - 5 characters")
      .uppercase("Must be uppercase")
      .required("Token symbol is required"),
    initialSupply: Yup.number()
      .integer("No decimals")
      .min(1,"Cannot be lower than one")
      .required("Initial supply is required"),
    decimals: Yup.number()
      .integer("Cannot be decimal")
      .min(1, "Value must be 1 - 20")
      .max(20, "Value must be 1 - 20")
      .required("Value is required"),
    initialSupplyRaw: Yup.string()
      .matches(RegExp(`^[1-9](\\d)*$`), "Invalid regex")
      .min(1, "Cannot be empty"),
  })

  const ConvertToRaw = (initialSupply: number, decimals: number) => {
    return applyDecimals(+initialSupply, decimals)
  }
  
  return (
    <Formik initialValues={initialValues} validationSchema={validate} onSubmit={values=>{console.log(values)}}>
      {formik => (
        <div >
          <h1>Smart Contract</h1>
          <Form className="grid grid-cols-2 gap-4">
            <TextField label="Token Name" name="name" type="text"/>
            <TextField label="Symbol" name="symbol" type="text"/>
            <TextField label="Initial Supply" name="initialSupply" type="number"/>
            <TextField label="Decimals" name="decimals" type="number" max={20} min={1}/>
            <RawValueField label="Initial Supply" name="initialSupplyRaw" type="string" disabled={true}/> 
            <div className="flex self-end gap-4">
              <button className="btn btn-primary " type="submit">Register</button>
              <button className="btn " type="reset">reset</button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default NewForm

