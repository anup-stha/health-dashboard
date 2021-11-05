import Link from "next/link";
import { useSideBarStore } from "./useSideBarStore";

type SideBarNavItemProps = {
  state?: "active" | "inactive";
  link: string;
  children: React.ReactNode;
  title: string;
};

export const SideBarNavItem: React.FC<SideBarNavItemProps> = ({
  state = "inactive",
  link,
  children,
  title,
}) => {
  const activeStyles =
    "text-black bg-gray-200  py-4 rounded-lg cursor-pointer hover:bg-gray-200 group";
  const inactiveStyles =
    "text-gray-600 hover:text-gray-900 py-4 rounded-lg cursor-pointer hover:bg-gray-100 group";

  const { open } = useSideBarStore();

  return (
    <li className={state === "active" ? activeStyles : inactiveStyles}>
      <div
        className={`flex relative ${
          open
            ? "items-start justify-start px-4"
            : "items-center justify-center delay-300"
        }`}
      >
        <Link href={link}>
          <a className={open ? "flex items-center gap-x-4" : ""}>
            {children}
            {open && (
              <span className="text-xl font-bold sm:text-lg">{title}</span>
            )}
          </a>
        </Link>

        {!open && (
          <div className="text-gray-50 rounded-md shadow-E200 bg-gray-800  h-10 absolute left-[150%] opacity-0 w-0 group-hover:w-36 group-hover:opacity-100 transition-all duration-300 z-0 text-lg flex items-center justify-center">
            {title}
          </div>
        )}
      </div>
    </li>
  );
};
