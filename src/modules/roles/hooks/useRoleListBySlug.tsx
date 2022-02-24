/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/24/22, 2:20 PM
 *
 *
 */

/*
export const useRoleListBySlug = (role_slug: string) => {
  return useQuery(
    ["roles_by_slug", role_slug],
    () => getRoleListBySlug(role_slug),
    {
      enabled: !!role_slug,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        data && useRoleStore.getState().setRoleListBySlug(data.data);
        const role = useCurrentMemberStore.getState().userRole;
        if (isEmpty(role)) {
          useCurrentMemberStore
            .getState()
            .setCurrentUserRole(data.data.data[data.data.data.length - 1]);
        } else {
          const selectedRoleFromResponse = data.data.data.find(
            (resRole) => resRole.id === role.id
          );
          selectedRoleFromResponse &&
            useCurrentMemberStore
              .getState()
              .setCurrentUserRole(selectedRoleFromResponse);
        }
      },
    }
  );
};
*/

export {};
