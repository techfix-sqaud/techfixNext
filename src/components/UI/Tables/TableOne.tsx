import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BiCartAdd } from "react-icons/bi";
import { orderStatuses } from "@/components/helpers/Enums";
import Pagination from "@/components/helpers/Pagination";

interface TechfixTableProps {
  apiResponse?: any[];
  tableHeader: string;
  columns?: any[];
  rows: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  pageSize: number;
  onView?: (row: any) => void;
  createOrder?: (row: any) => void;
  showCheckboxes?: boolean;
  haveOrderStatus?: boolean;
  onChangeStatus?: (row: any, newStatus: string) => void;
}

const TechfixTable = ({
  apiResponse,
  tableHeader,
  columns,
  rows,
  onEdit,
  onDelete,
  pageSize,
  onView,
  createOrder,
  showCheckboxes,
  haveOrderStatus = false,
  onChangeStatus,
}: TechfixTableProps) => {
  const dynamicColumns =
    apiResponse && apiResponse.length > 0 ? Object.keys(apiResponse[0]) : [];

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, rows?.length);

  const paginatedRows = rows?.slice(startIndex, endIndex);

  const handleEdit = (row: any) => {
    if (onEdit) {
      onEdit(row);
    }
  };

  const handleCreateOrder = (row: any) => {
    if (createOrder) {
      createOrder(row);
    }
  };

  const handleDelete = (row: any) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  const handleView = (row: any) => {
    if (onView) {
      onView(row);
    }
  };

  const handleStatusChange = (row: any, newStatus: string) => {
    if (onChangeStatus) {
      onChangeStatus(row, newStatus);
    }
  };

  const getRowClassName = (index: number) => {
    return index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "";
  };

  const renderActions = (row: any) => (
    <div className="flex space-x-2">
      {onEdit && (
        <FiEdit
          onClick={() => handleEdit(row)}
          className="text-xl cursor-pointer text-gray-600 dark:text-gray-400"
        />
      )}
      {createOrder && (
        <BiCartAdd
          onClick={() => handleCreateOrder(row)}
          className="text-xl cursor-pointer text-gray-600 dark:text-gray-400"
        />
      )}
      {onDelete && (
        <MdOutlineDeleteOutline
          onClick={() => handleDelete(row)}
          className="text-xl cursor-pointer text-gray-600 dark:text-gray-400"
        />
      )}
      {onView && (
        <AiFillEye
          onClick={() => handleView(row)}
          className="text-xl cursor-pointer text-gray-600 dark:text-gray-400"
        />
      )}
    </div>
  );

  const renderStatusSelect = (row: any) => (
    <select
      value={row.order_Status}
      onChange={(e) => handleStatusChange(row, e.target.value)}
      className="border border-gray-300 dark:border-gray-600 p-1 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
    >
      {orderStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  return (
    //<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {tableHeader}
        </h4>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {columns
                  ?.filter((column) => column !== "order_Status")
                  .map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                    >
                      {column}
                    </th>
                  ))}
                {(onEdit || createOrder || onDelete || onView) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Actions
                  </th>
                )}
                {haveOrderStatus && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-600">
              {paginatedRows?.map((row, index) => (
                <tr key={row.id} className={getRowClassName(index)}>
                  {columns
                    ?.filter((column) => column !== "order_Status")
                    .map((column) => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100"
                      >
                        {row[column]}
                      </td>
                    ))}
                  {(onEdit || createOrder || onDelete || onView) && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderActions(row)}
                    </td>
                  )}
                  {haveOrderStatus && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusSelect(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Container */}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={(page: React.SetStateAction<number>) =>
              setCurrentPage(page)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TechfixTable;
