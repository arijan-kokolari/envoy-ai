import { Box } from "@chakra-ui/react";
import "./App.css";
// import "./style.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSidePane from "./components/LeftSidePane";
import Assistant from "./pages/Assistant";
import AssistantGPT from "./pages/AssistantGPT";
import Auditor from "./pages/Auditor";
export const AiDataContext = createContext();
export const AccessContext = createContext();

function App() {
  const [accessAllowed, setAccessAllowed] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    console.log("display: ", accessAllowed);
  }, [accessAllowed]);

  return (
    <Box>
      <main className="flex flex-row items-center m-auto p-4 h-screen">
        <Router>
          <AccessContext.Provider
            value={{
              balance: tokenBalance,
              accessAllowed: accessAllowed,
              setAccessAllowed: setAccessAllowed,
              setTokenBalance: setTokenBalance,
            }}
          >
            <LeftSidePane />
          </AccessContext.Provider>
          <AiDataContext.Provider value={{ balance: tokenBalance, price: 3.2 }}>
            <Routes>
              <Route path="/" element={<Assistant />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/assistant2" element={<AssistantGPT />} />
              <Route path="/auditor" element={<Auditor />} />
            </Routes>
          </AiDataContext.Provider>
        </Router>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
      />
    </Box>
  );
}

export default App;
