// validationSchema.js
import * as Yup from "yup";

export const studentValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  department: Yup.string().required("Department is required"),
});
