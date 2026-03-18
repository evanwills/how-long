
const _formatNum = (input: string) => Math.abs(Number.parseInt(input, 10)).toLocaleString();

export const formatFloat = (input: number) : string => {
  const num = input.toFixed(2);

  if (num.endsWith('.00')) {
    return _formatNum(num.replace('.00', ''));
  }

  let parts = num.toString().split(".");

  parts[0] = _formatNum(parts[0]);

  return parts.join(".");
};

export const getDoW = (input: number) : string => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[input] || '';
};

export const getTimeZoneOffset = () : string => {
  const offset = new Date().getTimezoneOffset();
  const sign = offset > 0 ? '-' : '+';
  const hours = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
  const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
};
