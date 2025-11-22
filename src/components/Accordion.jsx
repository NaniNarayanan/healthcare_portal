import React, { useState } from "react";

export default function Accordion({ items = [], allowMultiple = false, className = "" }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  function isOpen(i) {
    return openIndexes.includes(i);
  }

  function toggle(i) {
    if (allowMultiple) {
      setOpenIndexes(prev => (prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]));
    } else {
      setOpenIndexes(prev => (prev.includes(i) ? [] : [i]));
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {items.map((it, i) => {
        const id = it.id ?? i;
        const open = isOpen(i);
        return (
          <div key={id} className="mb-3 last:mb-0">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={open}
              aria-controls={`accordion-content-${id}`}
              className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <div className="text-left">
                <div className="font-medium text-gray-800">{it.title}</div>
                {it.subtitle && <div className="text-sm text-gray-500">{it.subtitle}</div>}
              </div>
              <div className="ml-4 text-gray-400 transform transition-transform duration-150" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clipRule="evenodd" />
                </svg>
              </div>
            </button>

            <div
              id={`accordion-content-${id}`}
              className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${open ? "opacity-100 max-h-96 mt-2" : "opacity-0 max-h-0"}`}
            >
              <div className="p-3 bg-white border border-t-0 border-gray-200 rounded-b-lg text-sm text-gray-700">
                {typeof it.content === "function" ? it.content() : it.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}