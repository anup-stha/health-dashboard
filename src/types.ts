/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:54 PM
 *
 *
 */

/* eslint-disable no-unused-vars */

/* eslint-disable camelcase */
export interface ChartData {
  [index: string | number]: string | number | any;
}

type Id = string | number;

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type LogoutRequest = {
  refresh: string;
};

export type LoginRefreshRequest = {
  refresh: string;
};

export type LoginRefreshResponse = {
  access: string;
};

export type OrganisationListType = OrganisationDetailType[];

export type OrganisationDetailType = {
  id: string | number;
  meta: OrgaisationMeta;
  createdAt: string;
  name: string;
  active: boolean;
  verified: boolean;
  updatedAt: string;
  createdBy: string;
  owner: number | string;
  ownerName: string;
};

export type OrganisationRequestType = {
  meta: OrgaisationMeta;
  name: string;
  active?: boolean;
  verified?: boolean;
  owner: string;
};

export type UserType = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  userType: "Organisation" | "staff" | "patient" | "superuser";
  username: string;
};

export type UserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  user_type: "Organisation" | "staff" | "patient" | "superuser" | any;
  username: string;
};

export type UserList = User[];

export type OrgaisationMeta = {
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  address?: string;
  municipality?: string;
  ward?: string;
};

type StatusType = {
  status: boolean;
  message: string;
};

export type Permission = {
  id: Id;
  name: string;
  description: string;
};

export type RoleSummary = {
  id: Id;
  name: string;
  desc: string;
};

export type Role = {
  id: Id;
  name: string;
  desc: string;
  member_limit: number;
  public: boolean;
  permissions: Permission[];
  member_detail_categories: MemberDetailCategory[];
};

export type User = {
  id: Id;
  email: string;
  member_id: string | number;
  name: string;
  phone: string;
  address: string;
  image: string;
  active: boolean;
  verified: boolean;
  role: Role;
};

export type LoginResponse = StatusType & {
  data: {
    token: string;
    user: User;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RoleListResponse = StatusType & {
  data: Role[];
};

export type RoleDetailResponse = StatusType & {
  data: Role;
};

export type RoleAddBody = {
  name: string;
  memberLimit: number;
  isPublic: boolean;
  description: string;
};

export type RoleUpdateBody = {
  id: Id;
  name: string;
  memberLimit: number;
  isPublic: boolean;
  description: string;
};

export type BasicMember = {
  id: Id;
  uuid: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  image: string;
  address: string;
  active: boolean;
  verified: boolean;
  ref_key?: string;
  email: string;
  can_login: boolean;
};

export type Member = BasicMember & {
  role: RoleSummary;
};

export type OrgMemberAddReq = {
  name: string;
  role_id: number;
  address: string;
  lat?: number;
  lng?: number;
  phone: string;
  ref_key?: string | number;
  email: string;
  password: string;
};

export type OrgMemberAddRes = { data: BasicMember & { role: Role } };

export type NormalMemberAddReq = {
  name: string;
  role_id: number;
  address: string;
  lat?: number;
  lng?: number;
  phone: string;
  ref_key?: string | number;
};

export type MemberList = Member[];
export type Pagination = {
  total: number;
  count: number;
  path: string;
  per_page: number;
  current_page: number;
  total_pages: number;
};

export type MemberListResponse = StatusType & {
  data: {
    list: MemberList;
    pagination: Pagination;
  };
};

export type MemberDetails = {
  id: number;
  name: string;
  detail_category_id: number;
  slug: string;
  value: string | number | readonly string[] | undefined;
};

export type MemberDetailsListResponse = StatusType & {
  data: MemberDetails[];
};

export type MemberDetailCategoryBody = {
  role_id: number;
  name: string;
  value_type: string;
  required: 1 | 0 | true | false;
};

export type MemberDetailCategory = {
  id: number;
  name: string;
  slug: string;
  value_type: string;
  required: 1 | 0 | true | false;
};

export type MemberDetailCategoryUpdateBody = {
  name: string;
  value_type: string;
  required: 1 | 0 | true | false;
};

export type MemberDetailCategoryUpdate = {
  id: number;
  name: string;
  value_type: string;
  required: 1 | 0 | true | false;
};

export type MemberDetailCategoryAddResponse = StatusType & {
  data: MemberDetailCategory;
};

export type MemberDetailCategoryUpdateResponse = StatusType & {
  data: MemberDetailCategoryUpdate;
};

export type PermissionListResponse = StatusType & {
  data: Permission[];
};

export type NullDataResponse = StatusType & { data: null | "" };

export type AddTestBody = {
  name: string;
  desc: string;
  public: 1 | 0 | true | false;
};
export type AddTestCategoryBody = {
  name: string;
  desc: string;
  test_category_id: number;
  public: 1 | 0 | true | false;
};

export type UpdateTestCategoryBody = {
  name: string;
  desc: string;
  public: 1 | 0 | true | false;
};

export type AddTestCategorySubBody = AddTestBody & {
  test_category_id: 1 | 0;
};

export type AddTestResponse = StatusType & {
  data: {
    id: Id;
    name: string;
    desc: string;
    slug: string;
    public: boolean;
    sub_categories: Array<TestSubCategory>;
  };
};

export type TestSubCategory = {
  id: Id;
  name: string;
  desc: string;
  slug: string;
  public: boolean;
  category_id: Id;
};

export type AddTestCategoryResponse = StatusType & {
  data: {
    id: Id;
    name: string;
    desc: string;
    slug: string;
    public: boolean;
    category_id: Id;
  };
};

export type Test = {
  id: Id;
  name: string;
  desc: string;
  slug: string;
  public: boolean;
  sub_categories: Array<TestSubCategory>;
};

export type ListTestResponse = StatusType & {
  data: Test[];
};

export type Subscription = {
  id: Id;
  name: string;
  price: string;
  slug: string;
  interval_type: string;
  interval_value: number;
  grace_period: number;
  sync_limit: number;
  test_limit: number;
};

export type SubscriptionListResponse = StatusType & {
  data: Subscription[];
};

export type SubscriptionAddResponse = StatusType & {
  data: Subscription;
};

export type SubscriptionBody = {
  name: string;
  price: string | number;
  interval_type: string;
  interval_value: number;
  grace_period: number;
  sync_limit: number;
  test_limit: number;
  role_id: number;
  test_count?: number;
};

export type SubscriptionUpdateBody = {
  name: string;
  price: string | number;
  interval_type: string;
  interval_value: number;
  grace_period: number;
  sync_limit: number;
  test_limit: number;
  test_count?: number;
};

export type MemberSubscriptionDetails = {
  start_date: number;
  end_date: number;
  active: boolean;
  total_test_count: number;
  plan: {
    id: number;
    name: string;
    price: string;
    slug: string;
    interval_type: string;
    interval_value: number;
    grace_period: number;
    sync_limit: number;
    test_limit: number;
    test_categories: [];
  };
};

export type MemberSubscriptionDetailsResponse = StatusType & {
  data: MemberSubscriptionDetails;
};

export type MemberTestReport = {
  id: number;
  name: string;
  value: string;
};

export type MemberTestList = {
  id: number;
  test_date: Date;
  sync_date: Date;
  timezone: string;
  test_name: string;
  app_slug: string;
  report: MemberTestReport[];
};

export type MemberTestListData = {
  list: MemberTestList[];
  pagination: Pagination;
};

export type MemberTestListResponse = StatusType & {
  data: {
    list: MemberTestList[];
    pagination: Pagination;
  };
};

export type BasicGlobalState = {
  base: {
    system_version: string;
    date_format: string;
    data_types: string[];
    subscription_intervals: string[];
  };
};

export type GlobalStateResponse = StatusType & {
  data: BasicGlobalState;
};

export type SubscriptionTestDetails = {
  id: number;
  name: string;
  desc: string;
  slug: string;
  public: boolean;
  sub_categories: {
    id: number;
    name: string;
    desc: string;
    slug: string;
    category_id: number;
    public: boolean;
  }[];
}[];

export type SubscriptionTestDetailsResponse = StatusType & {
  data: SubscriptionTestDetails;
};
