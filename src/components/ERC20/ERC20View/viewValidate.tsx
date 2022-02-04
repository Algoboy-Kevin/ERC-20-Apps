import * as Yup from "yup"

export const validate = Yup.object({
  address: Yup.string()
    .matches(RegExp(`^0x[a-fA-F0-9]{40}$`), "Invalid address")      
    .required("Address name is required"),
})
