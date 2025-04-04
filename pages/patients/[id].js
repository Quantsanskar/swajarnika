import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

// Mock patient data
const mockPatient = {
    id: 1,
    name: 'John Doe',
    age: 45,
    dob: '1978-05-15',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    emergencyContact: 'Jane Doe (Wife) - (555) 987-6543',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    primaryDoctor: 'Dr. Sarah Johnson',
};

// Mock visits data
const mockVisits = [
    {
        id: 101,
        date: '2023-10-15',
        diagnosis: 'Hypertension',
        diagnosisExplanation: 'Blood pressure readings consistently above 140/90 mmHg.',
        possibleDiagnoses: null,
        testsOrdered: ['Blood Pressure Monitoring', 'ECG', 'Blood Test'],
        testReason: 'To monitor blood pressure and check for any heart abnormalities.',
        testResults: 'Blood pressure: 150/95 mmHg. ECG: Normal. Blood test: Elevated cholesterol (240 mg/dL).',
        medications: ['Lisinopril 10mg', 'Atorvastatin 20mg'],
        medicationReason: 'Lisinopril to lower blood pressure. Atorvastatin to reduce cholesterol levels.',
        instructions: 'Take Lisinopril once daily in the morning. Take Atorvastatin once daily in the evening with food.',
        missedDoseInstructions: 'If you miss a dose, take it as soon as you remember. If it is almost time for your next dose, skip the missed dose.',
        treatmentPlan: 'Follow up in 4 weeks. Maintain low-sodium diet. Exercise 30 minutes daily.',
        notes: 'Patient reports occasional headaches in the morning.',
        status: 'Completed',
        createdBy: 'Dr. Sarah Johnson',
        approvedBy: 'Dr. Sarah Johnson',
    },
    {
        id: 102,
        date: '2023-09-01',
        diagnosis: 'Upper Respiratory Infection',
        diagnosisExplanation: 'Viral infection affecting the upper respiratory tract.',
        possibleDiagnoses: null,
        testsOrdered: ['Throat Swab'],
        testReason: 'To rule out strep throat.',
        testResults: 'Negative for streptococcus.',
        medications: ['Acetaminophen 500mg'],
        medicationReason: 'For fever and pain relief.',
        instructions: 'Take 1-2 tablets every 6 hours as needed for fever or pain. Do not exceed 4000mg in 24 hours.',
        missedDoseInstructions: 'Take as needed for symptoms.',
        treatmentPlan: 'Rest, increase fluid intake, and use over-the-counter medications for symptom relief.',
        notes: 'Symptoms should resolve within 7-10 days.',
        status: 'Completed',
        createdBy: 'Dr. Michael Chen',
        approvedBy: 'Dr. Sarah Johnson',
    },
];

export default function PatientDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState('doctor'); // Default role for demo

    // For demo purposes, we'll simulate different user roles
    const toggleRole = () => {
        const roles = ['doctor', 'assistant', 'patient'];
        const currentIndex = roles.indexOf(userRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setUserRole(roles[nextIndex]);
    };

    const handleVisitClick = (visitId) => {
        router.push(`/visits/${visitId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{mockPatient.name} | Patient Details | Swajarnika</title>
                <meta name="description" content="Patient Details in Swajarnika Healthcare Portal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar userRole={userRole} toggleRole={toggleRole} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                <Sidebar userRole={userRole} activeTab="patients" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                <main className="flex-1 p-6">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{mockPatient.name}</h1>
                            <p className="text-gray-600">Patient ID: {mockPatient.id}</p>
                        </div>
                        {(userRole === 'doctor' || userRole === 'assistant') && (
                            <div className="flex space-x-3">
                                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Add Visit
                                </button>
                                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Edit Patient
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview'
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('visits')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'visits'
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Visits
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('medications')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'medications'
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Medications
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('files')}
                                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'files'
                                                ? 'border-teal-500 text-teal-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Files
                                    </button>
                                </nav>
                            </div>

                            {activeTab === 'overview' && (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                                            <div className="space-y-3">
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Age:</span>
                                                    <span className="text-gray-900">{mockPatient.age}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Date of Birth:</span>
                                                    <span className="text-gray-900">{mockPatient.dob}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Gender:</span>
                                                    <span className="text-gray-900">{mockPatient.gender}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Email:</span>
                                                    <span className="text-gray-900">{mockPatient.email}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Phone:</span>
                                                    <span className="text-gray-900">{mockPatient.phone}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Address:</span>
                                                    <span className="text-gray-900">{mockPatient.address}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Emergency:</span>
                                                    <span className="text-gray-900">{mockPatient.emergencyContact}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                                            <div className="space-y-3">
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Blood Type:</span>
                                                    <span className="text-gray-900">{mockPatient.bloodType}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Allergies:</span>
                                                    <span className="text-gray-900">
                                                        {mockPatient.allergies.join(', ')}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Conditions:</span>
                                                    <span className="text-gray-900">
                                                        {mockPatient.chronicConditions.join(', ')}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-500 w-32">Primary Doctor:</span>
                                                    <span className="text-gray-900">{mockPatient.primaryDoctor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'visits' && (
                                <div className="p-6">
                                    <div className="mb-4 flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-900">Visit History</h3>
                                        {(userRole === 'doctor' || userRole === 'assistant') && (
                                            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                Add New Visit
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        {mockVisits.map((visit) => (
                                            <div
                                                key={visit.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => handleVisitClick(visit.id)}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-md font-medium text-gray-900">{visit.date} - {visit.diagnosis}</h4>
                                                        <p className="text-sm text-gray-600">Doctor: {visit.createdBy}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                            ${visit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            visit.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}>
                                                        {visit.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">{visit.diagnosisExplanation}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-600 font-medium">Medications:</p>
                                                        <p className="text-gray-800">{visit.medications.join(', ')}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600 font-medium">Treatment Plan:</p>
                                                        <p className="text-gray-800">{visit.treatmentPlan}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'medications' && (
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Current Medications</h3>
                                    <div className="space-y-4">
                                        {mockVisits[0].medications.map((med, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <h4 className="text-md font-medium text-gray-900 mb-2">{med}</h4>
                                                <div className="space-y-2 text-sm">
                                                    <p><span className="text-gray-600 font-medium">Purpose:</span> {mockVisits[0].medicationReason.split('.')[index]}</p>
                                                    <p><span className="text-gray-600 font-medium">Instructions:</span> {mockVisits[0].instructions.split('.')[index]}</p>
                                                    <p><span className="text-gray-600 font-medium">If Missed:</span> {mockVisits[0].missedDoseInstructions}</p>
                                                    <p><span className="text-gray-600 font-medium">Prescribed:</span> {mockVisits[0].date}</p>
                                                    <p><span className="text-gray-600 font-medium">Prescribed By:</span> {mockVisits[0].createdBy}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'files' && (
                                <div className="p-6">
                                    <div className="mb-4 flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-900">Medical Files</h3>
                                        {(userRole === 'doctor' || userRole === 'assistant') && (
                                            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                Upload File
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-md font-medium text-gray-900">Blood Test Results</h4>
                                                    <p className="text-sm text-gray-600">Uploaded on: 2023-10-15</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-red-100 rounded-lg mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-md font-medium text-gray-900">ECG Report</h4>
                                                    <p className="text-sm text-gray-600">Uploaded on: 2023-10-15</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-md font-medium text-gray-900">Chest X-Ray</h4>
                                                    <p className="text-sm text-gray-600">Uploaded on: 2023-09-01</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-md font-medium text-gray-900">Prescription</h4>
                                                    <p className="text-sm text-gray-600">Uploaded on: 2023-10-15</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
