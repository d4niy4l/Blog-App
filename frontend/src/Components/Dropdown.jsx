import React, { useState, useEffect, useRef } from "react";
import {FaFilter} from 'react-icons/fa'
import { Transition } from "@tailwindui/react";

export function Dropdown({options, setIndex}) {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!container.current.contains(event.target)) {
        if (!isOpen) return;
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, container]);

  // Allow to use the `esc` key
  useEffect(() => {
    function handleEscape(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [isOpen]);

  return (
    <div ref={container} className="relative inline-block text-left px-3">
      <div>
        <button
          type="button"
          className="font-semibold text-yellow-300 text-lg p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <FaFilter color='yellow' size = {20}/>
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute left-0 w-fit origin-top-left rounded-md shadow-lg z-10"
      >
        <div className="matchColor rounded-md shadow-xs text-yellow-300">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {
                options.map((val,index)=>{
                    return( <button
                    key={index}
                    rel="noopener noreferrer"
                    className="flex px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                    onClick={()=>{setIndex(index)}
                }
                  >
                    {val}
                  </button>)
                })
            }
      
          </div>
        </div>
      </Transition>
    </div>
  );
}
