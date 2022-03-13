/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/2/22, 1:12 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { DeleteModal } from "@/components/Modal/DeleteModal";

export const DeleteZone = () => {
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center lg:w-full sm:px-6">
      <div>
        <h1 className="text-2xl font-medium text-primary_gray-900">Delete this role</h1>
        <p className="text-lg font-medium text-primary_gray-500">
          Once you delete a role, there is no going back. Please be certain.
        </p>
      </div>
      <DeleteModal
        closeButton={
          <Button color="error" disabled>
            Delete
          </Button>
        }
        title="You are about to delete this role"
        subTitles={["This will delete your role forever", "Are you sure ?"]}
      />
    </div>
  );
};

export const TestDeleteZone = () => {
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center lg:w-full sm:px-6">
      <div>
        <h1 className="text-2xl font-medium text-primary_gray-900">Delete this test</h1>
        <p className="text-lg font-medium text-primary_gray-500">
          Once you delete a test, there is no going back. Please be certain.
        </p>
      </div>
      <DeleteModal
        closeButton={
          <Button color="error" disabled>
            Delete
          </Button>
        }
        title="You are about to delete this test"
        subTitles={["This will delete your test forever", "Are you sure ?"]}
      />
    </div>
  );
};

export const SubscriptionDeleteZone = () => {
  return (
    <div className="bg-white shadow-sm w-2/3 py-8 px-8 rounded-sm flex justify-between items-center lg:w-full sm:px-6">
      <div>
        <h1 className="text-2xl font-medium text-primary_gray-900">Delete this subscription</h1>
        <p className="text-lg font-medium text-primary_gray-500">
          Once you delete a subscription, there is no going back. Please be certain.
        </p>
      </div>
      <DeleteModal
        closeButton={
          <Button color="error" disabled>
            Delete
          </Button>
        }
        title="You are about to delete this subscription"
        subTitles={["This will delete your subscription forever", "Are you sure ?"]}
      />
    </div>
  );
};
