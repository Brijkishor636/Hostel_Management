
import React from 'react';
import { LayoutDashboard, Users, DoorOpen, CreditCard, MessageSquare, Bell, User } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'students', label: 'Students', icon: <Users size={20} /> },
  {id: 'wardens', label: 'Wardens', icon: <User size={20}/>},
  { id: 'rooms', label: 'Rooms', icon: <DoorOpen size={20} /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  { id: 'complaints', label: 'Complaints', icon: <MessageSquare size={20} /> },
  { id: 'notices', label: 'Notices', icon: <Bell size={20} /> },
];

export const MOCK_STUDENTS = [
  { id: '1', name: 'Alex Thompson', roomNumber: '101A', email: 'alex.t@example.com', status: 'Active', paymentStatus: 'Paid' },
  { id: '2', name: 'Sarah Miller', roomNumber: '204B', email: 's.miller@example.com', status: 'Active', paymentStatus: 'Pending' },
  { id: '3', name: 'James Wilson', roomNumber: '302A', email: 'j.wilson@example.com', status: 'Inactive', paymentStatus: 'Overdue' },
  { id: '4', name: 'Elena Rodriguez', roomNumber: '101B', email: 'elena.r@example.com', status: 'Active', paymentStatus: 'Paid' },
  { id: '5', name: 'Kevin Chen', roomNumber: '405C', email: 'k.chen@example.com', status: 'Active', paymentStatus: 'Paid' },
];

export const MOCK_ROOMS = [
  { id: '1', number: '101', type: 'Double', capacity: 2, occupied: 2, status: 'Full' },
  { id: '2', number: '102', type: 'Single', capacity: 1, occupied: 0, status: 'Available' },
  { id: '3', number: '103', type: 'Double', capacity: 2, occupied: 1, status: 'Available' },
  { id: '4', number: '201', type: 'Suite', capacity: 3, occupied: 3, status: 'Full' },
  { id: '5', number: '202', type: 'Double', capacity: 2, occupied: 0, status: 'Maintenance' },
  { id: '6', number: '203', type: 'Single', capacity: 1, occupied: 1, status: 'Full' },
];

export const MOCK_PAYMENTS = [
  { id: 'PAY-001', studentName: 'Alex Thompson', amount: 1200, date: '2024-05-15', status: 'Completed', type: 'Rent' },
  { id: 'PAY-002', studentName: 'Sarah Miller', amount: 300, date: '2024-05-18', status: 'Pending', type: 'Mess' },
  { id: 'PAY-003', studentName: 'Elena Rodriguez', amount: 1200, date: '2024-05-12', status: 'Completed', type: 'Rent' },
];

export const MOCK_COMPLAINTS = [
  { id: 'CMP-01', studentName: 'Alex Thompson', room: '101A', subject: 'Leaking Faucet', priority: 'Medium', status: 'Open', date: '2024-05-19' },
  { id: 'CMP-02', studentName: 'Kevin Chen', room: '405C', subject: 'Wi-Fi Connectivity Issue', priority: 'Low', status: 'In Progress', date: '2024-05-20' },
  { id: 'CMP-03', studentName: 'James Wilson', room: '302A', subject: 'Bed Replacement', priority: 'High', status: 'Open', date: '2024-05-21' },
];

export const MOCK_NOTICES = [
  { id: '1', title: 'Summer Maintenance', content: 'Weekly maintenance will occur every Sunday from 10 AM to 2 PM.', date: '2024-05-01', expires: '2024-06-01', category: 'General' },
  { id: '2', title: 'Power Outage Warning', content: 'Scheduled power outage for grid repairs on June 5th.', date: '2024-05-20', expires: '2024-06-06', category: 'Urgent' },
];

export const MOCK_WARDENS = [
  { id: '1', name: 'Alex Thompson', roomNumber: '101A', email: 'alex.t@example.com', status: 'Active', paymentStatus: 'Paid' },
  { id: '2', name: 'Sarah Miller', roomNumber: '204B', email: 's.miller@example.com', status: 'Active', paymentStatus: 'Pending' },
  { id: '3', name: 'James Wilson', roomNumber: '302A', email: 'j.wilson@example.com', status: 'Inactive', paymentStatus: 'Overdue' },
  { id: '4', name: 'Elena Rodriguez', roomNumber: '101B', email: 'elena.r@example.com', status: 'Active', paymentStatus: 'Paid' },
  { id: '5', name: 'Kevin Chen', roomNumber: '405C', email: 'k.chen@example.com', status: 'Active', paymentStatus: 'Paid' },
];