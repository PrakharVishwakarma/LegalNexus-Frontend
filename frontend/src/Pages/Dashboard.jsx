import React from 'react';

// Navbar Component
const Navbar = () => (
    <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Legal Nexus</h1>
            <div className="text-white space-x-4">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">Profile</a>
                <a href="#" className="hover:underline">Logout</a>
            </div>
        </div>
    </nav>
);

// Sidebar Component
const Sidebar = () => (
    <aside className="bg-blue-100 w-64 h-screen p-4 shadow-md">
        <ul className="space-y-4">
            <li><a href="#" className="block p-3 bg-blue-500 text-white rounded hover:bg-blue-600">Dashboard</a></li>
            <li><a href="#" className="block p-3 bg-gray-200 rounded hover:bg-gray-300">Documents</a></li>
            <li><a href="#" className="block p-3 bg-gray-200 rounded hover:bg-gray-300">Users</a></li>
            <li><a href="#" className="block p-3 bg-gray-200 rounded hover:bg-gray-300">Settings</a></li>
        </ul>
    </aside>
);

// Summary Card Component
const SummaryCard = ({ title, value, color, description }) => (
    <div className={`bg-white p-6 shadow rounded-lg border-l-4 ${color}`}>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
);

const DashboardSummary = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Documents" value={150} color="border-blue-600" description="All documents in the system." />
        <SummaryCard title="In-Process Documents" value={30} color="border-yellow-500" description="Currently being reviewed." />
        <SummaryCard title="Checked Documents" value={120} color="border-green-500" description="Completed and verified." />
    </div>
);

// Users Table Component
const UsersTable = () => (
    <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">User ID</th>
                    <th className="border border-gray-300 p-3 text-left">Name</th>
                    <th className="border border-gray-300 p-3 text-left">Email</th>
                    <th className="border border-gray-300 p-3 text-left">Role</th>
                    <th className="border border-gray-300 p-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 p-3">001</td>
                    <td className="border border-gray-300 p-3">John Doe</td>
                    <td className="border border-gray-300 p-3">john.doe@example.com</td>
                    <td className="border border-gray-300 p-3">Editor</td>
                    <td className="border border-gray-300 p-3">
                        <button className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                        <button className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-3">002</td>
                    <td className="border border-gray-300 p-3">Jane Smith</td>
                    <td className="border border-gray-300 p-3">jane.smith@example.com</td>
                    <td className="border border-gray-300 p-3">Viewer</td>
                    <td className="border border-gray-300 p-3">
                        <button className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                        <button className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2">Delete</button>
                    </td>
                </tr>
                {/* Add more rows as necessary */}
            </tbody>
        </table>
    </div>
);

// Main Dashboard Component
const Dashboard = () => (
    <div className="bg-gray-100 min-h-screen flex">
        <Sidebar />
        <div className="flex-1 p-6 space-y-8">
            <Navbar />
            <DashboardSummary />
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700">Users with Roles</h2>
                <UsersTable />
            </div>
        </div>
    </div>
);

export default Dashboard;