/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

/* eslint-disable no-unused-vars */

/* eslint-disable camelcase */
export interface ChartData {
  [index: string | number]: string | number | any;
}

type Id = string | number;

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type LogoutRequest = {
  refresh: string;
};

export type StatusType = {
  status: boolean;
  message: string;
};

export type Permission = {
  id: Id;
  name: string;
  slug: string;
  description: string;
};

export type RoleSummary = {
  id: Id;
  slug: string;
  name: string;
  desc: string;
};

export type Role = {
  id: Id;
  name: string;
  desc: string;
  slug: string;
  member_limit: number;
  public: boolean;
  permissions: Permission[];
  member_detail_categories: MemberDetailCategory[];
  role_access: { id: number; name: string; slug: string; desc: string }[];
};

export type RoleAccess = {
  id: number;
  name: string;
  slug: string;
  desc: string;
};

export type User = {
  id: number;
  email: string;
  member_id: number;
  name: string;
  phone: string;
  gender: "Male" | "Female" | "Others";
  marital_status: "Single" | "Married";
  dob_ad: number | string;
  dob_bs?: number | undefined;
  address: string;
  image: string;
  active: boolean;
  verified: boolean;
  role: RoleSummary;
  lat?: number;
  lng?: number;
};

export type LoginResponse = StatusType & {
  data: {
    token: string;
    user: any;
  };
};

export type ProfileRequestResponse = StatusType & {
  data: any;
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
  id: number;
  parent_member_id: number;
  member_code: string;
  member_id: number;
  uuid: string;
  name: string;
  lat?: number;
  lng?: number;
  phone: string;
  image: string;
  address: string;
  active: boolean;
  verified: boolean;
  ref_key?: string;
  email: string;
  can_login: boolean;
  dob_ad: number;
  dob_bs?: number;
  marital_status: "Single" | "Married";
  gender: "Male" | "Female" | "Others";
};

export type Member = BasicMember & {
  role: RoleSummary | Role;
};
export type CurrentLoggedInMember = BasicMember & {
  role: Role;
};

export type MemberUpdateBody = {
  name: string;
  lat?: number;
  lng?: number;
  phone: string;
  image?: string;
  address: string;
  email: string;
  dob_ad: number;
  dob_bs?: number;
  province?: string;
  district?: string;
  city?: string;
  gender: "Male" | "Female" | "Others";
  marital_status: "Single" | "Married";
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
  dob_ad: number;
  dob_bs?: number;
  gender: string;
  marital_status: string;
};

export type OrgFinalBody = {
  name: string;
  role_id: number;
  address: string;
  lat?: number;
  lng?: number;
  phone: string;
  ref_key?: string | number;
  email: string;
  password: string;
  dob_ad: number;
  dob_bs?: number;
  gender: string;
  marital_status: string;
  detail?: { detail_category_id: number; value: string }[];
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
  dob_ad: number;
  dob_bs?: string;
  gender: string;
  marital_status: string;
};

export type MemberList = Member[];
export type PaginationObject = {
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
    pagination: PaginationObject;
  };
};

export type MemberUpdateResponse = StatusType & {
  data: any;
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
  unit: string;
  test_category_id: number;
  public: 1 | 0 | true | false;
};

export type UpdateTestCategoryBody = {
  name: string;
  desc: string;
  unit: string;
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
    unit: string;
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
  unit: string;
  category_id: Id;
};

export type AddTestCategoryResponse = StatusType & {
  data: {
    id: Id;
    name: string;
    desc: string;
    slug: string;
    public: boolean;
    unit: string;
    category_id: Id;
  };
};

export type Test = {
  id: Id;
  name: string;
  desc: string;
  slug: string;
  public: boolean;
  unit?: string;
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
  currency: string;
  interval_type: string;
  interval_value: number;
  grace_period: number;
  sync_limit: number;
  test_limit: number;
  test_categories: any[];
  [index: string]: string | number | any[];
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
  currency: string;
  plan: {
    id: number;
    name: string;
    price: string;
    slug: string;
    currency: string;
    interval_type: string;
    interval_value: number;
    grace_period: number;
    sync_limit: number;
    test_limit: number;
    test_categories: Test[];
  };
};

export type MemberSubscriptionDetailsResponse = StatusType & {
  data: MemberSubscriptionDetails;
};

export type MemberTestReport = {
  id: number;
  name: string;
  value: string;
  slug: string;
  unit: string;
  note: string[];
};

export type MemberTestList = {
  id: number;
  test_date: Date;
  sync_date: Date;
  timezone: string;
  test_name: string;
  app_slug: string;
  test_slug: string;
  temperature: number | null;
  report: MemberTestReport[];
};

export type MemberTestListData = {
  list: MemberTestList[];
  pagination: PaginationObject;
};

export type MemberTestListResponse = StatusType & {
  data: {
    list: MemberTestList[];
    pagination: PaginationObject;
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

export type OtherFields = {
  id: number;
  name: string;
  slug: string;
  value_type: string;
  required: boolean;
};

export type OtherFieldsGetResponse = StatusType & { data: OtherFields[] };
export type OtherFieldsPostResponse = StatusType & { data: OtherFields };

export type OtherFieldsPostBody = {
  name: string;
  value: string;
  required: boolean | 1 | 0;
};

export type MedicalHistory = {
  id: number;
  name: string;
  detail_category_id: number;
  slug: string;
  value: string;
  note: string;
};

export type MedicalHistoryGetResponse = StatusType & { data: MedicalHistory[] };

export type ImageUploadResponse = StatusType & { data: string };

export type Invoice = {
  id: number;
  member_id: number;
  transaction_date: number;
  gross_amount: number;
  vat_amount: number;
  discount_amount: number;
  net_amount: number;
  paid: 1 | 0;
  subscription_detail: MemberSubscriptionDetails;
  invoice_no: number;
  due_days: number;
};

export type InvoiceResponse = StatusType & {
  data: Invoice;
};

export type InvoiceListResponse = StatusType & {
  data: Invoice[];
};

export type MemberBulkData = {
  data: {
    name: string;
    dob_ad: string;
    gender: string;
    ref_key: string;
    patient_code: string;
  }[];
};

export type MemberBulkDataWithDetails = {
  role_id: number;
  parent_member_id: number;
  data: {
    name: string;
    dob_ad: string;
    gender: string;
    ref_key: string;
    patient_code: string;
    detail: {
      value: string;
      detail_category_id: number;
    }[];
  }[];
};
