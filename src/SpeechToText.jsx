import React, { useState } from "react";
import "./";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { Link } from "react-router-dom";

const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    console.log(event.target.value);
  };

  const startListening = () => SpeechRecognition.startListening({
    continuous: true,
    language: selectedLanguage,
  });

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ lang: selectedLanguage });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const languageOptions = [
    { value: "en-IN", label: "English" },
    { value: "hi-IN", label: "Hindi" },
    { value: "bn-IN", label: "Bengali" },
    { value: "ta-IN", label: "Tamil" },
    { value: "pa-IN", label: "Punjabi" },
    { value: "gu-IN", label: "Gujarati" },
    { value: "te-IN", label: "Telugu" },
    { value: "kn-IN", label: "Kannada" },
    { value: "ml-IN", label: "Malayalam" },
    { value: "ur-IN", label: "Urdu" },
  ];
  
  // const removeData = () => {
  //   setTextToCopy("");
  // };

  

  return (
    <>
      <div className="container bg-blue-300">
        <div className="flex flex-col justify-center items-center">
        <h2 className="text-white">Speech to Text Converter</h2>
        <p className="hover: text-white ">
          A simple Speech to Text system using React Js
        </p>
        </div>
        <div className="w-full flex justify-center mb-10 h-10 ">
        <select className="w-[70%] hover:bg-green-200 transition-all text-black "value={selectedLanguage} onChange={handleLanguageChange}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="main-content border-b-gray-700" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          
          <button  className="glow-on-hover" onClick={setCopied}>{isCopied ? "Copied!" : "Copy to clipboard"}</button>
          <button  className="glow-on-hover" onClick={startListening}>Start Listening</button>
          <button  className="glow-on-hover" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          {/* <button  className="glow-on-hover" onClick={removeData}> clear</button> */}
          <button className="glow-on-hover"><Link  to={"/textToSpeech" }> Text to Speech</Link>
</button>
                  </div>
      </div>
    </>
  );
};

export default SpeechToText;
