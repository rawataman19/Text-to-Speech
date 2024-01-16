import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TextToSpeechPage = () => {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const speakRef = useRef(null); // Reference to the SpeechSynthesisUtterance
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;

    const updateVoices = () => {
      const allVoices = synth.getVoices();
      setVoices(allVoices);
    };

    // Initial voices update
    updateVoices();

    // Add event listener for voiceschanged
    synth.addEventListener("voiceschanged", updateVoices);

    // Clean up event listener on component unmount
    return () => {
      synth.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  const gotoApp = () => {
    navigate("/");
  };

  const handleSpeak = async () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.voice = selectedVoice || voices[0];
      window.speechSynthesis.speak(utterance);
      speakRef.current = utterance; // Store the reference to the SpeechSynthesisUtterance
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const removeData = () => {
    setTextToSpeak("");
  };

  const handleVoiceChange = (e) => {
    const selectedVoiceName = e.target.value;
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    setSelectedVoice(selectedVoice);
  };

  return (
    <div className="container bg-blue-200">
      
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-white">Text to Speech Converter</h2>
        <p className="hover: text-white ">
          A simple Text to Speech system using React Js
        </p>
        </div>
      <div className="w-full flex justify-center mb-10 h-10 ">
        <select className="w-[70%] hover:bg-green-200 transition-all text-black " onChange={handleVoiceChange} value={selectedVoice?.name || ""}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="main-content w-full h-[300px] p-2"
        placeholder="Enter text to speak..."
        value={textToSpeak}
        onChange={(e) => setTextToSpeak(e.target.value)}
      />

      <div className="flex mb-5">
        <button className="glow-on-hover" onClick={handleSpeak}>Speak</button>
        <button className="glow-on-hover" onClick={() => window.speechSynthesis.cancel()}>Stop</button>
        <button className="glow-on-hover" onClick={removeData}>Clear</button>
        <button className="glow-on-hover" onClick={gotoApp}>Speech to Text</button>
      </div>
    </div>
  );
};

export default TextToSpeechPage;
