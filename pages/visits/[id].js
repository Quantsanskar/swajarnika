import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

// Mock visit data
const mockVisit = {
    id: 101,
    patientId: 1,
    patientName: 'John Doe',
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
    createdAt: '2023-10-15T14:30:00Z',
};

// Mock files
const mockFiles = [
    { id: 1, name: 'Blood Test Results', type: 'pdf', uploadedAt: '2023-10-15T15:00:00Z' },
    { id: 2, name: 'ECG Report', type: 'pdf', uploadedAt: '2023-10-15T15:05:00Z' },
];

export default function VisitDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState('doctor'); // Default role for demo
    const [isEditing, setIsEditing] = useState(false);
    const [visitData, setVisitData] = useState(mockVisit);

    // For demo purposes, we'll simulate different user roles
    const toggleRole = () => {
        const roles = ['doctor', 'assistant', 'patient'];
        const currentIndex = roles.indexOf(userRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setUserRole(roles[nextIndex]);
    };

    const handlePatientClick = () => {
        router.push(`/patients/${mockVisit.patientId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // In a real app, you would save the data to the server here
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Visit Details | Swajarnika</title>
                <meta name="description" content="Visit Details in Swajarnika Healthcare Portal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar userRole={userRole} toggleRole={toggleRole} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                <Sidebar userRole={userRole} activeTab="visits" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                <main className="flex-1 p-6">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Visit Details</h1>
                            <p className="text-gray-600">
                                Patient: <span className="text-teal-600 cursor-pointer hover:underline" onClick={handlePatientClick}>{visitData.patientName}</span> | Date: {visitData.date}
                            </p>
                        </div>
                        {(userRole === 'doctor' || userRole === 'assistant') && !isEditing && (
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Edit Visit
                                </button>
                                {userRole === 'doctor' && (
                                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Delete Visit
                                    </button>
                                )}
                            </div>
                        )}
                        {isEditing && (
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleSave}
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => {
                                        setVisitData(mockVisit);
                                        setIsEditing(false);
                                    }}
                                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Diagnosis</h3>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Diagnosis
                                                </label>
                                                <input
                                                    type="text"
                                                    id="diagnosis"
                                                    name="diagnosis"
                                                    value={visitData.diagnosis}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="diagnosisExplanation" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Explanation
                                                </label>
                                                <textarea
                                                    id="diagnosisExplanation"
                                                    name="diagnosisExplanation"
                                                    value={visitData.diagnosisExplanation}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="possibleDiagnoses" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Possible Diagnoses (if uncertain)
                                                </label>
                                                <textarea
                                                    id="possibleDiagnoses"
                                                    name="possibleDiagnoses"
                                                    value={visitData.possibleDiagnoses || ''}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">{visitData.diagnosis}</h4>
                                                <p className="text-gray-600">{visitData.diagnosisExplanation}</p>
                                            </div>
                                            {visitData.possibleDiagnoses && (
                                                <div>
                                                    <h4 className="text-md font-medium text-gray-800">Possible Diagnoses:</h4>
                                                    <p className="text-gray-600">{visitData.possibleDiagnoses}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tests</h3>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="testsOrdered" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Tests Ordered
                                                </label>
                                                <input
                                                    type="text"
                                                    id="testsOrdered"
                                                    name="testsOrdered"
                                                    value={Array.isArray(visitData.testsOrdered) ? visitData.testsOrdered.join(', ') : visitData.testsOrdered}
                                                    onChange={(e) => handleChange({
                                                        target: {
                                                            name: 'testsOrdered',
                                                            value: e.target.value.split(', ')
                                                        }
                                                    })}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="testReason" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Reason for Tests
                                                </label>
                                                <textarea
                                                    id="testReason"
                                                    name="testReason"
                                                    value={visitData.testReason}
                                                    onChange={handleChange}
                                                    rows={2}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="testResults" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Test Results
                                                </label>
                                                <textarea
                                                    id="testResults"
                                                    name="testResults"
                                                    value={visitData.testResults}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Tests Ordered:</h4>
                                                <p className="text-gray-600">{Array.isArray(visitData.testsOrdered) ? visitData.testsOrdered.join(', ') : visitData.testsOrdered}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Reason for Tests:</h4>
                                                <p className="text-gray-600">{visitData.testReason}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-medium text-gray-800">Test Results:</h4>
                                                <p className="text-gray-600">{visitData.testResults}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Medications</h3>
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-1">
                                            Medications
                                        </label>
                                        <input
                                            type="text"
                                            id="medications"
                                            name="medications"
                                            value={Array.isArray(visitData.medications) ? visitData.medications.join(', ') : visitData.medications}
                                            onChange={(e) => handleChange({
                                                target: {
                                                    name: 'medications',
                                                    value: e.target.value.split(', ')
                                                }
                                            })}
                                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="medicationReason" className="block text-sm font-medium text-gray-700 mb-1">
                                            Reason for Medications
                                        </label>
                                        <textarea
                                            id="medicationReason"
                                            name="medicationReason"
                                            value={visitData.medicationReason}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                                            Instructions
                                        </label>
                                        <textarea
                                            id="instructions"
                                            name="instructions"
                                            value={visitData.instructions}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="missedDoseInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                                            Missed Dose Instructions
                                        </label>
                                        <textarea
                                            id="missedDoseInstructions"
                                            name="missedDoseInstructions"
                                            value={visitData.missedDoseInstructions}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Array.isArray(visitData.medications) ? visitData.medications.map((med, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="text-md font-medium text-gray-900 mb-2">{med}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600 font-medium">Purpose:</p>
                                                    <p className="text-gray-800">{visitData.medicationReason.split('.')[index]?.trim() || visitData.medicationReason}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 font-medium">Instructions:</p>
                                                    <p className="text-gray-800">{visitData.instructions.split('.')[index]?.trim() || visitData.instructions}</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <p className="text-gray-600 font-medium">If Missed:</p>
                                                    <p className="text-gray-800">{visitData.missedDoseInstructions}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-gray-600">No medications prescribed.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Plan</h3>
                            {isEditing ? (
                                <div>
                                    <textarea
                                        id="treatmentPlan"
                                        name="treatmentPlan"
                                        value={visitData.treatmentPlan}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-600">{visitData.treatmentPlan}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Files</h3>
                                {(userRole === 'doctor' || userRole === 'assistant') && (
                                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Upload File
                                    </button>
                                )}
                            </div>
                            <div className="space-y-3">
                                {mockFiles.map((file) => (
                                    <div key={file.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-md font-medium text-gray-900">{file.name}</h4>
                                            <p className="text-sm text-gray-600">Uploaded on: {new Date(file.uploadedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <button className="text-teal-600 hover:text-teal-800 font-medium text-sm">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                            {isEditing ? (
                                <div>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={visitData.notes}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-600">{visitData.notes}</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
