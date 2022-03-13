/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/6/22, 4:09 PM
 *
 *
 */

import { Dialog, Transition } from "@headlessui/react";
import qs from "qs";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { PrimaryInput } from "@/components/Input";

import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";

import { Role } from "@/types";

interface IMemberFilter {
  setFilterParams: Dispatch<SetStateAction<string>>;
  role: Role;
}

export const MemberFilter = ({ setFilterParams, role }: IMemberFilter) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalInputs, setTotalInputs] = useState(1);

  const { control, register, handleSubmit, watch, reset } = useForm();

  const categoryOptions = role.member_detail_categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const [categoryList, setCategoryList] = useState(
    categoryOptions ?? [{ label: "0", value: 0 }]
  );
  const [selectedCategory, setSelectedCategory] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  const detail_cat_watch = watch(`data.${totalInputs - 1}.detail_cat_id`);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    role && categoryOptions && setCategoryList(categoryOptions);
  }, [JSON.stringify(role)]);

  return (
    <>
      <Button type="button" onClick={openModal}>
        Filter Members
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed right-0 top-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500 "
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" ease-in-out duration-200 "
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex h-screen w-full max-w-7xl transform flex-col space-y-10 overflow-hidden bg-white px-12 py-12 text-left align-middle shadow-xl transition">
                <div className="flex w-[50rem] flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-4xl font-medium capitalize leading-6 text-primary_gray-700"
                    >
                      Filter Members By Category
                    </Dialog.Title>
                    <span className="text-lg text-primary_gray-400">
                      Please select any of filters below
                    </span>
                  </div>
                  <form
                    className="flex flex-col space-y-8"
                    onSubmit={handleSubmit((values) => {
                      setFilterParams(
                        qs.stringify(values, {
                          encode: false,
                          arrayFormat: "indices",
                        })
                      );
                      closeModal();
                    })}
                  >
                    {[...Array(totalInputs)].map((category, index) => {
                      return (
                        <div className="flex items-end space-x-4" key={index}>
                          <div className="w-1/2">
                            <DropdownController
                              name={`data.${index}.detail_cat_id`}
                              label="Select a category"
                              control={control}
                              isDisabled={index + 1 !== totalInputs}
                              options={
                                selectedCategory.length === 0
                                  ? categoryList
                                  : categoryList.filter(
                                      (category) =>
                                        !selectedCategory.find(
                                          (el) => el.value === category.value
                                        )
                                    )
                              }
                            />
                          </div>
                          <div className="w-1/2">
                            <PrimaryInput
                              label="Enter Value"
                              placeholder="Enter Value"
                              {...register(`data.${index}.value`)}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {detail_cat_watch &&
                      totalInputs !== categoryOptions?.length && (
                        <div
                          onClick={() => {
                            const foundCategory = categoryOptions?.find(
                              (option) => option.value === detail_cat_watch
                            );

                            if (!foundCategory) return;

                            setTotalInputs((prev) => prev + 1);
                            setSelectedCategory([
                              ...selectedCategory,
                              foundCategory,
                            ]);
                          }}
                          className="w-full cursor-pointer px-4 py-4 text-2xl font-medium rounded-lg border border-primary_gray-300 border-dashed flex items-center justify-center text-primary_gray-600"
                        >
                          Add New Category
                        </div>
                      )}
                    <div className="self-end flex gap-4">
                      <Button
                        type="button"
                        onClick={() => {
                          reset({
                            data: [{ detail_cat_id: categoryList[0].value }],
                          });
                          setTotalInputs(1);
                          setSelectedCategory([]);
                          setFilterParams("");
                          closeModal();
                        }}
                      >
                        Reset
                      </Button>
                      <Button>Apply</Button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
