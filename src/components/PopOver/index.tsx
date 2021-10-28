import { Popover } from "@headlessui/react";
import React from "react";
import { AlertTriangle } from "react-feather";

export const ErrorPop: React.FC<any> = ({ error }: any) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className="absolute text-red-400 -translate-y-1/2 right-6 top-1/2 no_animation"
    >
      <Popover className="relative flex no_animation">
        <Popover.Button className="cursor-pointer">
          <AlertTriangle size={20} />
        </Popover.Button>

        <Popover.Panel className="absolute z-20 w-screen max-w-xs p-2 text-base text-right text-gray-700 -right-8 -top-20 no_animation">
          <div className="w-auto no_animation">
            <span className="w-full px-8 py-4 text-white bg-red-400 rounded-sm shadow-lg no_animation">
              {error}
            </span>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default ErrorPop;
