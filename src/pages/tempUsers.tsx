import { Sidebar } from "@/routes/sidebar";
import { useSideBarStore } from "@/routes/sidebar/useSideBarStore";
import { NextPage } from "next";
import { addons, mockChannel } from "@storybook/addons";
import {
  createUser,
  editUser,
  listUserList,
} from "@/lib/requests/authRequests";
import { useEffect, useState } from "react";
import { UserList } from "@/types";
import { Table } from "@/components/Table/Table";
import { UserCard, UserRow } from "@/components/Table/UserTableRow";
import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import MainLayout from "@/layout/MainLayout";

addons.setChannel(mockChannel());

const Users: NextPage = () => {
  const { open } = useSideBarStore();
  const [userList, setUserList] = useState<UserList>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const listUser = async () => {
      await listUserList().then((response) => setUserList(response.data));
    };
    listUser();
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | null>("");
  const [type, setType] = useState<
    "organization" | "superuser" | "staff" | "patient" | any
  >("superuser");

  useEffect(() => {
    const selectedUserData = userList.filter(
      (element) => element.id === selectedUserId
    );
    if (selectedUserData.length === 0) return;
    setFirstName(selectedUserData[0].firstName);
    setLastName(selectedUserData[0].lastName);
    setUsername(selectedUserData[0].username);
    setEmail(selectedUserData[0].email);
    setPhone(selectedUserData[0].phone);
    setType(selectedUserData[0].userType);
  }, [selectedUserId]);

  const setToInitial = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setType("");
  };

  return (
    <MainLayout>
      <div className="relative">
        <Sidebar />
        <div
          className={
            !open ? "ml-36 mt-24 mb-8 mr-12" : "ml-[20%] mt-24 mr-12 mb-8"
          }
        >
          <Table
            data={userList}
            setData={setUserList}
            setEdit={setSelectedUserId}
            tableHeadings={[
              "username",
              "First Name",
              "Last Name",
              "Email",
              "Phone",
              "User Type",
            ]}
            tableRowComponent={<UserRow />}
            tableMobileViewComponent={<UserCard />}
          />

          <form
            className="w-1/3 mt-12 space-y-8"
            onSubmit={async (e) => {
              e.preventDefault();
              await createUser({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                username,
                user_type: type,
              })
                .then((response) => {
                  setUserList([...userList, response.data]);
                  setToInitial();
                })
                .catch((error) => console.log(error));
            }}
          >
            <PrimaryInput
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
            <PrimaryInput
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
            <PrimaryInput
              placeholder="email"
              type="text"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <PrimaryInput
              placeholder="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <PrimaryInput
              placeholder="Phone"
              type="text"
              value={phone ? phone : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
            <PrimaryInput
              placeholder="type"
              type="text"
              value={type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
            />
            <div
              className="flex space-x-2"
              onClick={async () => {
                selectedUserId !== null &&
                  (await editUser(
                    {
                      first_name: firstName,
                      last_name: lastName,
                      email,
                      phone,
                      username,
                      user_type: type,
                    },
                    selectedUserId
                  ).then(async () => {
                    setSelectedUserId(null);
                    await listUserList().then((response) =>
                      setUserList(response.data)
                    );
                    setToInitial();
                  }));
              }}
            >
              <Button type="submit">Submit</Button>
              <Button type="button">Update Data</Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
