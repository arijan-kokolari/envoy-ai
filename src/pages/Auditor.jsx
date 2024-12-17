import { React, useContext, useEffect, useState } from "react";

import { decimalToEth } from "../utils/utils";
import { AiDataContext } from "../App";
// import { Scrollbars } from 'react-custom-scrollbars';

import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

const color_secondary = "#008ddf";

const Auditor = () => {
    const aiData = useContext(AiDataContext);
    const [auditType, setAuditType] = useState(0);

    useEffect(() => {
        // To do Something
    }, [aiData]);

    const onCodeAudit = function () {
        setAuditType(0);

        document.getElementById("btnCodeAudit").classList.remove("text-secondary");
        document.getElementById("btnCodeAudit").classList.remove("hover:text-primary");
        document.getElementById("btnCodeAudit").classList.add("bg-secondary");
        document.getElementById("btnCodeAudit").classList.add("hover:text-black");

        document.getElementById("btnTokenAudit").classList.add("text-secondary");
        document.getElementById("btnTokenAudit").classList.add("hover:text-primary");
        document.getElementById("btnTokenAudit").classList.remove("bg-secondary");
        document.getElementById("btnTokenAudit").classList.remove("hover:text-black");
    };

    const onTokenAudit = function () {
        setAuditType(1);

        document.getElementById("btnTokenAudit").classList.remove("text-secondary");
        document.getElementById("btnTokenAudit").classList.remove("hover:text-primary");
        document.getElementById("btnTokenAudit").classList.add("bg-secondary");
        document.getElementById("btnTokenAudit").classList.add("hover:text-black");

        document.getElementById("btnCodeAudit").classList.add("text-secondary");
        document.getElementById("btnCodeAudit").classList.add("hover:text-primary");
        document.getElementById("btnCodeAudit").classList.remove("bg-secondary");
        document.getElementById("btnCodeAudit").classList.remove("hover:text-black");
    };

    return (
        <>
            <div className="flex flex-col items-center w-full h-full" id="content">
                <ButtonGroup gap='1' className="border-secondary p-1">
                    <button id="btnCodeAudit" onClick={onCodeAudit} className="px-4 py-2 rounded-lg font-[500] text-base w-6/12 p-2 bg-secondary hover:text-black noeffect whitespace-nowrap">CODE AUDIT</button>
                    <button id="btnTokenAudit" onClick={onTokenAudit} className="px-4 py-2 rounded-lg font-[500] text-base w-6/12 p-2 text-secondary hover:text-primary noeffect whitespace-nowrap">TOKEN AUDIT</button>
                </ButtonGroup>
                <div className="w-full h-full bg-cardglass flex flex-col gap-6 px-4 py-2">
                    <div className="w-full border-secondary">
                        <div className="w-full p-2 pb-0">
                            {/* <Scrollbars> */}
                            <textarea className="w-full min-h-40 resize-none p-1 border-0 hover:bottom-0 focus:border-0"></textarea>
                            {/* </Scrollbars> */}
                        </div>
                        <div className="flex flex-end justify-end p-2 pt-0">
                            <button className="px-4 py-2 btn-primary">SUBMIT CODE</button>
                        </div>
                    </div>
                    <Tabs className='w-full h-full'>
                        <div className="w-full h-full flex flex-col gap-2">
                            <TabList id="tabList" className="flex-none p-1 border-secondary overflow-y-auto" borderColor={color_secondary}>
                                <Tab id="tabOverallRating" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickDepositTab(event)}>OVERALL RATING</Tab>
                                <Tab id="tabOverallView" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickUnstakeTab(event)}>OVERALL VIEW</Tab>
                                <Tab id="tabSummaryFinding" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickClaimTab(event)}>SUMMARY OF FINDINGS</Tab>
                                <Tab id="tabConfigAudit" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickClaimTab(event)}>CONFIGURATION AUDIT</Tab>
                                <Tab id="tabSummaryHuman" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickClaimTab(event)}>HUMAN SUMMARY</Tab>
                                <Tab id="tabSummaryContract" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickClaimTab(event)}>CONTRACT SUMMARY</Tab>
                                <Tab id="tabSummaryFunction" color={color_secondary} className="rounded-lg font-[500] text-base w-6/12 p-2 noeffect" _hover={{ color: 'white' }} _selected={{ color: color_secondary, bg: color_secondary, textColor: 'black' }} onClick={(event) => onClickClaimTab(event)}>FUNCTION SUMMARY</Tab>
                            </TabList>
                            <TabPanels className="flex-1 border-secondary">
                                <TabPanel className="h-full" tabIndex={0} aria-labelledby="tabOverallRating">
                                    <div className="flex text-primary-700">
                                    </div>
                                </TabPanel>
                                <TabPanel className="h-full" tabIndex={1} aria-labelledby="tabOverallView">
                                    <div className="flex text-primary-700">
                                    </div>
                                </TabPanel>
                                <TabPanel className="h-full" tabIndex={2} aria-labelledby="tabSummaryFinding">
                                    <div className="flex text-primary-700">
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </div>
                    </Tabs>

                    {/* <div className="h-full flex flex-col border-secondary gap-2">
                        <div className="flex-none h-[60px]"></div>
                        <div className="flex-1 border-secondary"></div>
                    </div> */}

                </div>
            </div>
        </>

    );
}

export default Auditor;