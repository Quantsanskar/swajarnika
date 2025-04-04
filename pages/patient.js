// PatientPortal.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PatientPortal = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [patient, setPatient] = useState(null);
    const [visits, setVisits] = useState([]);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [visitFiles, setVisitFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check authentication on page load
    useEffect(() => {
        // Get user data from localStorage (set during login)
        const storedUser = localStorage.getItem('userData');

        if (!storedUser) {
            router.push('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);

            // Only patients can access this page
            if (parsedUser.role !== 'patient') {
                router.push('/unauthorized');
                return;
            }

            setUserData(parsedUser);
            fetchPatientData(parsedUser.id);
        } catch (err) {
            console.error('Error parsing user data:', err);
            localStorage.removeItem('userData');
            router.push('/login');
        }
    }, [router]);

    // Fetch patient data based on user ID
    const fetchPatientData = async (userId) => {
        setIsLoading(true);
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('Authentication token not found');
            }

            // Configure headers with token
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            // Find the patient record linked to this user account
            const patientResponse = await axios.get(
                `/api/patients/?user=${userId}`,
                config
            );

            if (patientResponse.data.length === 0) {
                throw new Error('No patient record found');
            }

            const patientData = patientResponse.data[0];
            setPatient(patientData);

            // Fetch all visits for this patient
            await fetchPatientVisits(patientData.id, config);

        } catch (err) {
            console.error('Error fetching patient data:', err);
            setError('Failed to load your health information. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch all patient visits
    const fetchPatientVisits = async (patientId, config) => {
        try {
            const visitsResponse = await axios.get(
                `/api/visits/?patient=${patientId}&status=approved`,
                config
            );

            // Sort visits by date, newest first
            const sortedVisits = visitsResponse.data.sort((a, b) =>
                new Date(b.date_of_visit) - new Date(a.date_of_visit)
            );

            setVisits(sortedVisits);

            // Select the most recent visit by default if available
            if (sortedVisits.length > 0) {
                setSelectedVisit(sortedVisits[0]);
                fetchVisitFiles(sortedVisits[0].id, config);
            }
        } catch (err) {
            console.error('Error fetching visits:', err);
            setError('Failed to load your visit history.');
        }
    };

    // Fetch files for a specific visit
    const fetchVisitFiles = async (visitId, config) => {
        try {
            const filesResponse = await axios.get(
                `/api/file-uploads/?visit=${visitId}`,
                config
            );
            setVisitFiles(filesResponse.data);
        } catch (err) {
            console.error('Error fetching files:', err);
            setVisitFiles([]);
        }
    };

    // Handle visit selection
    const handleVisitSelect = async (visit) => {
        setSelectedVisit(visit);
        const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        await fetchVisitFiles(visit.id, config);
    };

    // Format date from ISO to readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-2">Loading your health information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600">Error</h2>
                    <p className="mt-2">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => router.push('/login')}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">HealthStory AI</h1>
                    <div className="flex items-center">
                        {userData && (
                            <span className="mr-4">Welcome, {userData.name}</span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto p-4 md:p-6">
                {patient ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-6">Your Health Story</h2>

                        {/* Visit selector */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3">Your Visits</h3>
                            {visits.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {visits.map((visit) => (
                                        <button
                                            key={visit.id}
                                            onClick={() => handleVisitSelect(visit)}
                                            className={`px-4 py-2 rounded-md transition ${selectedVisit && selectedVisit.id === visit.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                                }`}
                                        >
                                            {formatDate(visit.date_of_visit)}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No visit records available yet.</p>
                            )}
                        </div>

                        {/* Selected visit details */}
                        {selectedVisit && (
                            <div className="border-t pt-6">
                                <h3 className="text-xl font-semibold mb-4">
                                    Visit on {formatDate(selectedVisit.date_of_visit)}
                                </h3>

                                {/* Diagnosis section */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium mb-2 text-blue-700">Your Diagnosis</h4>
                                    {selectedVisit.diagnosis ? (
                                        <div className="bg-blue-50 p-4 rounded-md">
                                            <p className="font-medium">Your doctor diagnosed you with: {selectedVisit.diagnosis}</p>
                                            {selectedVisit.diagnosis_explanation && (
                                                <p className="mt-2">{selectedVisit.diagnosis_explanation}</p>
                                            )}
                                        </div>
                                    ) : selectedVisit.possible_diagnoses ? (
                                        <div className="bg-yellow-50 p-4 rounded-md">
                                            <p className="font-medium">Possible diagnosis:</p>
                                            <p className="mt-2">{selectedVisit.possible_diagnoses}</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No diagnosis information available.</p>
                                    )}
                                </div>

                                {/* Tests section */}
                                {(selectedVisit.tests_ordered || selectedVisit.test_reason || selectedVisit.test_results) && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-medium mb-2 text-blue-700">Tests</h4>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            {selectedVisit.tests_ordered && (
                                                <p className="mb-2"><span className="font-medium">Tests ordered:</span> {selectedVisit.tests_ordered}</p>
                                            )}
                                            {selectedVisit.test_reason && (
                                                <p className="mb-2"><span className="font-medium">Why the test was given:</span> {selectedVisit.test_reason}</p>
                                            )}
                                            {selectedVisit.test_results && (
                                                <p><span className="font-medium">Results:</span> {selectedVisit.test_results}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Medications section */}
                                {(selectedVisit.medications || selectedVisit.medication_reason ||
                                    selectedVisit.instructions || selectedVisit.missed_dose_instructions) && (
                                        <div className="mb-6">
                                            <h4 className="text-lg font-medium mb-2 text-blue-700">Your Medications</h4>
                                            <div className="bg-green-50 p-4 rounded-md">
                                                {selectedVisit.medications && (
                                                    <p className="mb-2"><span className="font-medium">Prescribed:</span> {selectedVisit.medications}</p>
                                                )}
                                                {selectedVisit.medication_reason && (
                                                    <p className="mb-2"><span className="font-medium">Why:</span> {selectedVisit.medication_reason}</p>
                                                )}
                                                {selectedVisit.instructions && (
                                                    <p className="mb-2"><span className="font-medium">How to take it:</span> {selectedVisit.instructions}</p>
                                                )}
                                                {selectedVisit.missed_dose_instructions && (
                                                    <p><span className="font-medium">If you miss a dose:</span> {selectedVisit.missed_dose_instructions}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Treatment plan section */}
                                {selectedVisit.treatment_plan && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-medium mb-2 text-blue-700">Treatment Plan</h4>
                                        <div className="bg-purple-50 p-4 rounded-md">
                                            <p>{selectedVisit.treatment_plan}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Additional notes */}
                                {selectedVisit.notes && (
                                    <div className="mb-6">
                                        <h4 className="text-lg font-medium mb-2 text-blue-700">Additional Notes</h4>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <p>{selectedVisit.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Uploaded files */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium mb-2 text-blue-700">Medical Files</h4>
                                    {visitFiles.length > 0 ? (
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <ul className="divide-y divide-gray-200">
                                                {visitFiles.map((file) => (
                                                    <li key={file.id} className="py-3 first:pt-0 last:pb-0">
                                                        <div className="flex items-center">
                                                            <div className="flex-1">
                                                                <p className="font-medium">{file.description}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Uploaded on {formatDate(file.uploaded_at)}
                                                                </p>
                                                            </div>
                                                            <a
                                                                href={file.file_path}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                            >
                                                                View
                                                            </a>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No files were uploaded for this visit.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p>No patient data available. Please contact your healthcare provider.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 p-4 border-t">
                <div className="container mx-auto text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} HealthStory AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PatientPortal;