
type Role = "ADMIN" | "WARDEN" | "STUDENT";

export const getDashboardForRole = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "WARDEN":
      return "/warden/dashboard";
    case "STUDENT":
      return "/student/dashboard";
    default:
      return "/";
  }
};
