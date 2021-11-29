import Image from "next/image";
import { Button } from "@/components/Button";
import { Warning } from "phosphor-react";
import { useRouter } from "next/router";

type RoleCardPropsType = {
  id: number;
  title: string;
  description: string;
  permissionCount: number;
};

export const RoleCard: React.FC<RoleCardPropsType> = ({
  id,
  title,
  description,
  permissionCount,
}) => {
  const router = useRouter();

  const containerStyle = `relative flex flex-col items-start justify-between overflow-hidden h-64 w-[32%] bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200`;
  return permissionCount !== 0 ? (
    <div className={containerStyle}>
      <div className="space-y-2">
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 h-">{title}</h1>
          <div className="self-start text-lg text-gray-500 font-normal">
            Total Permissions: {permissionCount}
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700 w-4/5 line-clamp-2">
          {description}
        </p>
      </div>
      <div className="absolute -right-10 -bottom-4">
        <div className="w-44 h-44 relative">
          <Image
            src={`/assets/avatar${id}.svg`}
            alt="Super User Admin Image"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <Button
            buttonSize="small"
            onClick={() => router.push(`/admin/roles/${id}`)}
          >
            View
          </Button>
          <div className="py-4 px-4 text-xl  font-medium text-gray-600 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer">
            Edit Permissions
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`relative flex flex-col items-start justify-between overflow-hidden h-64 w-[32%] bg-red-50  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200 bg-opacity-80 ring-1 ring-red-500 ring-opacity-10`}
    >
      <div className="space-y-2">
        <div className="flex flex-col justify-between space-y-2">
          <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
          <div className="font-bold text-lg text-red-500 flex gap-x-1 items-center">
            <Warning size={24} weight="duotone" />
            <span>Please add permission to this user to activate it</span>
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700 w-4/5 line-clamp-2">
          {description}
        </p>
      </div>
      <div className="absolute -right-10 -bottom-4">
        <div className="w-44 h-44 relative">
          <Image
            src={`/assets/avatar${id}.svg`}
            alt="Super User Admin Image"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <Button
            buttonSize="small"
            onClick={() => router.push(`/admin/roles/${id}`)}
          >
            View
          </Button>
          <div className="py-4 px-4 text-xl  font-medium text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200 cursor-pointer">
            Edit Permissions
          </div>
        </div>
      </div>
    </div>
  );
};
