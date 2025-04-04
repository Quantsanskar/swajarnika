import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Mock data
const mockPatients = [
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2023-10-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2023-10-10', status: 'Active' },
    { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2023-09-28', status: 'Follow-up' },
    { id: 4, name: 'Emily Davis', age: 27, lastVisit: '2023-10-05', status: 'Active' },
    { id: 5, name: 'Michael Wilson', age: 63, lastVisit: '2023-09-20', status: 'Critical' },
];

const mockVisits = [
    { id: 1, patientName: 'John Doe', date: '2023-10-15', diagnosis: 'Hypertension', status: 'Completed' },
    { id: 2, patientName: 'Jane Smith', date: '2023-10-10', diagnosis: 'Influenza', status: 'Completed' },
    { id: 3, patientName: 'Robert Johnson', date: '2023-09-28', diagnosis: 'Diabetes Type 2', status: 'Follow-up' },
    { id: 4, patientName: 'Emily Davis', date: '2023-10-05', diagnosis: 'Migraine', status: 'Completed' },
    { id: 5, patientName: 'Michael Wilson', date: '2023-09-20', diagnosis: 'Pneumonia', status: 'Critical' },
];

export default function Dashboard() {
    const router = useRouter();
    const [userRole, setUserRole] = useState('doctor'); // Default role for demo
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // For demo purposes, we'll simulate different user roles
    const toggleRole = () => {
        const roles = ['doctor', 'assistant', 'patient', 'hospital', 'admin'];
        const currentIndex = roles.indexOf(userRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setUserRole(roles[nextIndex]);
    };

    const handlePatientClick = (patientId) => {
        router.push(`/patients/${patientId}`);
    };

    const handleVisitClick = (visitId) => {
        router.push(`/visits/${visitId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Dashboard | Swajarnika</title>
                <meta name="description" content="Swajarnika Healthcare Portal Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar userRole={userRole} toggleRole={toggleRole} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                <Sidebar userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                <main className="flex-1 p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {userRole === 'doctor' && 'Doctor Dashboard'}
                            {userRole === 'assistant' && 'Assistant Dashboard'}
                            {userRole === 'patient' && 'Patient Dashboard'}
                            {userRole === 'hospital' && 'Hospital Dashboard'}
                            {userRole === 'admin' && 'Admin Dashboard'}
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Here's what's happening today.
                        </p>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-700">Total Patients</h2>
                                        <p className="text-3xl font-bold text-gray-900">128</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-700">Today's Appointments</h2>
                                        <p className="text-3xl font-bold text-gray-900">24</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-gray-700">Pending Reports</h2>
                                        <p className="text-3xl font-bold text-gray-900">7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Patients Tab */}
                    {activeTab === 'patients' && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
                                {(userRole === 'doctor' || userRole === 'hospital') && (
                                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Add New Patient
                                    </button>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Age
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Visit
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {mockPatients.map((patient) => (
                                            <tr key={patient.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handlePatientClick(patient.id)}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{patient.age}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                            patient.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}>
                                                        {patient.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                                                    {(userRole === 'doctor' || userRole === 'assistant') && (
                                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Visits Tab */}
                    {activeTab === 'visits' && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Recent Visits</h2>
                                {(userRole === 'doctor' || userRole === 'assistant') && (
                                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Record New Visit
                                    </button>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Patient
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Diagnosis
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {mockVisits.map((visit) => (
                                            <tr key={visit.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleVisitClick(visit.id)}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{visit.patientName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{visit.date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{visit.diagnosis}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${visit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            visit.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}>
                                                        {visit.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                                                    {(userRole === 'doctor' || userRole === 'assistant') && (
                                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Chat Tab */}
                    {activeTab === 'chat' && (
                        <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-200px)] flex flex-col">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">AI Health Assistant</h2>
                                <p className="text-gray-600">Ask questions about your medications, treatment, or health concerns.</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                            AI
                                        </div>
                                    </div>
                                    <div className="ml-3 bg-gray-100 rounded-lg py-3 px-4 max-w-3xl">
                                        <p className="text-sm text-gray-800">
                                            Hello! I'm your AI health assistant. How can I help you today? You can ask me about your medications, treatment plan, or any health concerns you might have.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start justify-end">
                                    <div className="bg-teal-100 rounded-lg py-3 px-4 max-w-3xl">
                                        <p className="text-sm text-gray-800">
                                            When should I take my blood pressure medication? The doctor prescribed it yesterday.
                                        </p>
                                    </div>
                                    <div className="ml-3 flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                                            You
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                            AI
                                        </div>
                                    </div>
                                    <div className="ml-3 bg-gray-100 rounded-lg py-3 px-4 max-w-3xl">
                                        <p className="text-sm text-gray-800">
                                            Based on your records, your doctor prescribed Lisinopril 10mg once daily. It's best to take it at the same time each day, typically in the morning. Take it with or without food. If you miss a dose, take it as soon as you remember, but skip it if it's almost time for your next dose. Never take a double dose.
                                        </p>
                                        <p className="text-sm text-gray-800 mt-2">
                                            Would you like me to set up a daily reminder for you?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Type your question here..."
                                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
