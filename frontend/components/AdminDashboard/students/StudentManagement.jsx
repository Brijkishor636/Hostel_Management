"use client"
import React, { useState } from 'react';
import Card from '../ui/Cards';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Search, Filter, MoreVertical, Plus, UserPlus, X as CloseIcon } from 'lucide-react';
import { MOCK_STUDENTS } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

const StudentManagement = () => {
  const [search, setSearch] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.roomNumber.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-poppins flex items-center gap-3">
            <UserPlus className="text-indigo-400" size={32} /> 
            Student Directory
          </h2>
          <p className="text-gray-400 mt-1 text-sm">Manage and monitor all student residents and their status.</p>
        </div>
        <Button size="lg" className="shadow-indigo-500/20">
          <Plus size={20} /> Add New Student
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search by student name or room number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all placeholder:text-gray-500"
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearSearch}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                >
                  <CloseIcon size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex w-full lg:w-auto gap-3">
          <Button variant="secondary" className="flex-1 lg:flex-none py-3.5"><Filter size={18} /> Filters</Button>
          <Button variant="secondary" className="flex-1 lg:flex-none py-3.5">Export CSV</Button>
        </div>
      </div>

      <Card className="!p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.15)]">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-8 py-5">Resident Info</th>
                <th className="px-6 py-5">Room</th>
                <th className="px-6 py-5">Email Address</th>
                <th className="px-6 py-5">Payment Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student, idx) => (
                <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} key={student.id} className="hover:bg-indigo-500/[0.05] transition-colors group">

                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-[#020617] rounded-full ${student.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-200 group-hover:text-indigo-300">{student.name}</p>
                        <p className="text-[11px] text-gray-500 font-mono">REF: #{student.id}00</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5"><span className="px-3 py-1 bg-white/5 rounded-lg text-gray-300 border border-white/10">{student.roomNumber}</span></td>
                  <td className="px-6 py-5 text-gray-400 italic">{student.email}</td>
                  <td className="px-6 py-5"><Badge variant={student.paymentStatus === 'Paid' ? 'success' : student.paymentStatus === 'Pending' ? 'warning' : 'error'}>{student.paymentStatus}</Badge></td>
                  <td className="px-8 py-5 text-right"><button className="p-2 hover:bg-white/10 rounded-xl text-gray-500 hover:text-indigo-400"><MoreVertical size={20} /></button></td>

                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 bg-white/5">
          <p>Displaying <span className="text-gray-300">{filteredStudents.length}</span> of <span className="text-gray-300">{MOCK_STUDENTS.length}</span></p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 disabled:opacity-30" disabled>Previous</button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10">Next Page</button>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default StudentManagement;
