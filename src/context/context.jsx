import { createContext, useEffect,useState} from "react";
import main from "../config/gemini.js"; // Import the main function from gemini.js

export const Context = createContext();

const ContextProvider = (props) => {
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [recentPrompt,setRecentPrompt] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showing,setShowResult]= useState(false);
    const [result, setResult] = useState("");
  // Function to send a custom prompt to gemini.js
const newChat=()=>{
    setLoading(false);
    setShowResult(false)
}
   const delayResult= (response) =>{
    setResult('');
    const responseArray = response.split("");
    responseArray.forEach((char,index)=>{
      const dynamicDelay = Math.max(10, 100 - index); // Gradually decrease delay, with a minimum of 10ms
      setTimeout(() =>{
        setResult((prev) => prev + char);
      },10*index );
    })
  
   }
  const runPrompt = async (prompt) => {
    try {
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setPrevPrompts((prev) =>{ if(!prev.includes(prompt)){
          return [...prev, prompt];}
          return prev; });
      const response = await main(prompt); // Call the main function with the prompt
      console.log("Gemini Response:", response);
     
      delayResult(response); // Log the response (optional)
      setLoading(false);
      
      // Return the response to the caller
    } catch (error) {
      console.error("Error running prompt:", error);
      throw error; // Handle errors appropriately
    }
  };

 
  // Context value to share across components
  const contextValue = {
    runPrompt,
    newChat,
    showing,
    result,
    loading,
    recentPrompt,
    prevPrompts,// Expose the runPrompt function
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;