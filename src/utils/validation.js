export function validateEmail(email) {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(String(email).toLowerCase());
  }
  
  export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{13,}$/;
    return re.test(String(password));
  }
  
  export function validateStringWithLettersOnly(stringToValidate) {
    const re = /^[a-zA-Z_ ]+$/;
    return re.test(String(stringToValidate));
  }
  
  export function validateStringWithLettersAndNumbersOnly(stringToValidate) {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(String(stringToValidate));
  }
  
  export function validateStringWithNumbersOnly(stringToValidate) {
    const re = /^[0-9]+$/;
    return re.test(String(stringToValidate));
  }