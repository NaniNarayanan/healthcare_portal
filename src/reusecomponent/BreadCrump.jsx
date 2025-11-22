import React from 'react';
import { Link } from 'react-router-dom';

export default function BreadCrumbs(props) {

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  return (
    <nav className="flex justify-start mt-4">
      <ol className="flex items-center space-x-2">
        {props.crumbs?.map((crumb, ci) => {
          const disabled = isLast(ci);

          return (
            <li key={ci} className="flex items-center">
              <Link
                to={disabled ? "#" : props.paths[ci]}
                className={`text-[14px] 
                  ${disabled ? "font-bold text-gray-500 cursor-default" : "font-normal text-gray-700 hover:underline cursor-pointer"}`}
                onClick={(event) => {
                  if (disabled) {
                    event.preventDefault();
                  } else {
                    props.selected(crumb);
                  }
                }}
              >
                {crumb}
              </Link>

              {!disabled && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
