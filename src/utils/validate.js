export function validPhone(input) {
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(input);
}

export function validUsername(input) {
  return /^[a-zA-Z]{1}([a-zA-Z0-9]|){4,19}$/.test(input);
}

export function validPassword(input) {
  return /^[a-zA-Z0-9_-]{5,16}$/.test(input);
}

export function validSms(input) {
  return /^\d{6}$/.test(input);
}
