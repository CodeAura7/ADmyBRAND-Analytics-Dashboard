"use client";
import React, { useState } from "react";

type DataTableProps = {
  columns: { key: string; label: string }[];
  data: any[];
};

export default function DataTable({ columns, data }: DataTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="table-responsive bg-light p-3 rounded shadow-sm">
      <table className="table table-bordered table-hover mb-0">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-between justify-content-between align-items-center mt-3 px-2">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="fw-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
