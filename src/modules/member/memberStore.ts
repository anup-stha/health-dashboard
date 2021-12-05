import create from "zustand";
import { MemberList, MemberListResponse } from "@/types";
import { combine, devtools } from "zustand/middleware";
import { getMemberList } from "@/services/requests/userRequests";

const initialState = {
  memberList: [] as MemberList,
  pagination: {},
  loading: false,
  selectedRole: {
    id: 1,
    name: "Superadmin",
  },
  status: {
    state: false,
    message: "",
  },
};

export const store = combine(initialState, (set) => ({
  setMemberList: (res: MemberListResponse) => {
    console.log(res);
    set({
      status: { state: res.status, message: res.message },
      memberList: res.data.list,
      pagination: res.data.pagination,
    });
  },
  toggleLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  setLoadingTrue: () => {
    set(() => ({ loading: true }));
  },
  setLoadingFalse: () => {
    set(() => ({ loading: false }));
  },
  setSelectedRole: (role: { id: number; name: string }) => {
    set(() => ({ selectedRole: { id: role.id, name: role.name } }));
  },

  setError: (message: string) => {
    set({
      status: {
        state: true,
        message,
      },
    });
  },

  getMemberListFromServer: async () => {
    await getMemberList(1)
      .then((res) =>
        set({
          status: { state: res.data.status, message: res.data.message },
          memberList: res.data.data.list,
          pagination: res.data.data.pagination,
        })
      )
      .catch(() => {
        set({ loading: false });
      });
  },
}));

export const memberStore = create(devtools(store, "member"));
