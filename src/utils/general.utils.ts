

export const formatFloat = (input: number) : string => {
  const num = input.toFixed(2);
  if (num.endsWith('.00')) {
    return num.replace('.00', '');
  }

  let parts = num.toString().split(".");

  parts[0] = Number.parseInt(parts[0], 10).toLocaleString();


  return parts.join(".");
}
