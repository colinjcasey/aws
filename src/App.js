import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [fname, setFirstName] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMessage = { role: "user", content: fname };
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);
    setFirstName(""); // Clear the input field

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: updatedChatHistory,
    };

    setIsProcessing(true);

    axios
      .post("https://api.openai.com/v1/chat/completions", requestData, {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const responseData = response.data.choices[0].message.content;
        const botMessage = { role: "assistant", content: responseData };
        const updatedChatHistoryWithResponse = [...updatedChatHistory, botMessage];

        setChatHistory(updatedChatHistoryWithResponse);
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error(error);
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  const styles = {
    container: {
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
      maxHeight: "100%",
      height: "70vh",
      margin: "0 auto",
      background: "#151414",
      display: "flex",
      flexDirection: "column",
    },
    chatContainer: {
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
      maxHeight: "100%",
      height: "67vh",
      margin: "0 auto",
      background: "#514f62",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
    },
    overflow: {
      overflowY: "scroll",
    },
    card: {
      borderRadius: "5px",
      padding: "20px",
      background: "#282727",
    },
    cardContent: {
      marginBottom: "0",
    },
    inputField: {
      marginBottom: "20px",
    },
    inputText: {
      border: "1px solid #e0e0e0",
      padding: "10px",
      borderRadius: "5px",
      width: "100%",
    },
    label: {
      fontWeight: "bold",
    },
    centerAlign: {
      textAlign: "center",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    messageContainer: {
      marginBottom: "1px",
    },
    userMessage: {
      fontWeight: "bold",
      color: "white",
      paddingLeft: "40px",
      paddingRight: "40px",
     backgroundColor: "#62606f",
     paddingBottom: "30px",
     paddingTop: "10px",
     
    },
    userName: {
      fontWeight: "bold",
      color: "lightblue",
     backgroundColor: "#62606f",
     paddingLeft: "20px",
     paddingTop: "10px",
    
    },
    botMessage: {
      fontWeight: "bold",
      color: "#25c925",
      background: "#3f3e54",
      paddingLeft: "40px",
      paddingRight: "40px",
      whiteSpace: "pre-wrap", // Add this line to preserve line breaks
      paddingBottom: "30px",
      paddingTop: "5px",
    },

    botName: {
      fontWeight: "bold",
      color: "lightblue",
      background: "#3f3e54",
      paddingLeft: "20px",
      paddingTop: "10px",
      whiteSpace: "pre-wrap", // Add this line to preserve line breaks

    },

    
    botMessagePre: {
      backgroundColor: "#282727",
      padding: "10px",
      whiteSpace: "pre-wrap",
      color: "#25c925",
      paddingLeft: "20px",
    },
  };

  return (
    <div className="container" style={styles.container}>
      <div className="card" style={styles.card}>
        <div className="card-content" style={styles.overflow}>
          <header className="center-align" style={styles.centerAlign}>
            <h2 className="font-semibold text-white">
              ColinGPT -  The Ultamate Assistant
            </h2>
          </header>
          <div
            id="chat-container"
            style={styles.chatContainer}
            ref={chatContainerRef}
          >
     {chatHistory.map((message, index) => (
  <div key={index} style={styles.messageContainer}>
    {message.role === "user" ? (
      <div >
      <p className="user-message" style={styles.userName}>
        User:
      </p>
      <p className="user-message" style={styles.userMessage}>
         {message.content}
      </p>
      </div>
    ) : (
      <div>
        <p className="bot-message" style={styles.botName}>
          ColinGPT:
        </p>
        <pre className="bot-message" style={styles.botMessage}>
          {message.content}
        </pre>
      </div>
    )}
  </div>
))}

            {isProcessing && (
              <p className="bot-message" style={styles.botMessagePre}>
                ColinGPT is processing your question...
              </p>
            )}
          </div>
         
        </div><br></br>
        <form onSubmit={handleSubmit} className="input-field" style={styles.inputField}>
            <label htmlFor="fname" className="text-white" style={styles.label}>
              Question:
            </label>
            <br />
            <input
              id="fname"
              name="fname"
              style={styles.inputText}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br /><br />
            <button
              type="submit"
              style={styles.button}
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              <span className="text-800 font-bold">Send to GPT</span>
            </button>
          </form>
      </div>
    </div>
  );
}

export default App;
