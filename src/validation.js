import {
  alpha_spaces,
  confirmed,
  required,
  email,
  min
} from "vee-validate/dist/rules";

// Function adds and extends rules
function validation(extend) {
  extend("required", {
    ...required,
    message: "{_field_} is empty."
  });

  extend("email", {
    ...email,
    message: "The email address is badly formatted."
  });

  extend("alpha_spaces", {
    ...alpha_spaces,
    message: "Only letters and spaces."
  });

  extend("confirmed", {
    ...confirmed,
    message: " The passwords are different."
  });

  extend("min", {
    ...min,
    params: ["length"],
    message: "{_field_} must have at least {length} characters."
  });
}

export default validation;
