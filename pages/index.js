import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('patient');

  const handleLogin = (role) => {
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Head>
        <title>Swajarnika - Healthcare Portal</title>
        <meta name="description" content="Swajarnika Healthcare Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-teal-700 mb-4">Swajarnika</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              A comprehensive healthcare portal connecting hospitals, doctors, assistants, and patients
            </p>
          </div>

          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="flex border-b">
              {['patient', 'doctor', 'assistant', 'hospital', 'admin'].map((role) => (
                <button
                  key={role}
                  className={`flex-1 py-4 px-2 text-center capitalize transition-colors ${activeTab === role
                      ? 'bg-teal-500 text-white font-medium'
                      : 'hover:bg-teal-50 text-gray-600'
                    }`}
                  onClick={() => setActiveTab(role)}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'patient' && (
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Patient Portal</h2>
                    <p className="text-gray-600 mb-6">
                      Access your medical records, view diagnoses, test results, and medication instructions.
                      Chat with our AI assistant for any questions about your treatment.
                    </p>
                    <button
                      onClick={() => handleLogin('patient')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Patient Login
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Patient Portal"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'doctor' && (
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Portal</h2>
                    <p className="text-gray-600 mb-6">
                      Manage patient records, add diagnoses, prescribe medications, and review assistant inputs.
                      Complete control over patient data with easy editing and approval workflows.
                    </p>
                    <button
                      onClick={() => handleLogin('doctor')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Doctor Login
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Doctor Portal"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'assistant' && (
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Assistant Portal</h2>
                    <p className="text-gray-600 mb-6">
                      Quickly input patient data from doctor's notes, upload test results, and manage patient records.
                      Designed for efficiency with templates and quick-entry forms.
                    </p>
                    <button
                      onClick={() => handleLogin('assistant')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Assistant Login
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Assistant Portal"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'hospital' && (
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital Portal</h2>
                    <p className="text-gray-600 mb-6">
                      Manage your hospital's doctors, assistants, and patients. Add new staff members,
                      monitor patient care, and oversee healthcare delivery.
                    </p>
                    <button
                      onClick={() => handleLogin('hospital')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Hospital Login
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Hospital Portal"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'admin' && (
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Portal</h2>
                    <p className="text-gray-600 mb-6">
                      System administration for the Swajarnika platform. Manage hospitals, approve registrations,
                      and oversee the entire healthcare network.
                    </p>
                    <button
                      onClick={() => handleLogin('admin')}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Admin Login
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Admin Portal"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Records</h3>
              <p className="text-gray-600">
                All your medical data is encrypted and securely stored with strict access controls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments, get reminders, and manage your healthcare schedule effortlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Assistant</h3>
              <p className="text-gray-600">
                Get answers about your medications, treatment plans, and health concerns 24/7.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-teal-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Swajarnika</h2>
              <p className="text-teal-200">Transforming healthcare management</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-teal-200 hover:text-white transition-colors">About</a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-teal-200">
            &copy; {new Date().getFullYear()} Swajarnika Healthcare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
