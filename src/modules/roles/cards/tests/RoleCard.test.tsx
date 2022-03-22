import { render } from "@testing-library/react";

import { RoleCard } from "@/modules/roles/cards/RoleCard";

const stubbedRole = {
  id: 1,
  title: "Test Role",
  slug: "test_role",
  description: "Test Description",
  permissionCount: 4,
  memberLimit: 1,
  isPublic: true,
};

describe("Home", () => {
  test("it render", () => {
    const object = render(<RoleCard {...stubbedRole} />);
    console.log(object);
  });
});

export {};
