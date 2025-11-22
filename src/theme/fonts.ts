// Define interfaces for type safety
interface FontSize {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  input: number;
  regular: number;
  medium: number;
  small: number;
  das: number;
  tiny: number;
  pis: number;
}

interface FontWeight {
  w1: string;
  w2: string;
  w3: string;
  w4: string;
  w5: string;
  w6: string;
  w7: string;
  w8: string;
  w9: string;
  bold: string;
  normal: string;
}

interface FontFamily {
  regular: string;
  semiBold: string;
  medium: string;
  bold: string;
  light: string;
  thin: string;
}

// Font sizes in pixels
const fontSize: FontSize = {
  h1: 36,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  das: 10,
  tiny: 8.5,
  pis: 6,
};

// Font weights
const fontWeight: FontWeight = {
  w1: '100',
  w2: '200',
  w3: '300',
  w4: '400',
  w5: '500',
  w6: '600',
  w7: '700',
  w8: '800',
  w9: '900',
  bold: 'bold',
  normal: 'normal',
};

// Font families
const fontFamily: FontFamily = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  light: 'Poppins-Light',
  thin: 'Poppins-Thin',
};

export {fontSize, fontWeight, fontFamily};

// Optional: Export types for use in other files
export type {FontSize, FontWeight, FontFamily};
