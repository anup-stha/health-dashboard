import { useRouter } from "next/router";
import { useSideBarStore } from "./useSideBarStore";

type SideBarNavItemProps = {
  state?: "active" | "inactive";
  link?: string;
  children: React.ReactNode;
  title: string;
  mainItem?: boolean;
};

export const SideBarNavItem: React.FC<SideBarNavItemProps> = ({
  state = "inactive",
  link,
  children,
  title,
  mainItem,
}) => {
  const activeStyles =
    "text-gray-900 bg-gray-200  py-3 rounded-lg cursor-pointer hover:bg-gray-200 ";
  const inactiveStyles =
    "text-gray-600 hover:text-gray-900 py-3 rounded-lg cursor-pointer hover:bg-white ";
  const mainItemStyles =
    "text-gray-600 hover:text-gray-900 py-3 rounded-lg cursor-pointer bg-white ";

  const { open } = useSideBarStore();
  const router = useRouter();

  return (
    <li
      className={
        state === "active"
          ? activeStyles
          : mainItem
          ? mainItemStyles
          : inactiveStyles
      }
      onClick={() => link && router.push(link)}
    >
      <div
        className={`flex relative ${
          open
            ? "items-start justify-start px-4 group"
            : "items-center px-4 delay-300 group"
        }`}
      >
        <span
          className={
            open ? " flex items-center gap-x-4" : " flex items-center gap-x-4"
          }
        >
          {children}

          {open && (
            <span className="text-xl font-bold sm:text-lg">{title}</span>
          )}
        </span>

        {!open && (
          <div className="text-gray-50 rounded-md shadow-E200 bg-gray-800  h-10 absolute left-[150%] opacity-0 w-0 group-hover:w-36 group-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
            {title}
          </div>
        )}
      </div>
    </li>
  );
};
