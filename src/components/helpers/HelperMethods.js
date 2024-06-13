const HelperMethods = {
  formatFaxAndPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  },

  formatEmail(email) {
    if (!email) return email;
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email;
    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex + 1);
    const formattedUsername = username.replace(/./g, "*");
    return `${formattedUsername}@${domain}`;
  },
  ccyFormat(num) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(num);
  },

  validatePassword(password) {
    if (password.length < 7) {
      return "Password should be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      return "Password should contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      return "Password should contain at least one lowercase letter.";
    } else if (!/\d/.test(password)) {
      return "Password should contain at least one digit.";
    } else if (!/\W/.test(password)) {
      return "Password should contain at least one special character.";
    }

    return null; // Password is valid
  },
  validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(phoneNumber)) {
      return false;
    }
    return true; // Phone number is valid
  },
  formateDate(d) {
    if (!d) {
      return "";
    }
    const date = new Date(d);
    let dd = date.getDate();
    let mm = date.getMonth();
    const yyyy = date.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${mm}/${dd}/${yyyy}`;
  },
};

export default HelperMethods;
