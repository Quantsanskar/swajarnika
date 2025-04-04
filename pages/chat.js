"use client"

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Mock chat messages
const initialMessages = [
    {
        id: 1,
        sender: 'ai',
        text: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about your medications, treatment plan, or any health concerns you might have.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
];

export default function Chat() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState('patient'); // Default role for chat is patient
    const messagesEndRef = useRef(null);

    // For demo purposes, we'll simulate different user roles
    const toggleRole = () => {
        const roles = ['patient', 'doctor', 'assistant'];
        const currentIndex = roles.indexOf(userRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setUserRole(roles[nextIndex]);
    };

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            timestamp: new Date().toISOString(),
        };
        setMessages([...messages, userMessage]);
        setNewMessage('');
        setIsTyping(true);

        // Simulate AI response after a delay
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                sender: 'ai',
                text: generateAIResponse(newMessage),
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    // Simple AI response generator for demo
    const generateAIResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('medication') || lowerCaseMessage.includes('medicine')) {
            return "Based on your records, you're currently taking Lisinopril 10mg for hypertension and Atorvastatin 20mg for high cholesterol. Take Lisinopril once daily in the morning and Atorvastatin once daily in the evening with food. If you miss a dose, take it as soon as you remember, but skip it if it's almost time for your next dose. Never take a double dose.";
        } else if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('visit')) {
            return "Your next appointment is scheduled for November 12, 2023 at 10:30 AM with Dr. Sarah Johnson. Would you like me to send you a reminder the day before?";
        } else if (lowerCaseMessage.includes('blood pressure') || lowerCaseMessage.includes('hypertension')) {
            return "Your last blood pressure reading was 150/95 mmHg on October 15, 2023, which is considered high. Your doctor has prescribed Lisinopril to help lower it. It's important to take your medication regularly, reduce salt intake, exercise regularly, and manage stress. Would you like some tips on how to naturally lower your blood pressure?";
        } else if (lowerCaseMessage.includes('test') || lowerCaseMessage.includes('result')) {
            return "Your recent blood test from October 15, 2023 showed elevated cholesterol levels (240 mg/dL). Your doctor has prescribed Atorvastatin to help lower it. Your other results were within normal ranges. Would you like me to explain what these numbers mean?";
        } else if (lowerCaseMessage.includes('side effect') || lowerCaseMessage.includes('reaction')) {
            return "Common side effects of Lisinopril include dizziness, headache, and dry cough. Atorvastatin may cause muscle pain, digestive issues, and mild liver enzyme elevation. If you're experiencing severe side effects, please contact your doctor immediately. Are you currently experiencing any side effects?";
        } else {
            return "I understand you have a question about your health. To give you the most accurate information, could you provide more details about your specific concern? I can help with information about your medications, test results, treatment plan, or general health advice.";
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>AI Health Assistant | Swajarnika</title>
                <meta name="description" content="Chat with AI Health Assistant in Swajarnika Healthcare Portal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar userRole={userRole} toggleRole={toggleRole} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                <Sidebar userRole={userRole} activeTab="chat" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                <main className="flex-1 p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">AI Health Assistant</h1>
                        <p className="text-gray-600">
                            Ask questions about your medications, treatment, or health concerns.
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-200px)] flex flex-col">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                    {message.sender === 'ai' && (
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                                AI
                                            </div>
                                        </div>
                                    )}
                                    <div className={`rounded-lg py-3 px-4 max-w-3xl ${message.sender === 'user' ? 'bg-teal-100' : 'bg-gray-100'
                                        }`}>
                                        <p className="text-sm text-gray-800">{message.text}</p>
                                        <p className="text-xs text-gray-500 mt-1 text-right">{formatTime(message.timestamp)}</p>
                                    </div>
                                    {message.sender === 'user' && (
                                        <div className="flex-shrink-0 ml-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                                                You
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                            AI
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg py-3 px-4">
                                        <div className="flex space-x-1">
                                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSendMessage} className="flex">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your question here..."
                                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
