export const isValidEthAddress = (address) => {
  const regex = /^(0x)?[0-9a-f]{40}$/i;
  return regex.test(address);
}
