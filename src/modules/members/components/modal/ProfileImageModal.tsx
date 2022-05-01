/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:20 PM
 *
 *
 */

import Image from "next/image";
import React, { useState } from "react";
import LetteredAvatar from "react-avatar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { privateAgent } from "@/services/requests";
import { User } from "@/services/requests/auth.service";

import { ImageUploadResponse } from "@/types";

interface IProfileImageModalProps {
  children: React.ReactNode;
  selectedMember: User;
}

export const ProfileImageModal = ({ children, selectedMember }: IProfileImageModalProps) => {
  const fileInput = React.createRef<any>();
  const { handleSubmit } = useForm();

  const [isNewImage, setIsNewImage] = useState(false);

  return (
    <Modal>
      <Modal.Button type="open">{children}</Modal.Button>
      <Modal.Content onClose={() => setIsNewImage(false)}>
        <div className="space-y-10 flex flex-col justify-center">
          <div className="space-y-4 ">
            <h1 className="text-3xl font-medium text-gray-700">Change Photo</h1>
            <hr />
          </div>
          <div className="self-center flex flex-col items-center space-y-8">
            <h1 className="text-2xl font-medium text-gray-800">
              {selectedMember.name.split(" ")[0]}, Keep your profile fresh
            </h1>
            <div
              className={`w-40 h-40 rounded-full object-contain overflow-hidden relative ${
                !isNewImage ? "hidden" : "block"
              }`}
            >
              <img id="output" className="rounded-full" alt="profile" />
            </div>

            {!isNewImage &&
              (selectedMember.image ? (
                <div className="w-40 h-40 rounded-full object-contain overflow-hidden relative">
                  <Image alt="profile" src={selectedMember.image} layout="fill" objectFit="contain" />
                </div>
              ) : (
                <div>
                  <LetteredAvatar name={selectedMember.name} size="120" round={true} maxInitials={2} />
                </div>
              ))}

            <h1 className="text-xl font-medium text-gray-700 text-center">
              Take a photo or upload a photo that really represents you. <br />
              File size must be less than 1Mb.
            </h1>
          </div>
          <div className="space-y-4 flex flex-col">
            <hr />
            <Modal.Form
              className="self-end flex items-center space-x-4 "
              encType="multipart/form-data"
              onSubmit={handleSubmit(async () => {
                const fd = new FormData();
                fd.append("image", fileInput.current.files[0], fileInput.current.files[0].name);
                await alert({
                  type: "promise",
                  promise: privateAgent.post<ImageUploadResponse>("member/avatar", fd).then((response) => {
                    useAuthStore.getState().setUserProfile({
                      ...selectedMember,
                      image: response.data.data as string,
                    });
                    setIsNewImage(false);
                  }),
                  msgs: {
                    loading: "Uploading Profile",
                    success: "Upload Successfully",
                    error: "Upload Failed",
                  },
                  id: "image-upload",
                });
              })}
            >
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = function () {
                      const output = document.getElementById("output") as HTMLImageElement;
                      setIsNewImage(true);
                      if (typeof reader.result === "string") {
                        output.src = reader.result;
                      }
                    };

                    if (e.target.files) {
                      if (e.target.files[0].size > 1 * 1024 * 1024) {
                        toast.error("File size must be less than 1MB");
                        return;
                      }
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose image
                </label>
              </div>

              <Button>Upload Photo</Button>
            </Modal.Form>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
