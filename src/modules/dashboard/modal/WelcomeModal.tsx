/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/1/22, 4:39 PM
 *
 *
 */

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { wrap } from "popmotion";
import React, { useState } from "react";

import { Button, GrayButton } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { useAuthStore } from "@/modules/auth/useTokenStore";

type WelcomeModalImage = {
  link: string;
  pos: number;
  title: string;
  subtitle: string;
}[];

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

interface IWelcomeModalProps {
  images: WelcomeModalImage;
}

export const WelcomeModal: React.FC<IWelcomeModalProps> = ({
  children,
  images,
}) => {
  const setGuided = useAuthStore((state) => state.setGuided);
  const guided = useAuthStore((state) => state.guided);
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <Modal open={!guided}>
      <Modal.Button type="open">{children ?? null}</Modal.Button>
      <Modal.Content width="max-w-7xl" opacity="opacity-60">
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex flex-col">
            <Modal.Title>{images[imageIndex].title}</Modal.Title>
            <p className="text-lg text-gray-500 font-medium">
              {images[imageIndex].subtitle}
            </p>
          </div>

          <div className="example-container">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="slider-img h-full w-full"
              >
                <Image
                  src={images[imageIndex].link + "?ap=em"}
                  layout="fill"
                  className="rounded-xl"
                  objectFit="cover"
                  alt="Welcome Image"
                  priority={true}
                />
                {imageIndex !== images.length - 1 && (
                  <div className="hidden">
                    <Image
                      src={images[imageIndex + 1].link + "?ap=em"}
                      width={1920}
                      height={1000}
                      className="rounded-xl"
                      objectFit={imageIndex !== 1 ? "cover" : "contain"}
                      alt="Welcome Image"
                      priority={true}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="self-end flex justify-between w-full z-40">
            <Modal.Button type="close">
              <GrayButton onClick={() => setGuided(true)}>Skip</GrayButton>
            </Modal.Button>
            <div className="flex space-x-2">
              {images[imageIndex].pos !== 1 && (
                <GrayButton onClick={() => paginate(-1)}>Previous</GrayButton>
              )}

              {images[imageIndex].pos === images.length ? (
                <Modal.Button type="close">
                  <Button onClick={() => setGuided(true)}>Finish</Button>
                </Modal.Button>
              ) : (
                <Button onClick={() => paginate(1)}>Next</Button>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
