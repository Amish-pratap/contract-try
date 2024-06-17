import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "contract";
import { tsRestFetchApi } from "@ts-rest/core";

const queryClient = () =>
  initQueryClient(contract, {
    baseUrl: "http://localhost:3000",
    api: async (args) => {
      const response = await tsRestFetchApi(args);
      return response;
    },
  });

export const getQueryClient = () => queryClient();
