export function matchIsNumeric(text: string) {
  return /^\d+$/.test(text);
}

/**
 *
 * @param length otp length
 * @param minutes number of minutes
 * @returns
 */
export function generateOTP(length: number, minutes: number=2) {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return { otp, expiresIn: Date.now() + 1000 * 60 * minutes };
}
