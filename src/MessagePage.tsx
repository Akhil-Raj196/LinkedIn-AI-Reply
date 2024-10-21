import React, { useState, useRef, useEffect } from "react";
import logo from './logo.svg';
import generate from './generate.svg'; 
import arrow from './arrow.svg';
import regenerateIcon from './regenerate.svg';

const MessagePage = () => {
  const [isAiPopupOpen, setAiPopupOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState(""); 
  const [prompt, setPrompt] = useState("");
  const [isGenerated, setIsGenerated] = useState(false); 
  const [isFocused, setIsFocused] = useState(false); 
  const [sentMessage, setSentMessage] = useState("");

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const avtar = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1729382400&semt=ais_hybrid"

  const toggleAiPopup = () => {
    setAiPopupOpen((prev) => !prev);

    if (!isAiPopupOpen) {
      setPrompt(""); 
      setGeneratedMessage("");
      setIsGenerated(false); 
    }
  };

  const handleGenerate = () => {
    setGeneratedMessage(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
    setIsGenerated(true);
    setPrompt("");
  };

  const handleInsert = () => {
    setMessage(generatedMessage); 
    setIsIconVisible(false)
    setAiPopupOpen(false); 
  };

  const handleSend = () => {
    setSentMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto"; 
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`; 
    }
  }, [message]); 

  return (
    <div className="h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-4 h-auto">

          <div className="author mt-4 flex justify-between items-center space-x-4 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                <img src={avtar} alt="User Avatar" className="w-8 h-8 rounded-full" />
              </div>
              <span className="text-gray-800">Akhilesh Rajak</span>
            </div>
            <span className="text-gray-600 text-sm">{new Date().toString().slice(0, 24)}</span>
          </div>
          {sentMessage && (
            <p className="text-gray-700 bg-gray-100 px-2 py-2">{sentMessage}</p>
          )}

        <div className="border-t border-gray-300 p-2 mt-4 relative">
          <textarea
            ref={messageRef} 
            className="w-full p-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none resize-none overflow-hidden"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}  
            rows={1} 
          />

          {isIconVisible && isFocused && (  
            <img
              src={logo}
              alt="Sticky Icon"
              className="absolute right-4 bottom-6 w-4 h-4 cursor-pointer" 
              onClick={toggleAiPopup}
            />
          )}
        </div>

        <div className="flex justify-end mt-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-full cursor-pointer"
            onClick={handleSend}
          >
             Send
          </button>
        </div>
       
        {isAiPopupOpen && (
          <div className="absolute left-0 bottom-64 w-full flex justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 max-w-lg w-full">

              {isGenerated && (
                <div className="p-3 bg-blue-100 text-blue-800 rounded-lg">
                  {`Reply thanking for the opportunity`}
                </div>
              )}

              {isGenerated && (
                <div className="p-3 bg-blue-100 text-blue-800 rounded-lg">
                  {generatedMessage}
                </div>
              )}

              <input
                className="w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Your prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="flex justify-end space-x-4">
                {isGenerated && (
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg flex items-center space-x-2"
                    onClick={handleInsert}
                  >
                    <img src={arrow} alt="Arrow" className="w-4 h-4" />
                    <span>Insert</span>
                  </button>
                )}

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={handleGenerate}
                >
                  <img src={isGenerated ? regenerateIcon : generate} alt="Generate" className="w-4 h-4" />
                  <span>{isGenerated ? "Regenerate" : "Generate"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
