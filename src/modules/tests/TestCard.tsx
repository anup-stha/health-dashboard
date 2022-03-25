/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 12:55 PM
 *
 *
 */

import { useRouter } from "next/router";
import { Trash } from "phosphor-react";

import { Button } from "@/components/Button";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { BooleanTag } from "@/components/others/BooleanTag";

import { TestModal } from "@/modules/tests/testAddModal";

import { TestSubCategory } from "@/types";

type TestCardPropsType = {
  id: number | string;
  name: string;
  desc: string;
  slug: string;
  isPublic: boolean;
  subCategories?: Array<TestSubCategory>;
};

export const TestCard: React.FC<TestCardPropsType> = ({ id, name, desc, slug, isPublic, subCategories }) => {
  const router = useRouter();

  return (
    <div
      data-testid={`${slug}-test-card`}
      className="relative flex flex-col items-start justify-between overflow-hidden h-64 bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200"
    >
      <div className="space-y-1">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium text-primary_gray-800 capitalize">{name}</h1>
        </div>

        <div className="space-y-3">
          <div className="text-lg font-medium text-primary_gray-600 w-full line-clamp-2">{desc}</div>
          <div className=" text-base text-primary_gray-500 font-normal space-x-2">
            <BooleanTag type="info" trueStatement={`Slug: ${slug}`} />
            <BooleanTag type="info" trueStatement={`Public: ${isPublic}`} />
          </div>
        </div>
      </div>
      {/* {subCategories && (
        <div className="absolute -right-4 -bottom-2">
          <div className="w-40 h-40 relative">
            <Image
              src={`/assets/Acuity1.png`}
              alt="Super User Admin Image"
              layout="fill"
            />
          </div>
        </div>
      )} */}

      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          {subCategories ? (
            <Button
              size="sm"
              data-testid={`${slug}-test-btn`}
              onClick={() => {
                router.push(`/tests/${slug}?id=${id}`);
              }}
            >
              View Details
            </Button>
          ) : (
            <TestModal
              variant="subtest"
              type="edit"
              selectedTest={{
                id,
                name,
                desc,
                public: isPublic,
                slug,
                sub_categories: subCategories ?? [],
              }}
            >
              <Button>Edit Sub Category </Button>
            </TestModal>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-lg font-medium text-primary_gray-500 hover:text-red-600 cursor-pointer">
            <DeleteModal
              title="You are about to delete a test category"
              subTitles={["This will delete your test forever", "Are you sure ?"]}
              closeButton={
                <div className="flex items-center">
                  <Trash size={22} />
                  Remove
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
