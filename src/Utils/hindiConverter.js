const hindiNumerals = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९'
};

export const convertToHindiNumerals = (str) => {
  if (!str) return str;
  return str.toString().split('').map(char => hindiNumerals[char] || char).join('');
};

export default convertToHindiNumerals;
