import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { LabelInput } from "@/components/Input";
import { Field, Formik } from "formik";
import { Button, GrayButton } from "@/components/Button";

const PasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div
        onClick={() => openModal()}
        className=" p-6 border-b-2 border-gray-200 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850"
      >
        Change Password
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen md:px-16 sm:px-8 text-center">
            <Transition.Child as={Fragment}>
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-6xl px-12 py-14 sm:px-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl">
                <div className="flex flex-col space-y-16 sm:-space-y-12">
                  <Dialog.Title
                    as="h3"
                    className="text-4xl font-medium leading-6 text-gray-900"
                  >
                    Change Password
                  </Dialog.Title>
                  <div className="flex items-center w-full space-x-8 sm:flex-col-reverse">
                    <Formik
                      initialValues={{
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      onSubmit={(values) => console.log(values)}
                    >
                      {() => (
                        <form className="w-1/2 space-y-16 sm:w-full sm:space-y-8">
                          <div className="space-y-8">
                            <Field
                              name="Old Password"
                              type="password"
                              component={LabelInput}
                              placeholder={"Enter Old Password"}
                            />
                            <Field
                              name="New Password"
                              type="password"
                              component={LabelInput}
                              placeholder={"Enter New Password"}
                            />
                            <Field
                              name="Confirm Password"
                              type="password"
                              component={LabelInput}
                              placeholder={"Confirm New Password"}
                            />
                          </div>

                          <div className="flex space-x-4">
                            <Button onClick={() => closeModal()}>Change</Button>
                            <GrayButton onClick={() => closeModal()}>
                              Cancel
                            </GrayButton>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <div className="w-1/2 -mt-40 sm:mt-10 flex flex-col items-center -space-y-6  sm:space-y-0 sm:w-full">
                      <div className="relative h-8xl w-full sm:h-7xl sm:-ml-12  ">
                        <Image
                          src="/assets/change-password.svg"
                          alt="Change Password"
                          objectFit="contain"
                          layout="fill"
                        />
                      </div>
                      <div className="flex flex-col items-center sm:hidden ">
                        <h1 className="text-2xl sm:text-xl font-semibold text-green-600">
                          New Password must contain
                        </h1>
                        <div className=" text-xl sm:text-base sm:items-start font-medium text-gray-600 flex flex-col items-center">
                          <p>At least six characters</p>
                          <p>At least one uppercase character</p>
                          <p>At least one number </p>
                          <p>At least one special characer </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PasswordModal;
