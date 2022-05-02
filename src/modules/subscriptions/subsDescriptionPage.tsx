/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { Tab } from "@headlessui/react";
import { differenceWith, isEqual } from "lodash";
import { useRouter } from "next/router";
import { CheckCircle, WarningOctagon, XCircle } from "phosphor-react";
import React, { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Headings";
import { BooleanTag } from "@/components/others/BooleanTag";
import { TableView } from "@/components/Table";

import { SubscriptionDeleteZone } from "@/modules/roles/others/DeleteZone";
import { SubscriptionUpdateZone } from "@/modules/subscriptions/AlertZone";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { testStore } from "@/modules/tests/testStore";
import { assignTestToSubscriptionBulk, removeTestFromSubscription } from "@/services/requests/subscriptionRequests";

import { MultiDropdown } from "../roles/form/roleMemberCategoryForm";

import { TestSubCategory } from "@/types";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

type SubsDescriptionPage = {
  selected: any;
};

export const SubsDescriptionPage: React.FC<SubsDescriptionPage> = ({ selected }) => {
  const { testList } = testStore();

  const { subscriptionDetails } = useSubscriptionStore();
  const [selectedId, setSelectedId] = useState(testList[0] ? testList[0].id : 0);

  const selectedTest = useMemo(
    () => testList.filter((element) => element.id === selectedId)[0],
    [selectedId, testList]
  );

  const getTestSubCategory = (testId: number) => testList.filter((element) => element.id === testId)[0].sub_categories;

  const getFilteredTestCategory = (testId: number) => {
    const testList = getTestSubCategory(testId);

    const testIndexInSubs = subscriptionDetails.findIndex((element) => element.id === testId);

    return differenceWith(testList, subscriptionDetails[testIndexInSubs].sub_categories, isEqual);
  };

  const tabs = testList.map(
    (test) =>
      subscriptionDetails.filter((subs) => {
        if (subs.id === test.id) return { [test.id]: subs };
      })[0]
  );
  const tabArray = Object.values(tabs);

  return (
    <div className="px-10 py-10 overflow-visible sm:px-6 sm:py-6 w-full space-y-8">
      <Heading title={selected.name ?? ""} subtitle={selected.slug ?? ""} />

      <hr className="border-t-[1px] border-gray-200" />
      <div className="space-y-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-neutral-800 capitalize">Tests</h1>
        </div>

        {testList.length !== 0 ? (
          <div className="w-full flex gap-6 sm:flex-col">
            <Tab.Group vertical>
              <Tab.List className="w-1/4 sm:w-1/2 h-full flex flex-col bg-white shadow-sm rounded-md overflow-hidden">
                {testList.map((test) => (
                  <Tab as={Fragment} key={test.id}>
                    {({ selected }) => (
                      <button
                        onClick={() => {
                          setSelectedId(Number(test.id));
                        }}
                        className={classNames(
                          selected
                            ? "w-full py-4 px-6 border-primary-500 border-r-4 bg-neutral-700 text-white cursor-pointer text-left"
                            : '"w-full py-4 px-6 border-primary-500 text-neutral-700 border-b-[1px] text-left border-neutral-200 cursor-pointer hover:bg-gray-200 border-r-4 border-r-transparent'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-medium capitalize" data-testid={`subs-test-${test.slug}`}>
                            {test.name}
                          </span>
                          <span>
                            {subscriptionDetails.some((element) => element.id === test.id) ? (
                              <CheckCircle
                                data-testid={`check-${test.id}`}
                                size={24}
                                weight="duotone"
                                className={classNames(selected ? "text-primary-400" : "text-primary-700")}
                              />
                            ) : (
                              <XCircle
                                size={24}
                                data-testid={`cross-${test.id}`}
                                weight="duotone"
                                className={classNames(selected ? "text-red-400" : "text-red-700")}
                              />
                            )}
                          </span>
                        </div>
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="w-3/4 sm:w-full h-full bg-white rounded-md px-8 py-8 shadow-sm ">
                {tabArray.map((test, index) => {
                  if (test === undefined)
                    return (
                      <Tab.Panel key={index}>
                        <div className="w-full flex flex-col space-y-2">
                          <div className="flex items-center justify-between w-full lg:flex-col lg:items-start lg:space-y-4">
                            <div className="flex flex-col">
                              <h1 className="text-3xl font-medium text-neutral-700 capitalize">{selectedTest.name}</h1>
                              <div className="flex space-x-2">
                                <BooleanTag type="info" trueStatement={`Slug: ${selectedTest.slug}`} />
                                <BooleanTag
                                  type="info"
                                  trueStatement={`Public:${selectedTest.public ? " Yes" : " No"}`}
                                />
                                <BooleanTag
                                  type="info"
                                  trueStatement={`${
                                    subscriptionDetails.some((element) => element.id === selectedTest.id)
                                      ? "Assigned"
                                      : "Not Assigned"
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="flex">
                              <SubsTestDropdown
                                label="Choose a test"
                                options={getTestSubCategory(Number(selectedId))}
                              />
                            </div>
                          </div>
                          <div className="flex  items-center text-xl font-medium text-red-400 space-x-2 ">
                            <WarningOctagon size={24} /> <span>No Test Assigned</span>
                          </div>
                        </div>
                      </Tab.Panel>
                    );
                  const subCategories = test.sub_categories.map((subTest: any) => ({
                    ...subTest,
                    category_name: test.name,
                    category_desc: test.desc,
                  }));

                  return (
                    <Tab.Panel key={index}>
                      <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between w-full lg:flex-col lg:items-start lg:space-y-4">
                          <div className="space-y-1">
                            <h1 className="text-3xl font-medium text-neutral-700 capitalize">{test.name}</h1>
                            <div className="flex space-x-2">
                              <BooleanTag type="info" trueStatement={`Slug: ${test.slug}`} />
                              <BooleanTag type="info" trueStatement={`Public:${test.public ? " Yes" : " No"}`} />{" "}
                              <BooleanTag
                                type="info"
                                trueStatement={`${
                                  subscriptionDetails.some((element) => element.id === selectedTest.id)
                                    ? "Assigned"
                                    : "Not Assigned"
                                }`}
                              />
                            </div>
                          </div>{" "}
                          <div className="flex">
                            <SubsTestDropdown options={getFilteredTestCategory(test.id)} />
                          </div>
                        </div>

                        <TableView
                          data={subCategories}
                          tableHeadings={["Name", "Slug", "Public", "Description", ""]}
                          tableRowComponent={<SubscriptionSubTestTableRow />}
                          loading={false}
                        />
                      </div>
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : (
          <div className="flex  items-center text-xl font-medium text-red-400 space-x-2 ">
            <WarningOctagon size={24} /> <span>No Test Details Found</span>
          </div>
        )}
      </div>

      <hr className="border-t-[1px] border-gray-200" />
      <div className="space-y-2">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">Alert Zone</h1>
          <p className="text-lg font-medium text-gray-500">Please be careful with anything you do here</p>
        </div>
        <div className="space-y-4">
          <SubscriptionUpdateZone />
          <SubscriptionDeleteZone />
        </div>
      </div>
    </div>
  );
};

const SubscriptionSubTestTableRow = ({ data }: any) => {
  const router = useRouter();

  return data ? (
    <tr className="text-lg">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="">
            <div className="text-xl font-medium text-gray-900 w-full capitalize" data-testid={`${data.id}-test-name`}>
              {data.name}
            </div>
            <div className="text-lg font-medium text-gray-500">{data.category_name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BooleanTag type="info" trueStatement={data.slug} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BooleanTag type="info" trueStatement={data.public ? "Yes" : "No"} />
      </td>
      <td className="px-6 py-4">{data.desc}</td>
      <td className="font-medium px-6 py-4 whitespace-nowrap text-lg flex items-center justify-end">
        <Button
          variant="outline"
          color="error"
          data-testid={`${data.id}-test-remove-btn`}
          onClick={async () =>
            alert({
              type: "promise",
              promise: removeTestFromSubscription(Number(router.query.id), data.category_id, data.id),
              msgs: {
                loading: "Removing Test",
              },
              id: "remove-test-from-id",
            })
          }
        >
          Remove Test
        </Button>
      </td>
    </tr>
  ) : (
    <tr />
  );
};

type SubTestDropdown = {
  options: TestSubCategory[];
  label?: string;
};

export const SubsTestDropdown: React.FC<SubTestDropdown> = ({ options, label = "" }) => {
  const { handleSubmit, control, formState, reset } = useForm();
  const router = useRouter();
  const { isDirty, isValid } = formState;

  const subtestOptions =
    options.length !== 0
      ? options.map((element) => ({
          value: `${element.id}-${element.name}`,
          label: element.name,
        }))
      : [];

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await alert({
          type: "promise",
          promise: assignTestToSubscriptionBulk({
            subscription_id: Number(router.query.id),
            data: data.sub_test.map((test: string) => {
              return {
                test_cat_id: options[0].category_id,
                test_sub_cat_id: Number(test.split("-")[0]),
              };
            }),
          }).then(() => reset()),
          msgs: {
            loading: "Assigning Test",
            success: "Successfully Assigned",
          },
          id: "Test-assign",
        });
      })}
      className="flex lg:w-full space-x-4 items-end"
    >
      <div className="w-96">
        <MultiDropdown options={subtestOptions} name="sub_test" label={label} control={control} />
      </div>

      <Button data-testid="subs-test-add-btn" disabled={!isDirty || !isValid}>
        Assign
      </Button>
    </form>
  );
};
