import { Dialog, Transition } from "@headlessui/react";
import { Field, Formik, FormikHelpers } from "formik";
import { PlusCircle } from "phosphor-react";
import React, { Fragment, useState } from "react";
import { Edit } from "react-feather";
import { Button } from "../Button";
import { CheckBoxInput, LabelInput } from "../Input";
import { OrganisationIntialFormDataType } from "@/pages/organisations";
import { useOrgStore } from "@/modules/organisations/useOrgStore";
import { onAddOrg, onEditOrg } from "@/lib/requests/orgRequests";
import { alert } from "../Alert";

interface OrganisationModalProps {
  type: "add" | "update";
  initialValues: OrganisationIntialFormDataType;
  orgId?: number | string;
}

export const OrganisationModal: React.FC<OrganisationModalProps> = ({
  type,
  initialValues,
  orgId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleLoading } = useOrgStore();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {type === "add" ? (
        <Button onClick={openModal}>
          <span> Add Organisation </span>
          <PlusCircle weight="fill" size={24} />
        </Button>
      ) : (
        <Edit
          onClick={openModal}
          name="edit"
          className="text-gray-400 cursor-pointer hover:text-gray-800"
        />
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen  px-4 py-12 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
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
              <div className="inline-block w-full max-w-3xl p-10 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-4xl font-medium leading-6 text-gray-900"
                >
                  {type === "add" ? "Add" : "Update"} Organisation
                </Dialog.Title>

                <Formik
                  initialValues={initialValues}
                  onSubmit={async (
                    values,
                    { setSubmitting }: FormikHelpers<any>
                  ) => {
                    type === "add" ? toggleLoading() : null;
                    type === "add"
                      ? await alert({
                          type: "promise",
                          promise: onAddOrg({
                            meta: {
                              description: values.description,
                              website: values.website,
                              phone: values.phone,
                              address: values.address,
                              zip: values.zip,
                              ward: values.ward,
                              municipality: values.municipality,
                              city: values.city,
                              country: values.country,
                              state: values.state,
                            },
                            active: values.active,
                            owner: "1",
                            verified: values.verified,
                            name: values.name,
                          }),
                          msgs: {
                            loading: "Adding Organization",
                            success: () => {
                              closeModal();
                              return "Added Organization";
                            },
                            error: (data: any) => `${data}`,
                          },
                        })
                      : await alert({
                          type: "promise",
                          promise: onEditOrg(
                            {
                              meta: {
                                description: values.description,
                                website: values.website,
                                phone: values.phone,
                                address: values.address,
                                zip: values.zip,
                                ward: values.ward,
                                municipality: values.municipality,
                                city: values.city,
                                country: values.country,
                                state: values.state,
                              },
                              active: values.active,
                              owner: "1",
                              verified: values.verified,
                              name: values.name,
                            },
                            orgId ? orgId : "0"
                          ),
                          msgs: {
                            loading: "Updating Organization",
                            success: () => {
                              closeModal();
                              return "Updated Organization";
                            },
                            error: (data: any) => `${data}`,
                          },
                        });
                    type === "add" ? toggleLoading() : null;
                    setSubmitting(false);
                  }}
                >
                  {({ values, handleSubmit, handleChange }) => {
                    return (
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-6 w-full"
                      >
                        <Field
                          name="name"
                          component={LabelInput}
                          placeholder={"Enter Organisation Name"}
                        />
                        <div className="flex space-x-4 items-center">
                          <Field
                            name="owner"
                            component={LabelInput}
                            placeholder={"Enter Owner Name"}
                          />
                          <div className="flex space-x-4 mt-3">
                            <Field
                              name="active"
                              type="checkbox"
                              component={CheckBoxInput}
                            />
                            <Field
                              name="verified"
                              type="checkbox"
                              component={CheckBoxInput}
                            />
                          </div>
                        </div>

                        <Field
                          name="description"
                          component={LabelInput}
                          placeholder={"Enter Description"}
                        />
                        <div className="flex space-x-4">
                          <Field
                            name="website"
                            component={LabelInput}
                            placeholder={"Enter website"}
                          />
                          <Field
                            name="phone"
                            component={LabelInput}
                            placeholder={"Enter phone"}
                          />
                        </div>
                        <div className="flex w-full space-x-4">
                          <div className="w-3/5">
                            <Field
                              name="address"
                              component={LabelInput}
                              placeholder={"Enter Address"}
                            />
                          </div>
                          <div className="w-2/5">
                            <Field
                              name="zip"
                              component={LabelInput}
                              placeholder={"Enter zip"}
                            />
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Field
                            name="ward"
                            component={LabelInput}
                            placeholder={"Enter ward"}
                          />

                          <Field
                            name="municipality"
                            component={LabelInput}
                            placeholder={"Enter municipality"}
                          />
                          <Field
                            name="city"
                            component={LabelInput}
                            placeholder={"Enter city"}
                          />
                        </div>

                        <div className="flex space-x-4">
                          <Field
                            name="country"
                            component={LabelInput}
                            placeholder={"Enter country"}
                          />
                          <Field
                            name="state"
                            component={LabelInput}
                            placeholder={"Enter state"}
                          />
                        </div>

                        {type === "add" ? (
                          <Button>
                            <span> Add </span>
                          </Button>
                        ) : (
                          <Button>
                            <span> Update </span>
                          </Button>
                        )}
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};