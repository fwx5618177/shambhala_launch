import React from "react";
import { RowObject, TableProps } from "./types";

const Table = <T extends RowObject>({
  columns,
  dataSource,
  type,
  header = true,
}: TableProps<T>) => {
  return (
    <div className="w-full">
      {/* Table Header */}
      {header && (
        <div
          className={`text-gray-400 mb-4 ${type === "card" ? "px-[41px]" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((column) => (
            <div key={column.key} className="px-4">
              {column.title}
            </div>
          ))}
        </div>
      )}

      {/* Table Body */}
      <div className="overflow-y-auto max-h-[400px]">
        {dataSource.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={
              type === "card"
                ? "bg-thirdary shadow-tableCard rounded-card px-[41px] py-[30px] mb-4 border border-[#0000001f]"
                : "items-center py-4"
            }
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="px-4 flex items-center text-primary"
              >
                {column.render
                  ? column.render(row[column.dataIndex], row)
                  : (row[column.dataIndex] as React.ReactNode)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
