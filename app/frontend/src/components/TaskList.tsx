import React, { useState } from "react";
import { getQueryClient } from "app/frontend/api";
import { contract } from "contract";

export const TaskList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, refetch } =
    getQueryClient().todo.getTask.useQuery([contract.todo.getTask], {
      query: {
        page: page,
        limit: 10,
      },
    });
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
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
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
