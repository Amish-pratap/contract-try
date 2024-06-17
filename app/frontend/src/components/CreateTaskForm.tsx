import React from "react";
import { useFormik } from "formik";
import { getQueryClient } from "app/frontend/api";

interface FormValues {
  title: string;
  description: string;
}

const CreateTaskForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      // Handle form submission
      getQueryClient().todo.createTask.mutation({
        body: {
          title: values.title,
          description: values.description,
        },
      });
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
