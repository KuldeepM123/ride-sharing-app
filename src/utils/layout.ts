import {Dimensions, ScaledSize} from 'react-native';

// Type definitions
type DateInput = string | Date;
type ScaleFunction = (val: number) => number;

// Constants
const REFERENCE_WIDTH = 414;
const REFERENCE_HEIGHT = 736;
const removeTag = /(<([^>]+)>)/gi;
const removeNBSP = /\&nbsp;/g;
const {height, width}: ScaledSize = Dimensions.get('window');

// Scale functions
const horizScale: ScaleFunction = (val: number): number =>
  width * (val / REFERENCE_WIDTH);
const vertScale: ScaleFunction = (val: number): number =>
  height * (val / REFERENCE_HEIGHT);

// Date functions
const getLocalDate = (strDate: DateInput): string => {
  const date = new Date(strDate);
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return `${day}-${month}-${year}`;
};

const days = (startDate: DateInput, endDate: DateInput): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays + 1;
};

export {horizScale, vertScale, removeTag, removeNBSP, getLocalDate, days};
