import "./App.css";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import SpeechToText from "./SpeechToText";
import TextToSpeechPage from "./textToSpeech";

const App = () => {
  return(

     <BrowserRouter>
    <Routes>
      <Route path="/" element= {<SpeechToText/>}/>
      <Route path="textToSpeech" element={<TextToSpeechPage/>}/>
    </Routes></BrowserRouter>
  
  )
};

export default App;
