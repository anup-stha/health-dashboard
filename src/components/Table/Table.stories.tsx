import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Table } from "./Table";
import { UserCardView, UserTableRowComponent } from "./DefaultUserTableRow";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const UserTable = Template.bind({});

UserTable.args = {
  data: [
    {
      createdAt: "2021-10-19T22:51:04.632Z",
      name: "Ethel Gusikowski",
      avatar: "https://cdn.fakercloud.com/avatars/waghner_128.jpg",
      isActive: false,
      age: 82,
      email: "Devon36@gmail.com",
      isDoctor: true,
      country: "JO",
      id: "1",
    },
    {
      createdAt: "2021-10-19T13:56:20.666Z",
      name: "Mr. Anthony Cummerata",
      avatar: "https://cdn.fakercloud.com/avatars/mufaddal_mw_128.jpg",
      isActive: true,
      age: 37,
      email: "Shawna63@yahoo.com",
      isDoctor: false,
      country: "TK",
      id: "2",
    },
    {
      createdAt: "2021-10-19T11:04:19.704Z",
      name: "Dr. Matthew Corwin",
      avatar: "https://cdn.fakercloud.com/avatars/swooshycueb_128.jpg",
      isActive: true,
      age: 38,
      email: "Brandi_Boyer@yahoo.com",
      isDoctor: false,
      country: "GW",
      id: "3",
    },
    {
      createdAt: "2021-10-19T18:07:00.224Z",
      name: "Alfonso Corwin",
      avatar: "https://cdn.fakercloud.com/avatars/kevinoh_128.jpg",
      isActive: false,
      age: 65,
      email: "Tyra_Kiehn80@yahoo.com",
      isDoctor: false,
      country: "ER",
      id: "4",
    },
    {
      createdAt: "2021-10-20T01:42:49.793Z",
      name: "Sylvester Thiel",
      avatar: "https://cdn.fakercloud.com/avatars/jlsolerdeltoro_128.jpg",
      isActive: false,
      age: 8,
      email: "Hannah.Brekke@gmail.com",
      isDoctor: false,
      country: "GF",
      id: "5",
    },
    {
      createdAt: "2021-10-19T10:07:46.846Z",
      name: "Diana O'Connell",
      avatar: "https://cdn.fakercloud.com/avatars/sharvin_128.jpg",
      isActive: false,
      age: 1,
      email: "Keshawn24@gmail.com",
      isDoctor: false,
      country: "PE",
      id: "6",
    },
    {
      createdAt: "2021-10-19T17:05:17.068Z",
      name: "Brent Schimmel",
      avatar: "https://cdn.fakercloud.com/avatars/tumski_128.jpg",
      isActive: true,
      age: 48,
      email: "Jake.Wolf@gmail.com",
      isDoctor: false,
      country: "GY",
      id: "7",
    },
    {
      createdAt: "2021-10-20T04:32:45.262Z",
      name: "Laura Zulauf MD",
      avatar: "https://cdn.fakercloud.com/avatars/lingeswaran_128.jpg",
      isActive: false,
      age: 55,
      email: "Timmothy46@hotmail.com",
      isDoctor: false,
      country: "BF",
      id: "8",
    },
    {
      createdAt: "2021-10-19T13:11:51.128Z",
      name: "Rudy Homenick",
      avatar: "https://cdn.fakercloud.com/avatars/joki4_128.jpg",
      isActive: true,
      age: 21,
      email: "Jody75@yahoo.com",
      isDoctor: false,
      country: "LV",
      id: "9",
    },
    {
      createdAt: "2021-10-19T15:55:13.660Z",
      name: "Julian Feil",
      avatar: "https://cdn.fakercloud.com/avatars/aleinadsays_128.jpg",
      isActive: false,
      age: 24,
      email: "Kailey.Jaskolski@gmail.com",
      isDoctor: false,
      country: "CN",
      id: "10",
    },
  ],
  tableHeadings: ["Name", "Status", "Email", "Country", "Active"],
  tableRowComponent: <UserTableRowComponent />,
  tableMobileViewComponent: <UserCardView />,
};
