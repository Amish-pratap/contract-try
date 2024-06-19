import { z } from "zod";

export const CreateDto = z.object({
  title: z.string(),
  description: z.string(),
});

export const UpdateDto = z.object({
  id: z.number(),
  isCompleted: z.boolean(),
});
export const DeleteDto = z.object({
  id: z.string(),
});

export const CommonSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
});

export const CreateTaskResponseDto = CommonSuccessSchema.extend({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
});

export const TaskResponseDto = z.object({
  result: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      isCompleted: z.boolean(),
    })
  ),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const UpdateResponseDto = CommonSuccessSchema.extend({
  id: z.number(),
  title: z.string(),
  isCompleted: z.boolean(),
});
