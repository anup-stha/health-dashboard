/* eslint-disable require-jsdoc */
import React, { Fragment } from "react";
import Image from "next/image";
import Avatar from "./Ed.png";
import AvatarImage from "@/styles/avatar.svg";
import { Popover, Transition } from "@headlessui/react";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import { logoutUser } from "@/lib/requests";

type AvatarProps = {
  name?: string;
  image?: string;
  email?: string;
};

export const DefaultAvatar: React.FC<AvatarProps> = ({ name, image }) => {
  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <Image
          src={image}
          alt={name}
          className="rounded-full"
          height="48"
          width="48"
        />
      ) : (
        <Image
          src={Avatar}
          alt={name}
          className="rounded-full"
          height="48"
          width="48"
        />
      )}

      <span className="truncate sm:text-lg sm:font-semibold sm:text-gray-700">
        {name}
      </span>
    </div>
  );
};

export const AvatarWithEmail: React.FC<AvatarProps> = ({
  name,
  image,
  email,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <Image
          src={image}
          alt={name}
          className="rounded-full"
          height="48"
          width="48"
        />
      ) : (
        <Image
          src={Avatar}
          alt={name}
          className="rounded-full"
          height="48"
          width="48"
        />
      )}
      <div className="flex flex-col gap-y-1">
        <span className="sm:text-xl sm:font-semibold sm:text-gray-800">
          {name}
        </span>
        <span className="sm:text-base sm:font-medium sm:text-gray-600">
          {email}
        </span>
      </div>
    </div>
  );
};

export const ImageAvatar: React.FC = () => {
  const onLogOut = async () => {
    await logoutUser()
      .then(() => {
        useTokenStore.getState().removeTokens();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <div className="w-20 h-20 object-contain  relative">
              <Image
                src={AvatarImage}
                layout="fill"
                className="absolute"
                objectFit="contain"
              />
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-52 p-2 mt-3 right-4 bg-white ring-1 ring-black ring-opacity-5 rounded-sm shadow-lg space-y-2">
                <div className="overflow-hidden  ">
                  <a className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70">
                    <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                      <p className=" font-medium  ">View Profile</p>{" "}
                    </div>
                  </a>
                </div>
                <div className="overflow-hidden">
                  <a
                    onClick={() => onLogOut()}
                    className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                  >
                    <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                      <p className=" font-medium  ">Sign Out</p>{" "}
                    </div>
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover.Button>
        </>
      )}
    </Popover>
  );
};