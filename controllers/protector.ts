// Services
import * as protectorServices from "../services/protector.js";

const fetchProtectors = async () => {
  const protectors = await protectorServices.fetchProtectors();
  return protectors;
}

const fetchProtector = async (id: number) => {
  const protector = await protectorServices.fetchProtector(id);
  return protector;
}

export {
  fetchProtectors,
  fetchProtector
}