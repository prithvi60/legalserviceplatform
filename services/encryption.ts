import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "any_secret_key";

export const encryptText = (text: string): string => {
  // console.log(CryptoJS.AES.encrypt(text, SECRET_KEY).toString());

  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (encryptedText: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  // console.log(bytes.toString(CryptoJS.enc.Utf8));
  return bytes.toString(CryptoJS.enc.Utf8);
};
