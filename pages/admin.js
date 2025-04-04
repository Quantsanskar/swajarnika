"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  Calendar,
  FileText,
  User,
  Users,
  PlusCircle,
  Search,
  Upload,
  Save,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function AdminPanel() {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("patients")
  const [patients, setPatients] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    visitDate: new Date().toISOString().split("T")[0],
    diagnosis: "",
    diagnosisExplanation: "",
    possibleDiagnoses: "",
    testsOrdered: [],
    testReasons: {},
    testResults: {},
    medications: [],
    medicationReasons: {},
    medicationInstructions: {},
    missedDoseInstructions: {},
    treatmentPlan: "",
    notes: "",
    files: [],
  })

  // Mock data for demonstration
  useEffect(() => {
    if (isLoggedIn) {
      // This would be replaced with an actual API call
      setPatients([
        { id: "P001", name: "John Smith", age: 45, lastVisit: "2023-10-15", diagnosis: "Type 2 Diabetes" },
        { id: "P002", name: "Sarah Johnson", age: 32, lastVisit: "2023-10-12", diagnosis: "Hypertension" },
        { id: "P003", name: "Michael Brown", age: 58, lastVisit: "2023-10-10", diagnosis: "Arthritis" },
        { id: "P004", name: "Emily Davis", age: 27, lastVisit: "2023-10-05", diagnosis: "Migraine" },
        { id: "P005", name: "Robert Wilson", age: 63, lastVisit: "2023-09-28", diagnosis: "COPD" },
      ])
    }
  }, [isLoggedIn])

  // Common test types for dropdown
  const commonTests = [
    "Blood Test - Complete Blood Count",
    "Blood Test - Metabolic Panel",
    "Blood Test - Lipid Panel",
    "Urinalysis",
    "X-Ray",
    "CT Scan",
    "MRI",
    "Ultrasound",
    "EKG/ECG",
    "Stress Test",
  ]

  // Common medications for dropdown
  const commonMedications = [
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Levothyroxine",
    "Amlodipine",
    "Omeprazole",
    "Albuterol",
    "Gabapentin",
    "Hydrochlorothiazide",
    "Sertraline",
  ]

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
    }, 1000)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Add a test to the form
  const addTest = () => {
    setFormData((prev) => ({
      ...prev,
      testsOrdered: [...prev.testsOrdered, ""],
    }))
  }

  // Update a test in the form
  const updateTest = (index, value) => {
    const updatedTests = [...formData.testsOrdered]
    updatedTests[index] = value

    setFormData((prev) => ({
      ...prev,
      testsOrdered: updatedTests,
    }))
  }

  // Remove a test from the form
  const removeTest = (index) => {
    const updatedTests = formData.testsOrdered.filter((_, i) => i !== index)
    const updatedReasons = { ...formData.testReasons }
    const updatedResults = { ...formData.testResults }

    delete updatedReasons[formData.testsOrdered[index]]
    delete updatedResults[formData.testsOrdered[index]]

    setFormData((prev) => ({
      ...prev,
      testsOrdered: updatedTests,
      testReasons: updatedReasons,
      testResults: updatedResults,
    }))
  }

  // Add a medication to the form
  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, ""],
    }))
  }

  // Update a medication in the form
  const updateMedication = (index, value) => {
    const updatedMeds = [...formData.medications]
    updatedMeds[index] = value

    setFormData((prev) => ({
      ...prev,
      medications: updatedMeds,
    }))
  }

  // Remove a medication from the form
  const removeMedication = (index) => {
    const updatedMeds = formData.medications.filter((_, i) => i !== index)
    const updatedReasons = { ...formData.medicationReasons }
    const updatedInstructions = { ...formData.medicationInstructions }
    const updatedMissedDose = { ...formData.missedDoseInstructions }

    delete updatedReasons[formData.medications[index]]
    delete updatedInstructions[formData.medications[index]]
    delete updatedMissedDose[formData.medications[index]]

    setFormData((prev) => ({
      ...prev,
      medications: updatedMeds,
      medicationReasons: updatedReasons,
      medicationInstructions: updatedInstructions,
      missedDoseInstructions: updatedMissedDose,
    }))
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }))
  }

  // Remove a file from the form
  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Prepare payload for Django REST API
    const payload = {
      patient_id: formData.patientId,
      patient_name: formData.patientName,
      visit_date: formData.visitDate,
      diagnosis: formData.diagnosis,
      diagnosis_explanation: formData.diagnosisExplanation,
      possible_diagnoses: formData.possibleDiagnoses,
      tests: formData.testsOrdered.map((test) => ({
        name: test,
        reason: formData.testReasons[test] || "",
        result: formData.testResults[test] || "",
      })),
      medications: formData.medications.map((med) => ({
        name: med,
        reason: formData.medicationReasons[med] || "",
        instructions: formData.medicationInstructions[med] || "",
        missed_dose_instructions: formData.missedDoseInstructions[med] || "",
      })),
      treatment_plan: formData.treatmentPlan,
      notes: formData.notes,
      // Files would be handled separately with FormData for multipart/form-data
    }

    console.log("Payload for Django API:", payload)

    // Simulate API call
    setTimeout(() => {
      // Reset form or navigate as needed
      setIsLoading(false)
      setIsEditing(false)

      // Add to patient list if new patient
      if (!selectedPatient) {
        const newPatient = {
          id: formData.patientId,
          name: formData.patientName,
          lastVisit: formData.visitDate,
          diagnosis: formData.diagnosis || "Under evaluation",
        }

        setPatients((prev) => [...prev, newPatient])
      }

      // Reset form
      setFormData({
        patientId: "",
        patientName: "",
        visitDate: new Date().toISOString().split("T")[0],
        diagnosis: "",
        diagnosisExplanation: "",
        possibleDiagnoses: "",
        testsOrdered: [],
        testReasons: {},
        testResults: {},
        medications: [],
        medicationReasons: {},
        medicationInstructions: {},
        missedDoseInstructions: {},
        treatmentPlan: "",
        notes: "",
        files: [],
      })

      setSelectedPatient(null)
      setActiveTab("patients")
    }, 1500)
  }

  // Select a patient to view/edit
  const selectPatient = (patient) => {
    setSelectedPatient(patient)

    // In a real app, you would fetch the patient's data from the API
    // For now, we'll just set some mock data
    setFormData({
      patientId: patient.id,
      patientName: patient.name,
      visitDate: patient.lastVisit,
      diagnosis: patient.diagnosis,
      diagnosisExplanation: "Patient shows elevated blood glucose levels consistently over time.",
      possibleDiagnoses: "",
      testsOrdered: ["Blood Test - Complete Blood Count", "Blood Test - Metabolic Panel"],
      testReasons: {
        "Blood Test - Complete Blood Count": "To check for anemia and infection",
        "Blood Test - Metabolic Panel": "To assess kidney and liver function",
      },
      testResults: {
        "Blood Test - Complete Blood Count": "Normal",
        "Blood Test - Metabolic Panel": "Elevated glucose (180 mg/dL)",
      },
      medications: ["Metformin"],
      medicationReasons: {
        Metformin: "To lower blood glucose levels",
      },
      medicationInstructions: {
        Metformin: "Take one 500mg tablet twice daily with meals",
      },
      missedDoseInstructions: {
        Metformin:
          "If you miss a dose, take it as soon as you remember. If it's almost time for your next dose, skip the missed dose.",
      },
      treatmentPlan: "Follow up in 3 months. Maintain low-carb diet and exercise regimen.",
      notes: "Patient reports improved energy levels since last visit.",
      files: [],
    })

    setActiveTab("newRecord")
    setIsEditing(true)
  }

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Custom Button Component
  function Button({
    children,
    className = "",
    variant = "default",
    size = "default",
    type = "button",
    disabled = false,
    onClick,
  }) {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variantClasses = {
      default: "bg-[#0056b3] text-white hover:bg-[#004494]",
      outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
      ghost: "bg-transparent hover:bg-gray-100",
    }

    const sizeClasses = {
      default: "h-10 py-2 px-4 rounded-md text-sm",
      sm: "h-8 px-3 rounded-md text-xs",
    }

    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Custom Input Component
  function Input({
    className = "",
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    id,
    disabled = false,
    required = false,
  }) {
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
    )
  }

  // Custom Textarea Component
  function Textarea({
    className = "",
    placeholder,
    value,
    onChange,
    name,
    id,
    rows = 3,
    disabled = false,
    required = false,
  }) {
    return (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
    )
  }

  // Custom Card Component
  function Card({ children, className = "" }) {
    return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
  }

  // Custom Select Component
  function Select({ children, value, onValueChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#0056b3]"
        >
          <span>{value || placeholder}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-50"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                onSelect: (selectedValue) => {
                  onValueChange(selectedValue)
                  setIsOpen(false)
                },
              })
            })}
          </div>
        )}
      </div>
    )
  }

  function SelectItem({ children, value, onSelect }) {
    return (
      <div
        className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100"
        onClick={() => onSelect(value)}
      >
        {children}
      </div>
    )
  }

  // Custom Tabs Components
  function Tabs({ children, value, onValueChange, className = "" }) {
    return (
      <div className={className}>
        {React.Children.map(children, (child) => {
          if (child.type.name === "TabsList" || child.type.name === "TabsContent") {
            return React.cloneElement(child, {
              activeTab: value,
              onValueChange: onValueChange,
            })
          }
          return child
        })}
      </div>
    )
  }

  function TabsList({ children, className = "", activeTab, onValueChange }) {
    return (
      <div className={`inline-flex items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            activeTab: activeTab,
            onValueChange: onValueChange,
          })
        })}
      </div>
    )
  }

  function TabsTrigger({ children, value, activeTab, onValueChange, className = "" }) {
    const isActive = activeTab === value

    return (
      <button
        type="button"
        onClick={() => onValueChange(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
          ${isActive ? "bg-white text-[#0056b3] shadow-sm" : "text-gray-700 hover:bg-gray-200"} ${className}`}
      >
        {children}
      </button>
    )
  }

  function TabsContent({ children, value, activeTab, className = "" }) {
    if (activeTab !== value) return null

    return <div className={`mt-2 ${className}`}>{children}</div>
  }

  // Custom Table Components
  function Table({ children, className = "" }) {
    return (
      <div className="w-full overflow-auto">
        <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
      </div>
    )
  }

  function TableHeader({ children, className = "" }) {
    return <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
  }

  function TableBody({ children, className = "" }) {
    return <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
  }

  function TableRow({ children, className = "" }) {
    return <tr className={`border-b transition-colors hover:bg-gray-50/50 ${className}`}>{children}</tr>
  }

  function TableHead({ children, className = "" }) {
    return (
      <th
        className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
      >
        {children}
      </th>
    )
  }

  function TableCell({ children, className = "" }) {
    return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0056b3]">HealthStory AI</h1>
            <p className="text-gray-600 mt-2">Doctor's Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input id="email" type="email" placeholder="doctor@hospital.com" required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>

            <Button type="submit" className="w-full bg-[#0056b3] hover:bg-[#004494]" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-[#2a8d8d] hover:underline">
              Forgot password?
            </a>
          </div>
        </Card>
      </div>
    )
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#0056b3]">HealthStory AI</h1>
            <span className="ml-2 px-2 py-1 bg-[#e6b54c] text-white text-xs rounded-md">ADMIN</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Dr. Sarah Johnson</span>
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patients" className="text-base">
              <Users className="mr-2 h-4 w-4" />
              Patient List
            </TabsTrigger>
            <TabsTrigger value="newRecord" className="text-base">
              <FileText className="mr-2 h-4 w-4" />
              {isEditing ? "Edit Patient Record" : "New Patient Record"}
            </TabsTrigger>
          </TabsList>

          {/* Patient List Tab */}
          <TabsContent value="patients" className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Patient Directory</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedPatient(null)
                      setFormData({
                        patientId: "",
                        patientName: "",
                        visitDate: new Date().toISOString().split("T")[0],
                        diagnosis: "",
                        diagnosisExplanation: "",
                        possibleDiagnoses: "",
                        testsOrdered: [],
                        testReasons: {},
                        testResults: {},
                        medications: [],
                        medicationReasons: {},
                        medicationInstructions: {},
                        missedDoseInstructions: {},
                        treatmentPlan: "",
                        notes: "",
                        files: [],
                      })
                      setIsEditing(false)
                      setActiveTab("newRecord")
                    }}
                    className="bg-[#2a8d8d] hover:bg-[#237777]"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Patient
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.diagnosis}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => selectPatient(patient)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* New/Edit Patient Record Tab */}
          <TabsContent value="newRecord">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {isEditing ? `Edit Record: ${selectedPatient?.name}` : "New Patient Record"}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Quick entry form</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center">
                    <User className="mr-2 h-4 w-4 text-[#0056b3]" />
                    Patient Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                        Patient ID
                      </label>
                      <Input
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        placeholder="e.g., P001"
                        required
                        disabled={isEditing}
                      />
                    </div>

                    <div>
                      <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                        Patient Name
                      </label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        disabled={isEditing}
                      />
                    </div>

                    <div>
                      <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Visit Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="visitDate"
                          name="visitDate"
                          type="date"
                          value={formData.visitDate}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4 text-[#0056b3]" />
                    Diagnosis Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmed Diagnosis (if available)
                      </label>
                      <Input
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        placeholder="e.g., Type 2 Diabetes"
                      />
                    </div>

                    <div>
                      <label htmlFor="diagnosisExplanation" className="block text-sm font-medium text-gray-700 mb-1">
                        Explanation of Diagnosis
                      </label>
                      <Textarea
                        id="diagnosisExplanation"
                        name="diagnosisExplanation"
                        value={formData.diagnosisExplanation}
                        onChange={handleInputChange}
                        placeholder="Explain why this diagnosis was made"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label htmlFor="possibleDiagnoses" className="block text-sm font-medium text-gray-700 mb-1">
                        Possible Diagnoses (if uncertain)
                      </label>
                      <Textarea
                        id="possibleDiagnoses"
                        name="possibleDiagnoses"
                        value={formData.possibleDiagnoses}
                        onChange={handleInputChange}
                        placeholder="e.g., Could be pneumonia or bronchitis"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Tests */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-700 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-[#0056b3]" />
                      Tests Ordered
                    </h3>

                    <Button type="button" variant="outline" size="sm" onClick={addTest}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Test
                    </Button>
                  </div>

                  {formData.testsOrdered.length > 0 ? (
                    <div className="space-y-4">
                      {formData.testsOrdered.map((test, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-full mr-2">
                              <Select
                                value={test}
                                onValueChange={(value) => updateTest(index, value)}
                                placeholder="Select a test"
                              >
                                {commonTests.map((testOption) => (
                                  <SelectItem key={testOption} value={testOption}>
                                    {testOption}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeTest(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {test && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Why was this test ordered?
                                </label>
                                <Input
                                  value={formData.testReasons[test] || ""}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      testReasons: {
                                        ...prev.testReasons,
                                        [test]: e.target.value,
                                      },
                                    }))
                                  }}
                                  placeholder="e.g., To check blood sugar levels"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Test Results (if available)
                                </label>
                                <Input
                                  value={formData.testResults[test] || ""}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      testResults: {
                                        ...prev.testResults,
                                        [test]: e.target.value,
                                      },
                                    }))
                                  }}
                                  placeholder="e.g., 180 mg/dL"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 bg-white rounded border border-dashed border-gray-300">
                      No tests added yet. Click "Add Test" to begin.
                    </div>
                  )}
                </div>

                {/* Medications */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-700 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-[#0056b3]" />
                      Medications Prescribed
                    </h3>

                    <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>

                  {formData.medications.length > 0 ? (
                    <div className="space-y-4">
                      {formData.medications.map((med, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-full mr-2">
                              <Select
                                value={med}
                                onValueChange={(value) => updateMedication(index, value)}
                                placeholder="Select a medication"
                              >
                                {commonMedications.map((medOption) => (
                                  <SelectItem key={medOption} value={medOption}>
                                    {medOption}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeMedication(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {med && (
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Why was this medication prescribed?
                                </label>
                                <Input
                                  value={formData.medicationReasons[med] || ""}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      medicationReasons: {
                                        ...prev.medicationReasons,
                                        [med]: e.target.value,
                                      },
                                    }))
                                  }}
                                  placeholder="e.g., To lower blood pressure"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Medication Instructions
                                </label>
                                <Input
                                  value={formData.medicationInstructions[med] || ""}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      medicationInstructions: {
                                        ...prev.medicationInstructions,
                                        [med]: e.target.value,
                                      },
                                    }))
                                  }}
                                  placeholder="e.g., Take one tablet daily with food"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  What to do if a dose is missed
                                </label>
                                <Input
                                  value={formData.missedDoseInstructions[med] || ""}
                                  onChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      missedDoseInstructions: {
                                        ...prev.missedDoseInstructions,
                                        [med]: e.target.value,
                                      },
                                    }))
                                  }}
                                  placeholder="e.g., Take as soon as you remember unless it's almost time for next dose"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 bg-white rounded border border-dashed border-gray-300">
                      No medications added yet. Click "Add Medication" to begin.
                    </div>
                  )}
                </div>

                {/* Treatment Plan & Notes */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-[#0056b3]" />
                    Treatment Plan & Notes
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="treatmentPlan" className="block text-sm font-medium text-gray-700 mb-1">
                        Treatment Plan
                      </label>
                      <Textarea
                        id="treatmentPlan"
                        name="treatmentPlan"
                        value={formData.treatmentPlan}
                        onChange={handleInputChange}
                        placeholder="e.g., Follow up in 2 weeks, continue medication, start physical therapy"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information or observations"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium text-gray-700 flex items-center">
                    <Upload className="mr-2 h-4 w-4 text-[#0056b3]" />
                    Upload Files
                  </h3>

                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input type="file" id="fileUpload" multiple className="hidden" onChange={handleFileUpload} />
                      <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-[#2a8d8d]">Click to upload files</span>
                        <span className="text-xs text-gray-500 mt-1">
                          Upload test results, X-rays, or other relevant documents
                        </span>
                      </label>
                    </div>

                    {formData.files.length > 0 && (
                      <div className="bg-white rounded border border-gray-200 divide-y">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex justify-between items-center p-3">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFile(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setActiveTab("patients")
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#0056b3] hover:bg-[#004494]" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? "Update Record" : "Save Record"}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">© 2023 HealthStory AI. All rights reserved.</p>
            <p className="text-sm text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

