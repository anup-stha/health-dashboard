/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

// import { deleteUser } from "@/services/requests/authRequests";
// import { User } from "@/types";
// import { Copy, Delete, Edit } from "react-feather";
// import { AvatarWithEmail } from "../Avatar";

// type OrgTableRowType = {
//   data?: User;
//   setData?: any;
//   key?: any;
//   setEdit?: any;
// };

// export const UserRow: React.FC<OrgTableRowType> = ({
//   data,
//   key,
//   setData,
//   setEdit,
// }) => {
//   return data ? (
//     <tr
//       key={key}
//       className="px-16 text-xl font-medium text-gray-800 lg:text-xl sm:px-0"
//     >
//       <td>
//         <AvatarWithEmail name={data && data.username} email={data.email} />
//       </td>
//       <td>{data.firstName}</td>
//       <td>{data.lastName}</td>
//       <td>{data.phone}</td>

//       <td className="capitalize">{data.userType}</td>
//       <td className="px-0 py-4">
//         <div className="flex items-center space-x-4">
//           <Copy
//             name="copy"
//             className="text-gray-400 cursor-pointer hover:text-gray-800"
//           />
//           <Edit
//             name="edit"
//             onClick={() => setEdit(data.id)}
//             className="text-gray-400 cursor-pointer hover:text-gray-800"
//           />
//           <Delete
//             onClick={async () => {
//               await deleteUser(data.id).then((res) => {
//                 setData([]);
//               });
//             }}
//             name="delete"
//             className="text-red-500 cursor-pointer hover:text-red-800"
//           />
//         </div>
//       </td>
//     </tr>
//   ) : (
//     <div>Loading</div>
//   );
// };

// export const UserCard: React.FC<OrgTableRowType> = ({ data, key }) => {
//   return data ? (
//     <div
//       key={key}
//       className="hidden w-full px-4 py-6 bg-white rounded-sm sm:block sm:text-base shadow-E200"
//     >
//       <div className="flex flex-col space-y-12">
//         <div className="flex items-center justify-between">
//           <AvatarWithEmail name={data && data.username} email={data.email} />
//           {data.userType}
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex space-x-4">
//             <div>
//               {data.firstName}
//               {data.lastName}
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Copy
//               name="copy"
//               className="text-gray-400 cursor-pointer hover:text-gray-800"
//             />
//             <Edit
//               name="edit"
//               className="text-gray-400 cursor-pointer hover:text-gray-800"
//             />
//             <Delete
//               name="delete"
//               className="text-gray-400 cursor-pointer hover:text-gray-800"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div>Loading</div>
//   );
// };

export {};
