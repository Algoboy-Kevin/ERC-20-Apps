import * as Yup from "yup"

export const validate = Yup.object({
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
