interface Permission {
  id: number;
  name: string;
  slug: string;
  desc: string;
}

interface MemberDetailCategory {
  id: number;
  name: string;
  slug: string;
  value_type: string;
  required: boolean;
}

interface RoleAccess {
  id: number;
  name: string;
  slug: string;
  desc: string;
}

export interface Role {
  id: number;
  name: string;
  slug: string;
  desc: string;
  member_limit: number;
  public: boolean;
  permissions: Permission[];
  member_detail_categories: MemberDetailCategory[];
  role_access: RoleAccess[];
}

// Post Body

interface RoleCreateBody {
  name: string;
  desc: string;
  member_limit: number;
  public: boolean;
  permissions?: number; // permission id -> is nullable
}

interface RoleUpdateBody {
  id: number;
  name?: string;
  member_limit?: number;
  public?: boolean;
}

interface RoleAssignBody {
  data: {
    p_role_id: number; // Parent Role ID
    c_role_id: number; // Child Role ID
  }[];
}

// Role API Response

interface RoleListResponse extends ApiDefaultResponse {
  data: Role[];
}

interface RoleDetailsResponse extends ApiDefaultResponse {
  data: Role;
}

interface RoleMutateResponse extends ApiDefaultResponse {
  data: Role;
}

interface RoleAddPermission extends ApiDefaultResponse {
  data: Permission[];
}
