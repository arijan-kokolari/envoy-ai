import React, { useState, useContext, useRef, useEffect } from 'react';
import whiteLogo from '../assets/logo.png';
// import '../ConnectWallet';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane, faEarthAmericas, faTablet } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

library.add(faTwitter, faTelegram, faEarthAmericas, faUser, faPaperPlane, faTablet)

import { useAccount, useDisconnect } from 'wagmi'
import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
} from '@web3modal/wagmi/react'
import DropdownToken from './DropDownToken';
import { AccessContext } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { WagmiContext } from "wagmi";
import axios from "axios";
import { BACKEND_URL, BLOCKAI_TOKEN_ADDR, TREASURY_ADDR, setCookie, getCookie, eraseCookie, decimalToEth, displayAddress, formatNumberWithCommas, decimalFromEth } from "../utils/utils";
import { erc20Abi } from "viem";
import { treasuryABI } from "../data/abi/treasuryAbi"

const navs = [
  {
    name: "> AI CRYPTO DATA",
    src: '/',
  },
  {
    name: "> AI ASSISTANT(GPT)",
    src: '/assistant2',
  },
  {
    name: "> AI AUDITOR",
    src: '/auditor',
  },
];

const LeftSidePane = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const config = useContext(WagmiContext);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [accessAllowed, setAccessAllowed] = useState(false);

  const accessAllowedContext = useContext(AccessContext);

  const [currentToken, setCurrentToken] = useState("ETH");
  // 4. Use modal hook
  const modal = useWeb3Modal()
  const state = useWeb3ModalState()
  const events = useWeb3ModalEvents()
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme()

  const [amount, setAmount] = useState(0);
  const [depositingAmount, setDepositingAmount] = useState(0);

  // Handler hook for when Outside click dropdown close
  let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });

    return domNode;
  };

  async function connectWallet() {
    modal.open();
  }

  async function disconnectWallet() {
    modal.open();
  }

  const navigate = useNavigate();

  let domNode = useClickOutside(() => {
    let leftpane = document.getElementById('leftpane');
    leftpane.classList.add('hidden-leftpane');
  });

  useEffect(() => {
    if (!address) {
      console.log(getCookie("blockai"));
      eraseCookie("blockai");
      setAccessAllowed(false);
      accessAllowedContext.setAccessAllowed(false);
      return;
    }

    // get balance of the wallet
    async function fetchData(accessToken) {
      if (!address) return;

      const resData = await readContract(config, {
        address: BLOCKAI_TOKEN_ADDR,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      });
      setTokenBalance(resData);
      console.log(`resData: ${resData}`)

      const response = await axios.get(`${BACKEND_URL}/aichat?ask=${"login"}&accessToken=${accessToken}`);
      console.log("response: ", response);
      const resdata = response.data;

      if (resdata.data == "expired") {
        console.log("expired")
        setAccessAllowed(false);
        accessAllowedContext.setAccessAllowed(false);
        toast("Expired. You should deposit token!")
      }
      else if (resdata.data == "no deposit") {
        console.log("no deposit")
        setAccessAllowed(false);
        accessAllowedContext.setAccessAllowed(false);
        toast("No deposit. You should depsoit token!")
      }
      else {
        setAccessAllowed(true);
        accessAllowedContext.setAccessAllowed(true);
      }
    }
    // create or get user info
    try {
      axios.post(`${BACKEND_URL}/user/login`,
        { wallet: address }
      ).then((res) => {
        if (res.status == 200) {
          let accessToken = res.data.accessToken;

          setCookie("blockai", accessToken);
          fetchData(accessToken);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    catch (e) {
      console.log(e);
      console.log("Error on ommunication with the backend!");
    }
  }, [address]);


  const onChangeAmount = (event) => {
    setDepositingAmount(decimalFromEth(event.target.value));
    setAmount(event.target.value);
    console.log(`amount: ${amount}`)
  }

  async function onClickDeposit() {
    if (address == undefined) {
      toast("Please connect your wallet!");
      return;
    }
    if (depositingAmount > tokenBalance) {
      toast("Depositing amount is greater than wallet amount!")
    }
    else if (depositingAmount > 0) {
      const txApprove = await writeContract(config, {
        abi: erc20Abi,
        address: BLOCKAI_TOKEN_ADDR,
        functionName: 'approve',
        args: [TREASURY_ADDR, depositingAmount]
      })

      const recApprove = await waitForTransactionReceipt(config, { hash: txApprove });

      // setLoading(true);
      const txDeposit = await writeContract(config, {
        abi: treasuryABI,
        address: TREASURY_ADDR,
        functionName: 'deposit',
        args: [depositingAmount]
      })
      const resDeposit = await waitForTransactionReceipt(config, { hash: txDeposit });
      setTokenBalance(tokenBalance - depositingAmount);
      accessAllowedContext.setTokenBalance(tokenBalance);
      setDepositingAmount(0);
      setAmount(0);
      toast("Depsit Succeeded!");
      setAccessAllowed(true);
      accessAllowedContext.setAccessAllowed(true);
    }
  }

  return (
    <div className="max-w-[320px] min-w-[320px] h-full flex flex-col items-center justify-between p-2 md:p-8 bg-black hidden-leftpane" id="leftpane">
      <div ref={domNode}>
        <a href="/" className='mb-8' previewlistener="true">
          <div className="flex flex-row items-center gap-2 hover:brightness-90 hover:cursor-pointer">
            <img alt="logo" loading="lazy" width="64" height="64" decoding="async" data-nimg="1"
              src={whiteLogo} className="color: transparent;"></img>
            <h3 className="flex flex-row text-primary font-bold font-spline text-3xl">BLOCK <p className='text-secondary'>AI</p></h3>
          </div>
          <h5 className='text-primary-700 text-center'>TERMINAL V-1.0</h5>
        </a>

        <div className="w-full h-full flex flex-col items-start gap-8">
          <div className='w-full flex flex-col gap-4'>
            <div className='text-primary-700 text-xs'>ACCOUNT</div>
            <div className='flex flex-col gap-2'>
              <div className="w-full flex flex-row items-center gap-1">
                <DropdownToken setParentCurrentToken={setCurrentToken} />
                <button
                  className={"btn-primary border-secondary p-2" + " h-full py-2 px-4 rounded font-nunito font-bold disabled:cursor-not-allowed disabled:opacity-50"}
                  onClick={
                    address
                      ? () => disconnectWallet()
                      : () => connectWallet()
                  }
                >
                  <p className='whitespace-nowrap'>
                    {address
                      ? displayAddress(address, 6)
                      : "Connect Wallet"}
                  </p>
                </button>
              </div>
              <div className='border-secondary p-2'>
                <p className='text-primary'>BLOCK AI TOKEN</p>
                <p className='text-primary text-sm'>{formatNumberWithCommas(decimalToEth(tokenBalance).toFixed(2))}</p>
                <p className='text-primary-700 text-xs'>${formatNumberWithCommas(decimalToEth(tokenBalance).toFixed(2) * 0)}</p>

                <p className='text-primary text-right'>100 BAI PER DAY</p>
              </div>
            </div>
          </div>
          {!accessAllowed &&
            <>
              <div className='w-full flex flex-row gap-4 border-secondary p-2'>
                <input className='text-primary w-full h-10 pt-1 text-right bg-transparent border-secondary p-2'
                  value={amount} onChange={(event) => onChangeAmount(event)} onKeyUp={(event) => onChangeAmount(event)}>
                </input>
                <button className='btn-primary w-full h-10 pt-1' onClick={onClickDeposit}>
                  Deposit
                </button>
              </div>
            </>
          }
          <>
              <div className='flex-1'></div>
              <div className='w-full flex flex-col gap-4'>
                <div className='text-primary-700 text-xs'>TOOLS</div>
                {navs.map((pool, index) => {
                  return (
                    <a href={pool.src} key={index} previewlistener="true" onClick={(e) => { navigate(`/${pool.src}`) }}>
                      <p className="text-primary hover:text-secondary text-lg font-nunito font-bold hover:underline">
                        {pool.name}
                      </p>
                    </a>)
                })}
              </div>
              <div className='w-full flex flex-col gap-4'>
                <div className='text-primary-700 text-xs'>LINKS</div>
                <div className='w-full flex flex-row gap-2'>
                  <button className='btn-primary w-10 h-10 pt-1'><a href='https://token.blockai.info/' target="_blank"><FontAwesomeIcon className='p-2' icon="fa-solid fa-earth-americas" /></a></button>
                  <button className='btn-primary w-10 h-10 pt-1'><a href='https://x.com/Blockai_ai' target="_blank"><FontAwesomeIcon className='p-2' icon="fa-brands fa-twitter" /></a></button>
                  <button className='btn-primary w-10 h-10 pt-1'><a href='https://t.me/blockaiChat' target="_blank"><FontAwesomeIcon className='p-2' icon="fa-solid fa-paper-plane" /></a></button>
                  <button className='btn-primary w-10 h-10 pt-1'><a href='https://docs.blockai.info/' target="_blank"><FontAwesomeIcon className='p-2' icon="fa-sharp fa-tablet" /></a></button>
                </div>
              </div>
            </>
        </div>

      </div>
    </div>
  );
}

export default LeftSidePane;
