export async function stringToBoolean(string: String) {
  if (string !== undefined) {
    return Boolean(string.toLowerCase() == "true");
  } else {
    return false;
  }
}
