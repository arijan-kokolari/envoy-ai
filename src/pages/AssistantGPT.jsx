import React, { useEffect } from 'react';
import { useState } from 'react';
import ChatGPT from '../components/ChatGPT';

const AssistantGPT = () => {
    const [chain, setChain] = useState('BSC-Testnet');

    return (
        <div className="w-full h-[100vh] flex flex-col items-center gap-8 p-2 md:p-8" id="content">
            {/* <h1 className="text-primary text-3xl lg:text-4xl font-bold font-gilroy pb-1"> Assistant (GPT) </h1> */}
            <ChatGPT />
        </div>
    );
}

export default AssistantGPT;