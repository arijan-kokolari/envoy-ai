import React, { useEffect, useRef, useState } from "react";
import EtherIcon from "../assets/images/ether.svg";
import UsdtIcon from "../assets/images/usdt.svg";
import BaiIcon from "../assets/images/bai.svg";
import ArrowDown from "../assets/images/arrowDown.svg";

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
// Handler hook for when Outside click dropdown close End Code====>>

const DropdownToken = ({ setParentCurrentToken }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentToken, setCurrentToken] = useState("BAI");
  const [currentTokenIcon, setCurrentTokenIcon] = useState(BaiIcon);

  const DropdownItem = ({ label, href, icon }) => {
    return (
      <button
        onClick={() => onClickItem(label, icon)}
        className="noeffect w-full flex flex-row text-primary text-dark-6 hover:bg-primary/5 hover:text-primary px-1 py-1 text-sm items-center"
      >
        <img src={icon} width={29} height={26} /> &nbsp;{" "}
        <span className="">{label}</span>
      </button>
    );
  };

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  function onClickItem(label, icon) {
    setCurrentToken(label);
    setCurrentTokenIcon(icon);
    setParentCurrentToken(label);
    setDropdownOpen(false);
  }

  return (
    <>
      {/* <!-- ====== Dropdowns Section Start --> */}
      <div className="container">
        <div className="flex flex-wrap">
          {/* one */}
          <div ref={domNode}>
            <div className="w-full text-center">
              <div className="relative text-left">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`btn-primary text-[#000] flex items-center px-5 py-2 text-lg border-2 border-white font-medium`}
                >
                  <div className="flex flex-row items-center justify-center gap-[5px] md:gap-2">
                    <img src={currentTokenIcon} width={29} height={29} />
                    {/* <span className="text-base">{currentToken}</span> */}
                    <img src={ArrowDown} width={12} height={12} className="mb-1" />
                  </div>
                </button>
                <div
                  className={`shadow-1 dark:shadow-box-dark absolute left-0 z-40 mt-2 w-full rounded-md border-secondary bg-black dark:bg-dark-2 py-[10px] transition-all ${dropdownOpen
                    ? "top-full opacity-100 visible"
                    : "top-[100%] invisible opacity-0"
                    }`}
                >
                  <DropdownItem label="BAI" href="/#" icon={BaiIcon} />
                  {/* <DropdownItem label="USDT" href="/#" icon={UsdtIcon} /> */}
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
      </div>
      {/* <!-- ====== Dropdowns Section End -->    */}
    </>
  );
};

export default DropdownToken;
