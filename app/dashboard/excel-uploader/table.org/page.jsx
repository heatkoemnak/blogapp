'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CgImport } from 'react-icons/cg';
import OrgLayout from '@/app/components/Dashboard/OrgLayout';
import { mutate } from 'swr';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function TableOrg() {
  const { data: session } = useSession();
  const [data1, setData] = useState([]);
  const router = useRouter();

  const [editIndex, setEditIndex] = useState(null); // Index of the row in edit mode
  const [editRowData, setEditRowData] = useState(null); // Temp data for the row being edited


  // Handles file upload and parsing
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Handles the final import to the backend
  const handleSave = async (e) => {
    e.preventDefault();
    if (data1.length === 0) {
      alert('No data to save');
      return;
    }

    try {
      const formattedData = data1?.map((row) => ({
        name: row?.companyName,
        industry: row?.Industry,
        contactNumber: row?.Phone || '', // Ensure phone is a string
        email: row?.Email,
        website: row?.Website || '',
        userID: session?.user?.id || '',
      }));

      const response = await axios.post('/api/companies', { companies: formattedData }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201 || response.status === 200) { // Check for 201 Created or 200 OK
        console.log('Successfully imported:', response.data);
        // Mutate the SWR cache on the main dashboard page after successful import
        mutate(`/api/companies/${session?.user?.id}`);
        router.push('/dashboard/orgs');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('An error occurred while saving the data.');
    }
  };

  // --- Functions for Inline Editing ---

  // 1. Enter edit mode for a specific row
  const handleEdit = (index) => {
    setEditIndex(index);
    // Create a copy of the row's data to edit
    setEditRowData({ ...data1[index] });
  };

  // 2. Save the changes for the currently edited row
  const handleUpdateRow = () => {
    const updatedData = [...data1];
    updatedData[editIndex] = editRowData;
    setData(updatedData);

    // Exit edit mode
    setEditIndex(null);
    setEditRowData(null);
  };

  // 3. Cancel editing and discard changes
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditRowData(null);
  };

  // 4. Update the temporary state as the user types in input fields
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditRowData({ ...editRowData, [name]: value });
  };

  return (
    <OrgLayout>
      <div className="relative overflow-x-auto mt-20 bg-blue-gray-50">
        <div className="px-6 py-2 bg-white rounded-t-md ">
          <ul className="flex gap-5 ">
            <Link href="/dashboard/orgs">
              <h3>Organizations / Import</h3>
            </Link>
          </ul>
        </div>

        <div className="flex items-center mt-4 px-4 justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
          <div className="relative flex items-center gap-2">
            {/* Show Import button only if there is data */}
            {data1?.length > 0 && (
              <button
                onClick={handleSave}
                className="inline-flex items-center text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2"
                type="button"
              >
                <CgImport className='mr-2' size={18} />
                Import Data
              </button>
            )}

            {/* Load File and Cancel Buttons */}
            <div className="relative">
              {!data1?.length ? (
                <button
                  className="inline-flex items-center text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2"
                >
                  <svg fill="teal" className='text-teal-500 mr-2' height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
                  Load File
                  <input
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </button>
              ) : (
                <button
                  onClick={() => { setData([]); setEditIndex(null); }}
                  className="inline-flex items-center text-red-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Count Display */}
          {data1?.length > 0 && (
            <div className="relative">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{data1.length}</span> records
                </p>
            </div>
          )}
        </div>

        {/* --- Data Table --- */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-800 uppercase dark:text-gray-400 bg-gray-100 border-b">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Industry</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Contact</th>
            </tr>
          </thead>
          <tbody>
            {
                data1?.length === 0 ?
                (
                <tr className='text-start'>
                    <td  className="px-4 py-3border-2">[companyName]</td>
                    <td  className="px-4 py-3 border">[Industry]</td>
                    <td className="px-4 py-3 border">[Email]</td>
                    <td className="px-4 py-3 border">[Phone]</td>
                </tr>
                ): data1?.map((row, i) => (
                <tr key={i} className="text-gray-800 dark:text-gray-400 border-b">
                    {editIndex === i ? (
                    // --- EDIT MODE ROW ---
                    <>
                        <td className="bg-white px-2 py-1"><input name="companyName" value={editRowData?.companyName || ''} onChange={handleEditInputChange} className="w-full p-1 border rounded"/></td>
                        <td className="bg-white px-2 py-1"><input name="Industry" value={editRowData?.Industry || ''} onChange={handleEditInputChange} className="w-full p-1 border rounded"/></td>
                        <td className="bg-white px-2 py-1"><input name="Email" value={editRowData?.Email || ''} onChange={handleEditInputChange} className="w-full p-1 border rounded"/></td>
                        <td className="bg-white px-2 py-1"><input name="Phone" value={editRowData?.Phone || ''} onChange={handleEditInputChange} className="w-full p-1 border rounded"/></td>
                        <td className="bg-white px-2 py-1 flex justify-center items-center gap-2">
                        <button onClick={handleUpdateRow} className="font-medium text-teal-500 hover:underline">Save</button>
                        <button onClick={handleCancelEdit} className="font-medium text-red-500 hover:underline">Cancel</button>
                        </td>
                    </>
                    ) : (
                    // --- NORMAL ROW ---
                    <>
                        <td className="bg-white px-4 py-2">{row?.companyName}</td>
                        <td className="bg-white px-4 py-2">{row?.Industry}</td>
                        <td className="bg-white px-4 py-2">{row?.Email}</td>
                        <td className="bg-white px-4 py-2">{row?.Phone}</td>
                        <td className="bg-white px-4 py-2 text-center">
                        <button onClick={() => handleEdit(i)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                        </button>
                        </td>
                    </>
                    )}
                </tr>
                ))
                }
          </tbody>
        </table>
      </div>
    </OrgLayout>
  );
}