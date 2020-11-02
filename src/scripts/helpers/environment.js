/**
 * Returns true if on iOS
 */
export const isIos = () => {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
};

/**
 * Returns true is this is a PWA
 */
export const isInStandaloneMode = () => {
  return 'standalone' in window.navigator && window.navigator.standalone;
};
