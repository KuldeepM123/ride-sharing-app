const isDarkMode = false;

export const Color = {
  button: '#4bc4f1',
  view: '',
  text: isDarkMode ? '#e5e5e5' : '#252525',
  screen: isDarkMode ? '#252525' : '#e5e5e5',
  white: '#fff',
  white1: '#dbe1ef',
  white2: '#f1f1f1',

  purple1: '#b2c0ff',
  greendark: '#17361b',
  green: '#498553',
  green1: '#3CB371',
  green2: '#d7eadd',
  green3: '#e9f3ed',
  blue: '#2a52be',
  blue1: '#3282c3',
  blue2: '#4bc4f1',
  blue4: '#003963', //bold
  black: '#000000',
  black1: '#252525',
  red: 'red',
  red1: '#f5dfdf',
  gray: 'gray',
  gray1: '#50545d',
  yellow: '#c3cf0a',
} as const;

// Alternative: You can also define a type for the colors
export type ColorType = keyof typeof Color;

// Optional: Export the colors as default as well
export default Color;

// Uncomment if you want to use the theme approach:
/*
export const LightTheme = {
  text: '#000',
  background: '#fff',
  tint: '#2f95dc',
  tabIconDefault: '#ccc',
  tabIconSelected: '#2f95dc',
} as const;

export const DarkTheme = {
  text: '#fff',
  background: '#000',
  tint: '#fff',
  tabIconDefault: '#ccc',
  tabIconSelected: '#fff',
} as const;

export type Theme = typeof LightTheme | typeof DarkTheme;
*/
