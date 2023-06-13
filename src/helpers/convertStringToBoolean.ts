const convertStringToBoolean = (str: string): boolean | undefined => {
  if (str === "true")
    return true;

  if (str === "false")
    return false;

  return;
}

export default convertStringToBoolean;