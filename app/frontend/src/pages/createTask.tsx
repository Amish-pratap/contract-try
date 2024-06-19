import CreateTaskForm from "@/components/CreateTaskForm";
import { TaskList } from "@/components/TaskList";
import React from "react";

const createTask = () => {
  return (
    <div>
      <CreateTaskForm />

      <TaskList />
    </div>
  );
};

export default createTask;
