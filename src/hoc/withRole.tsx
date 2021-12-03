import { useAuthStore } from "@/modules/auth/useTokenStore";
import { adminRoutes } from "@/routes/SideBar/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const withRole = (WrappedComponent: React.FC) => {
  const RequirePermission = (props: React.Props<any>) => {
    const router = useRouter();

    const role = useAuthStore.getState().user.role;
    const [rolePermitted, setRolePermitted] = useState(false);

    useEffect(() => {
      if (role) {
        if (
          role.name === "Superadmin" &&
          adminRoutes.includes(router.pathname)
        ) {
          setRolePermitted(true);
        } else {
          router.push("/404");
        }
      }
    }, [router, role, rolePermitted]);
    return rolePermitted ? <WrappedComponent {...props} /> : <div>Loading</div>;
  };
  return RequirePermission;
};
