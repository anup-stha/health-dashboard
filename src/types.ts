/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
export interface ChartData {
  [index: string | number]: string | number | any;
}

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

enum SubscriptionType {
  User = "user_subscription",
  Entity = "entity_subscription",
}

export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type BaseUser = {
  username: string;
  phone: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: Gender;
  dob: string;
  age: number;
  landline: string;
  address: string;
  municipality: string;
  district: string;
  nationality: string;
  marital_status: string;
  date_joined: string;
  updated_at: string;
  pwd_change_code: string;
  is_active: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_staff: boolean;
  is_admin: boolean;
};

export type SubscriptionStats = {
  patient_count: number;
  vital_tests_count: number;
};

type SubscriptionPlan = {
  id: string;
  plan_name: string;
  num_of_tests: number;
  sync_limit: number;
  unlimites_tests: boolean;
  slug: string;
  plan_description: string;
  grace_period: string;
};

type PlanCost = {
  id: string;
  plan: SubscriptionPlan;
  unlimites_tests: boolean;
  slug: string;
  recurrence_period: number;
  recurrence_unit: string;
  display_recurrent_unit_text: string;
  display_billing_frequency_text: string;
  cost: number;
};

type VitalResource = {
  id: number;
  start_date: string;
  end_date: string;
  max_tests: number;
  unlimited_tests: boolean;
  remaining_tests: number;
};

type Resource = {
  id: number;
  vital: VitalResource;
};

type BaseSubscription = {
  id: string;
  resource: Resource;
  subscription: PlanCost;
  date_billing_start: string;
  date_billing_end: string;
  date_billing_last: string;
  date_billing_next: string;
  active: boolean;
  cancelled: boolean;
};

export type UserSubscription = BaseSubscription & {
  user: string;
};

export type EntitySubscription = BaseSubscription & {
  entity: string;
  users_quota: number;
};

export type LoginResponse = {
  access: string;
  refresh: string;
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

export type OrganizationListType = OrganizationDetailType[];

export type OrganizationDetailType = {
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

export type OrganizationRequestType = {
  meta: OrgaisationMeta;
  name: string;
  active: boolean;
  verified: boolean;
  owner: string;
};

export type User = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  userType: "organization" | "staff" | "patient" | "superuser";
  username: string;
};

export type UserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  user_type: "organization" | "staff" | "patient" | "superuser" | any;
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
