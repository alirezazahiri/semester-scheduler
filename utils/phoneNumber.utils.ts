export const cleanPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replaceAll(" ", "").replaceAll("_", "");
};

export const PHONE_NUMBER_REGEX = /^\+98\d{10}$/g