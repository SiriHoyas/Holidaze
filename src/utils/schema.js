import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers and underscore")
    .required(),
  email: yup
    .string()
    .email()
    .matches(/^^[A-Za-z0-9._%+-]+@stud\.noroff\.no$$/, "Please enter a valid email")
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
  venueManager: yup.boolean(),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/, { message: "Please enter a valid email" })
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
});

// Yups .url() is not allowing regular URLs, so i made a slightly wide regex to try to validate in some way,
// but it is not a perfect solution.

export const uploadProfileImageSchema = yup.object().shape({
  avatar: yup.string().url("Please enter a valid URL"),
});

export const editVenueSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required().min(10),
  price: yup.number().required().min(1),
  guests: yup.number().required().min(1),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
});

export const newVenueSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required().min(10),
  price: yup.number().required().min(1),
  guests: yup.number().required().min(1),
  rating: yup.number().min(1).max(5),
  address: yup.string().required(),
  city: yup.string().required(),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
});
