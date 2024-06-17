import { initContract } from "@ts-rest/core";
import { todoContract } from "./todo/contract";

const c = initContract();

export const contract = c.router({
  todo: todoContract,
});
