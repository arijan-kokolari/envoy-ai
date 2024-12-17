import { useState, useEffect, useContext } from "react";
import "../App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { BACKEND_URL, getCookie } from "../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiDataContext } from "../App";

const ChatGPT = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Envoy! Ask me anything!",
      sentTime: "just now",
      direction: "incoming",
      sender: "Envoy",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const aiData = useContext(AiDataContext);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      // let accessToken = getCookie("blockai");
      // if (!accessToken) {
      //   toast("Connect Wallet to access Block AI!");
      //   return;
      // }

      // if (aiData.balance <= 0) {
      //   toast("BlockAI token balance is 0. Need some BlockAI token to perform this action!");
      //   return;
      // }

      // const response = await processMessageToChatGPT([...messages, newMessage]);
      // const response = await axios.get(`${BACKEND_URL}/aichat?ask=${message}&accessToken=${accessToken}`);
      const response = await axios.post(
        `https://football-tipster-x-bot.onrender.com/chat`,
        {
          query: message,
        }
      );
      console.log("response: ", response);
      const resdata = response.data;
      // const content = resdata.choices[0]?.message?.content;
      const content = resdata.response
      if (content) {
        const chatGPTResponse = {
          message: content,
          direction: "incoming",
          sender: "Envoy",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="relative w-full h-full">
      <MainContainer>
        <ChatContainer>
          <MessageList
            autoScrollToBottom={true}
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? <TypingIndicator content="Envoy is typing" /> : null
            }
          >
            {messages.map((message, i) => {
              // console.log(message)
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Send a Message"
            onSend={handleSendRequest}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatGPT;
