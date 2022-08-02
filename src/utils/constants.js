export const APP_LOCATIONS = ["/", "/contact", "/about"];

export const HEADERS = {
  authZ: "Authorization",
  contentType: "Content-Type",
  values: {
    appJson: "application/json",
  },
  templates: {
    Bearer: (token) => `Bearer ${token}`,
  },
};

export const CREDENTIALS_RULES = {
  username: {
    minLength: 4,
    maxLength: 20,
    get lengthError() {
      return lengthError("Username", this.minLength, this.maxLength);
    },
    get requiredError() {
      return requiredError("Username");
    },
  },
  password: {
    minLength: 4,
    maxLength: 20,
    get lengthError() {
      return lengthError("Password", this.minLength, this.maxLength);
    },
    get requiredError() {
      return requiredError("Password");
    },
  },
};
export const CONTACT_RULES = {
  phone: {
    minLength: 10,
    maxLength: 11,
    pattern: /^0[1-9][0-9]+$/,
    get lengthError() {
      return lengthError("Phone number", this.minLength, this.maxLength);
    },
    get requiredError() {
      return requiredError("Phone number");
    },
    patternError: "Phone number not in correct format",
  },
  address: {
    minLength: 1,
    maxLength: 75,
    get lengthError() {
      return lengthError("Address", this.minLength, this.maxLength);
    },
    get requiredError() {
      return requiredError("Address");
    },
  },
};

const lengthError = (propName, min, max) =>
  `${propName} must be between ${min} and ${max} characters`;

const requiredError = (propName) => `${propName} cannot be empty`;
