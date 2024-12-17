// Constants
export const REG_CHECK_NUMBER = /^[-+]?(\d+|\d*\.\d+|\d+\.\d*)([eE][-+]?\d+)?$/;
export const BACKEND_URL = "https://ai.david-project.online/backend";
//export const BACKEND_URL = "http://95.216.55.181:3103";
//export const BLOCKAI_TOKEN_ADDR = "0x275e916Ab1E93A6862a7b380751DdD87D6F66267";
export const BLOCKAI_TOKEN_ADDR = "0x7b7958d29C37522B3970211C4b72662Dd18b01DA";
export const TREASURY_ADDR = "0xf087D57D7155bEed437D296AA021fBa6443df544";

import { AES, enc } from 'crypto-js';

// Encryption function
export function AESEncrypt(text, key) {
  const encrypted = AES.encrypt(text, key).toString();
  return encrypted;
}
// Decrypt function
export function AESDecrypt(encText, key) {
  const decrypted = AES.decrypt(encText, key).toString(enc.Utf8);
  return decrypted;
}

// Global Functions
export const displayAddress = (address, sublength = 4) => {
  if (!address || !address.length) return "";
  return address.slice(0, sublength) + "..." + address.slice(-sublength);
};

export const decimalToEth = (amount) => {
  if (Number(amount) > 0) {
    return Number(amount) / Number(10 ** 18);
  }
  return 0;
}

export const decimalFromEth = (amount) => {
  if (amount > 0) {
    return BigInt(Math.floor(amount * (10 ** 18)));
  }
  return BigInt(0);
}

export function convertBigIntToDateString(bigIntTimestamp) {
  // Convert BigInt to Number (multiply by 1000 if your BigInt is in seconds)
  const timestampInMilliseconds = Number(bigIntTimestamp) * 1000;

  // Create a Date object
  const date = new Date(timestampInMilliseconds);

  // Format the date as a string
  const dateString = date.toLocaleString();

  return dateString;
}

// cookie functions
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Example usage
// setCookie("username", "JohnDoe", 7); // Set cookie "username" with value "JohnDoe" for 7 days

export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// Example usage
// const username = getCookie("username");
// console.log(username); // Output: JohnDoe

export function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

// Example usage
// eraseCookie("username");

export function formatNumberWithCommas(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Use a regular expression to add commas
  const formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedString;
}
