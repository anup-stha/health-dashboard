import { MainLayout } from "@/layout/MainLayout";
import Image from "next/image";
import { FacebookLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";
import { Briefcase, Calendar, Mail, Map, PhoneCall } from "react-feather";
import CoverImage from "../../../public/assets/cover.png";

export const ProfilePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex gap-8 p-8 sm:flex-col 3xl:px-[16vw]">
        <div className="relative w-3/4 bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
          <div className="relative w-full h-52 z-10">
            <Image
              src={CoverImage}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 35%"
              className="rounded-t-xl z-40"
              placeholder="blur"
            />
          </div>

          <div className="absolute left-[3%] top-40 z-20 flex items-center gap-x-6">
            <div className="relative w-40 h-40 z-20 ring-4 ring-white rounded-full">
              <Image
                src="/assets/profile.jpg"
                layout="fill"
                objectFit="cover"
                className="z-40 rounded-full"
              />
            </div>
            <div className="flex flex-col mt-10">
              <h1 className="text-gray-900 font-semibold text-3xl tracking-wider">
                Drakin Plywood
              </h1>
              <p className="text-gray-500 font-semibold text-xl">Superadmin</p>
            </div>
          </div>
          <div className="px-6 py-6 min-h-[10rem] ">
            <div className="ml-[20%] flex justify-between items-center">
              <div></div>
              <div className="flex items-center gap-1">
                <p className="text-gray-800 text-xl font-semibold">Share</p>
                <FacebookLogo
                  size={32}
                  weight="fill"
                  className="text-blue-600 cursor-pointer"
                />
                <TwitterLogo
                  size={32}
                  weight="fill"
                  className="text-blue-400 cursor-pointer"
                />
                <LinkedinLogo
                  size={32}
                  weight="fill"
                  className="text-blue-700 cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-20 font-medium text-gray-700 flex gap-x-6">
              <div className="  p-6 bg-gray-50 w-2/5 text-xl rounded-lg flex flex-col gap-4 ">
                <p className="text-2xl font-semibold text-gray-900">
                  Personal Info
                </p>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Briefcase />
                  </div>
                  <span>Sunya Health</span>
                </div>
                <div className="flex gap-x-4">
                  <div className="text-gray-800">
                    <Mail />
                  </div>
                  <span>anup.stha012@gmail.com</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Map />
                  </div>
                  <span>Illachen-17, Sundhara</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <PhoneCall />
                  </div>
                  <span>9840748111</span>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="text-gray-800">
                    <Calendar />
                  </div>
                  <span>Date joined: 2021/11/25</span>
                </div>
              </div>
              <div className="w-3/5 text-lg flex flex-col gap-6 font-medium text-gray-70">
                <div className="bg-gray-50 h-1/2 p-6 rounded-lg flex flex-col justify-between">
                  <p className="text-2xl font-semibold text-gray-900">
                    Short Summary
                  </p>
                  <span>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Est, harum eveniet! Rerum cupiditate dolores nobis soluta
                  </span>
                </div>

                <div className="bg-gray-50 h-1/2 p-4 rounded-lg flex ">
                  <div className="flex flex-col justify-between w-3/4 p-2 ">
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-semibold text-gray-900">
                        Activity
                      </p>
                    </div>

                    <span>14 users added today</span>
                    <span>34 organisations added today</span>
                  </div>
                  <div className="w-1/4 border-l-2 border-gray-300 flex items-center justify-center">
                    <p className="text-green-500 text-xl font-bold cursor-pointer">
                      See More
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 h-auto bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 py-2 px-4 self-start">
          <div className="p-6 border-b-2 border-gray-200 text-gray-500 text-xl font-semibold cursor-pointer">
            Update Public Profile Info
          </div>
          <div className="p-6 border-b-2 border-gray-200 text-gray-500 text-xl font-semibold cursor-pointer">
            Change Password
          </div>
          <div className="p-6  text-gray-500 text-xl font-semibold cursor-pointer">
            Log Out
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
