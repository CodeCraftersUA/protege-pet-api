// Services
import * as protectorServices from "../services/protector.js";

const fetchProtectors = async () => {
  const protectors = await protectorServices.fetchProtectors();
  return protectors;
}

const fetchProtector = async id => {
  const protector = await protectorServices.fetchProtector(Number(id));
  return protector;
}

export {
  fetchProtectors,
  fetchProtector
}