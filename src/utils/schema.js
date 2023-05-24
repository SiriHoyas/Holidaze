import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers and underscore")
    .required(),
  email: yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, "Please enter a valid email")
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
  venueManager: yup.boolean(),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, { message: "Please enter a valid email" })
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
});

// Yups .url() is not allowing regular URLs, so i made a slightly wide regex to try to validate in some way,
// but it is not a perfect solution.

export const uploadProfileImageSchema = yup.object().shape({
  avatar: yup.string().url("Please enter a valid URL"),
});
