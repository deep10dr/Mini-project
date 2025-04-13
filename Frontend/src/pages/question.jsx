import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/question.css';
import axios from 'axios';
import { BsFillSendFill } from "react-icons/bs";
import Loader from '../assets/gifs/Multi Shape Loader.gif';

function Question() {
    const [userquery, setUserQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Focus input field on initial render
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Emoji mapping for medical terms
    const emojiResponses = {
        "fever": "🤒",
        "headache": "🤕",
        "cough": "😷",
        "disease": "🏥",
        "treatment": "💊",
        "doctor": "👨‍⚕️",
        "nurse": "👩‍⚕️",
        "health": "❤️",
        "pain": "🤕",
        "infection": "🦠",
        "virus": "🦠",
        "hospital": "🏥",
        "medication": "💊",
        "recovery": "💪",
        "surgery": "🔪",
        "immune": "🛡️",
        "vaccine": "💉",
        "allergy": "🤧",
        "diagnosis": "🩺",
        "treatments": "🩹"
    };

    // Function to replace keywords with emojis
    function addEmojisToResponse(text) {
        let modifiedText = text;
        Object.keys(emojiResponses).forEach((keyword) => {
            const regex = new RegExp(`\\b${keyword}\\b`, "gi");
            modifiedText = modifiedText.replace(regex, `${keyword} ${emojiResponses[keyword]}`);
        });
        return modifiedText;
    }

    // Handle user input change
    function handleChange(e) {
        setUserQuery(e.target.value);
    }

    // Handle message submission
    async function handleSubmit() {
        if (!userquery.trim()) {
            setError("⚠️ Please enter a message before sending.");
            return;
        }
        setError(null);
        setLoading(true);

        const newMessage = { text: userquery, sender: "user" };
        setMessages((prev) => [...prev, newMessage]);
        setUserQuery('');

        try {
            const response = await axios.post("http://localhost:8000/chatbot", { question: userquery });

            if (response.data && response.data.answer) {
                const botMessage = { text: response.data.answer, sender: "bot" };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                throw new Error("Bot did not return a valid response.");
            }
        } catch (err) {
            setError("❌ Failed to connect to the chatbot. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Scroll to the latest message when messages update
    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center flex-column h-100 m-0 p-1'>
            {/* Chat Messages */}
            <div className='container-fluid w-100 message-outer-div d-flex flex-column m-0 p-0'>
                <div className='h-100 w-100  inner-div-message' style={{ overflow: 'auto' }}>
                    <div className='container flex-column d-flex' style={{ height: 'max-content' }} aria-live="polite">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message-bubble d-flex p-2 bg-light ${msg.sender === "user" ? 'user' : 'bot'}  mt-2`}>
                                {msg.sender === "bot" ? addEmojisToResponse(msg.text) : msg.text}
                            </div>
                        ))}

                        {/* Loading Animation for Bot Response */}
                        {loading && (
                            <div className="d-flex mt-2">
                                <img src={Loader} alt="Loading..." className="loading-animation" />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger mt-2 p-2">{error}</div>}

            {/* Input Box */}
            <div className='container-fluid bg-light question-outer-div align-items-center d-flex mb-2 mb-sm-1 mt-2'>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Ask the question here...'
                    className=' w-75 input-query'
                    onChange={handleChange}
                    value={userquery}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    disabled={loading}
                />
                <div className='w-25 h-100 d-flex justify-content-center align-items-center'>
                    <button className='btn-send h-75' onClick={handleSubmit} aria-label="Send Message" disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm"></span> : <BsFillSendFill />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Question;
