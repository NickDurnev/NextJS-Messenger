import * as Yup from "yup";

export const GroupChatSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .min(4, "Name length should be at least 4 characters")
    .max(30, "Name cannot exceed more than 30 characters"),
  members: Yup.array().min(2, "There should be at least 2 members"),
});
