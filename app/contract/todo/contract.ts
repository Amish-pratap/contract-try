import { initContract } from "@ts-rest/core";
import { CreateDto, CreateTaskResponseDto, TaskResponseDto } from "./type";
import { z } from "zod";

const c = initContract();

export const todoContract = c.router(
  {
    createTask: {
      method: "POST",
      path: "/create",
      responses: {
        200: CreateTaskResponseDto,
      },
      body: CreateDto,
    },
    getTask: {
      method: "GET",
      path: "/tasks",
      query: z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
      }),
      responses: {
        200: TaskResponseDto,
      },
    },
  },
  {
    pathPrefix: "/todo",
  }
);
