/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/7/22, 4:04 PM
 *
 *
 */

import React, { useState } from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useRoleList } from "@/services/requests/roleRequests";
import { Modal } from "@/components/Modal/useModal";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { Button, GrayButton } from "@/components/Button";

export const images = [
  {
    link: "/assets/image-slider-3.svg",
    pos: 1,
    title: "Hello",
    subtitle:
      "Please press continue to see more of your Dashboard. You will get to know how you can use your dashboard.",
  },
  {
    link: "/assets/org-welcome-first-page.png",
    pos: 2,
    title: "Organization Members",
    subtitle:
      "Press on members tab on left side to view different kinds of members associated with your organization",
  },
  {
    link: "/assets/org-welcome-2-page.png",
    pos: 3,
    title: "Organization Roles",
    subtitle:
      "Click on any role to view members associated with that role. You currently can view operators and patients",
  },
  {
    link: "/assets/org-welcome-3-page.png",
    pos: 4,
    title: "Organization Patients",
    subtitle:
      "After clicking on patients, you get a list of patients. Click on any of them to view more details of that patient",
  },
  {
    link: "/assets/org-welcome-4-page.png",
    pos: 5,
    title: "Add Patient",
    subtitle:
      "Click on Add Patient on Right Side of The Screen to add the basic details of a patient",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const OrgAdminDashboard = () => {
  const { user, setGuided } = useAuthStore();
  const {} = useRoleList();

  const guided = useAuthStore((state) => state.guided);
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="px-10 -mt-2 pb-8 sm:p-6 space-y-8 w-full dashboard-bg-2">
      <div>
        <h1 className="text-[2.5rem] text-gray-800 font-semibold ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>
      <Modal open={!guided}>
        <Modal.Content width={"6xl"}>
          <div className="flex flex-col space-y-2 h-[75vh]">
            <div className="flex flex-col">
              <Modal.Title>{images[imageIndex].title}</Modal.Title>
              <p className="text-lg text-gray-500 font-medium">
                {images[imageIndex].subtitle}
              </p>
            </div>

            <div className="example-container">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={images[imageIndex].link}
                  className="slider-img"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                />
              </AnimatePresence>
              {/*  <div className="next" onClick={() => paginate(1)}>
                {"‣"}
              </div>
              <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
              </div> */}
            </div>
            {/*   <div className={"py-8"}>
              <div className={"w-full h-[65vh] relative  "}>
                <Image
                  src={selectedSlide.image}
                  alt={"First"}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
            </div>
*/}
            <div className="self-end flex justify-between w-full z-40">
              <Modal.Button type={"close"}>
                <GrayButton onClick={() => setGuided(true)}>Skip</GrayButton>
              </Modal.Button>
              <div className="flex space-x-2">
                {images[imageIndex].pos !== 1 && (
                  <GrayButton onClick={() => paginate(-1)}>Previous</GrayButton>
                )}

                {images[imageIndex].pos === images.length ? (
                  <Modal.Button type={"close"}>
                    <Button onClick={() => setGuided(true)}>Finish</Button>
                  </Modal.Button>
                ) : (
                  <Button onClick={() => paginate(1)}>Continue</Button>
                )}
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};
