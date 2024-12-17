import React, { useEffect } from 'react';
import { useState } from 'react';

const Assistant = () => {
    const [chain, setChain] = useState('Canxium');

    return (
        <div className="flex flex-col items-center w-full h-full gap-8" id="content">
            {/* <h1 className="text-primary text-3xl lg:text-4xl font-bold font-gilroy pb-1"> Assistant </h1> */}
            <iframe
                src="https://console.oortech.com/agent/ulV9Okp7_lRSJTdMRuNfq/bOHMXaRl_QbpeMwXxfmG4"
                width="100%"
                height="100%"
                frameBorder="0"
            ></iframe>
        </div>
    );
}

export default Assistant;