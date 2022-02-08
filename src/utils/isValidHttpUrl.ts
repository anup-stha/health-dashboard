/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/8/22, 1:04 PM
 *
 *
 */

/**
 * Check if given url is valid or not using URL Object
 * @param {string} string The given string to be checked.
 * @return {boolean} Returns true if string is a valid URL or vice-versa
 */
export function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
