import { initContract } from "@ts-rest/core";
import {
  CommonSuccessSchema,
  CreateDto,
  CreateTaskResponseDto,
  TaskResponseDto,
  UpdateDto,
  UpdateResponseDto,
} from "./type";
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
    updateTask: {
      method: "PUT",
      path: "/tasks",
      body: UpdateDto,
      responses: {
        200: UpdateResponseDto,
      },
    },
    deleteTask: {
      method: "DELETE",
      path: "/tasks/:id",
      body: z.object({}),
      pathParams: z.object({
        id: z.coerce.number(),
      }),
      responses: {
        200: CommonSuccessSchema,
      },
    },
  },
  {
    pathPrefix: "/todo",
  }
);
