'use client';

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "./utils";
import dayjs from "dayjs";
import { IoDownloadOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const tabs = ["ALL SERVICES(134)", "IN PROGRESS(132)", "DELIVERED(1)", "REVISIONS(1)"];

const myData = [
  { id: 1, name: "Professional Cover Letter Writing", price: 1.00, date: "January 18, 2025", status: "In Progress" },
  { id: 2, name: "Professional Cover Letter Writing", price: 3.85, date: "January 17, 2025", status: "In Progress" },
  { id: 3, name: "Professional Resume Review", price: 2.50, date: "January 16, 2025", status: "Delivered" },
  { id: 4, name: "Professional Cover Letter Writing", price: 3.85, date: "January 16, 2025", status: "In Progress" },
  { id: 5, name: "Professional Cover Letter Writing", price: 3.85, date: "January 16, 2025", status: "In Progress" },
  { id: 6, name: "Professional Cover Letter Review", price: 2.50, date: "January 13, 2025", status: "Revisions" },
  { id: 7, name: "Professional Resume Review", price: 2.50, date: "January 13, 2025", status: "Delivered" },
  { id: 8, name: "Professional Cover Letter Writing", price: 3.85, date: "January 13, 2025", status: "In Progress" },
  { id: 9, name: "Professional Cover Letter Writing", price: 3.85, date: "January 11, 2025", status: "In Progress" },
  { id: 9, name: "Professional Cover Letter Writing", price: 3.85, date: "January 10, 2025", status: "In Progress" },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("ALL SERVICES");
  const filteredData = myData.filter((item) => {
    if (activeTab === "ALL SERVICES") return true;
    return item.status.toUpperCase() === activeTab;
  });

  return (
    <div className="w-full flex justify-center py-10">
      <div className="flex w-full max-w-6xl gap-6 px-4">
        <div className="w-2/3 rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex justify-center mb-6  rounded-sm p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    const tabName = tab.split("(")[0].trim().toUpperCase();
                    setActiveTab(tabName);
                  }}
                  className={`py-1.5 px-4 rounded-full text-sm font-medium border transition
                    ${activeTab === tab.split("(")[0].trim().toUpperCase()
                      ? "bg-hamzaPrimary text-white border-hamzaPrimary"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* left Table box */}
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F7F9FC] dark:bg-dark-2">
                <TableHead className="min-w-[100px]">Package</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={index} className="border-[#eee] dark:border-dark-3">
                    <TableCell>
                      <h5 className="text-dark dark:text-white">{item.name}</h5>
                      <p className="mt-[3px] text-body-sm font-medium">${item.price}</p>
                    </TableCell>

                    <TableCell>
                      <p className="text-dark dark:text-white">
                        {dayjs(item.date).format("MMM DD, YYYY")}
                      </p>
                    </TableCell>

                    <TableCell>
                      <div
                        className={cn(
                          "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                          {
                            "bg-[#219653]/[0.08] text-[#219653]": item.status === "Delivered",
                            "bg-[#D34053]/[0.08] text-[#D34053]": item.status === "Revisions",
                            "bg-[#FFA70B]/[0.08] text-[#FFA70B]": item.status === "In Progress",
                          }
                        )}
                      >
                        {item.status}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end gap-x-3.5">
                        <button className="hover:text-primary">
                          <RiDeleteBin6Line size={20} />
                        </button>
                        <button className="hover:text-primary">
                          <IoDownloadOutline size={20} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* right subscription box */}
        <div className="w-1/3 h-72  bg- shadow-md p-4 border-hamzaPrimary border-2 border-dashed rounded-xl">
          <h2 className="text-xl font-semibold text-dark dark:text-white mb-2">Subscriptions</h2>
        </div>
      </div>
    </div>
  );
};

export default Services;
