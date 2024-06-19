import React, { useEffect, useState } from "react";
import { getQueryClient } from "app/frontend/api";
import { contract } from "contract";
import { useFormik } from "formik";

interface FormValues {
  id: number | null;
  isCompleted: boolean | null;
}

export const TaskList = () => {
  const [page, setPage] = useState(1);

  const formik = useFormik<FormValues>({
    initialValues: {
      id: null,
      isCompleted: null,
    },
    onSubmit: async (values) => {
      await getQueryClient().todo.updateTask.mutation({
        body: {
          id: Number(values.id),
          isCompleted: Boolean(values.isCompleted),
        },
      });
      refetch();
    },
  });

  const handleCardClick = (task: FormValues) => {
    formik.setFieldValue("id", task.id);
    formik.setFieldValue("isCompleted", !task.isCompleted);
    formik.handleSubmit();
  };

  const handleDelete = async (id: number) => {
    await getQueryClient().todo.deleteTask.mutation({
      params: { id: id },
    });
    refetch();
  };

  const { data, error, isLoading, refetch } =
    getQueryClient().todo.getTask.useQuery([contract.todo.getTask], {
      query: {
        page: page,
        limit: 10,
      },
    });
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (error || !data) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }

  const limit = data.body.limit;
  const totalTasks = data.body.total;
  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.body.result.map((task, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow flex justify-between items-center cursor-pointer"
            onClick={() => handleCardClick(task)}
          >
            <div>
              <h1>{task.id}</h1>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              {task.isCompleted ? (
                <p className="bg-green-500 text-white p-2 rounded">completed</p>
              ) : (
                <p className="bg-red-500 text-white p-2 rounded">incomplete</p>
              )}
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded ml-4"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
