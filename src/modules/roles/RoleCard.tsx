import Image from "next/image";
import { Button } from "@/components/Button";
import { Warning } from "phosphor-react";
import { useRouter } from "next/router";

type RoleCardPropsType = {
  id: number;
  title: string;
  description: string;
  permissionCount: number;
  memberLimit: number;
};

export const RoleCard: React.FC<RoleCardPropsType> = ({
  id,
  title,
  description,
  permissionCount,
  memberLimit,
}) => {
  const router = useRouter();

  return permissionCount !== 0 ? (
    <div
      className={`relative flex flex-col items-start justify-between overflow-hidden h-64 bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200`}
    >
      <div className="space-y-2">
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
          <div className="self-start text-lg text-gray-500 font-normal">
            Member Limit: {memberLimit} | Permissions: {permissionCount}
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700 w-4/5 line-clamp-2">
          {description} {/** 92 CHARS */}
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
            Edit Permissions
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`relative flex flex-col items-start justify-between overflow-hidden h-64  bg-red-50  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200 bg-opacity-80 ring-1 ring-red-500 ring-opacity-10`}
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
            Edit Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};
