import { CaretLeft, CaretRight } from "phosphor-react";
import { useSideBarStore } from "./useSideBarStore";

export const SideBarToggleButton = () => {
  const { open, toggleOpen } = useSideBarStore();

  return (
    <div
      onClick={() => toggleOpen()}
      className={`z-50 absolute w-12 h-12 top-11 bg-green-500 text-3xl ${
        !open
          ? "left-28 sm:left-[6.5rem]"
          : "left-[17.25%] translate-x-[-50%] sm:left-[55%] md:left-[37.5%] lg:left-[28%]"
      }  rounded-full flex justify-center items-center text-white shadow-E200 cursor-pointer transition-all duration-100`}
    >
      {!open ? <CaretRight weight="bold" /> : <CaretLeft weight="bold" />}
    </div>
  );
};
