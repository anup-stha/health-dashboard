import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import PermissionSaveModal from "./permissionSaveModal";

export const permissions = [
  {
    id: 1,
    name: "User Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tempore eos saepe quas delenit",
  },
  {
    id: 2,
    name: "Edit Permission",
    description: "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur ",
  },
  {
    id: 3,
    name: "Read Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    id: 4,
    name: "Update Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    id: 5,
    name: "Organisation Add Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium",
  },
  {
    id: 6,
    name: "Delete Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium",
  },
  {
    id: 7,
    name: "User Add Permission",
    description:
      "lorem ipsum lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium",
  },
];

export const Permissions = () => {
  const [selected, setSelected] = useState<typeof permissions[0][]>([
    permissions[0],
    permissions[4],
  ]);

  const inactiveClass =
    "h-40 w-full bg-white shadow-md flex flex-col rounded-md p-4";
  const activeClass =
    "h-40 w-full bg-white shadow-E100 flex flex-col rounded-md p-4 ring-2 ring-opacity-90 ring-green-600 text-white transition-all duration-100";

  const selectHandler = (id: any) => {
    const clickedItem = permissions.filter((element) => element.id === id)[0];
    const alreadyClickedItem = selected.filter((element) => element.id === id);

    if (alreadyClickedItem.length === 0) {
      setSelected([...selected, clickedItem]);
    } else {
      setSelected(
        selected.filter((selected) => selected.id !== alreadyClickedItem[0].id)
      );
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Permissions</h1>
        <p className="text-lg font-semibold text-gray-500">
          Click on any permission to add, update or remove permissions for super
          user
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 3xl:flex 3xl:flex-wrap gap-6">
        {permissions.map((select) => {
          const isItemSelected = selected.some(
            (element) => element.id === select.id
          );

          return (
            <div
              className={isItemSelected ? activeClass : inactiveClass}
              key={select.id}
            >
              <div className="flex items-center justify-center h-full space-x-4">
                <div>
                  <Image
                    src="/assets/permission1.png"
                    alt={select.name}
                    width={72}
                    height={72}
                    objectFit="cover"
                    layout="fixed"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl text-gray-850 font-semibold line-clamp-1">
                    {select.name}
                  </span>
                  <span className="text-lg text-gray-500 font-medium w-3/4 line-clamp-2">
                    {select.description}
                  </span>
                </div>

                <div className="max-w-sm mx-auto">
                  <label className="inline-flex items-center">
                    <input
                      className="text-green-500 w-10 h-10 mr-2  cursor-pointer focus:ring-green-400 focus:ring-opacity-25 border border-gray-300 rounded-xl"
                      type="checkbox"
                      checked={isItemSelected}
                      onChange={() => selectHandler(select.id)}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="self-start">
        <PermissionSaveModal
          modalOpenButton={<Button>Save Permissions</Button>}
        />
      </div>
    </div>
  );
};
