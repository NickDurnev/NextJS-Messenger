import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name length should be at least 3 characters")
    .max(20, "Name cannot exceed more than 20 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(16, "Password cannot exceed more than 16 characters"),
  // .matches(
  //   /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].**$/,
  //   "Need one special character"
  // ),
  cpassword: Yup.string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(16, "Password cannot exceed more than 16 characters")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  email: Yup.string().email().required("Email is required"),
});

export default formSchema;
