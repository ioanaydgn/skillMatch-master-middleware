import { Request, Response, NextFunction } from "express";

// Define roles and permissions (this can be stored in your database or configuration)
interface RolePermissions {
  [key: string]: string[];
}

const rolePermissions: RolePermissions = {
  admin: ['createCustomRole', 'deleteCustomRole', 'updateCustomRole', 'getAllCustomRoles', 'getCustomRoleById'],
  manager: ['createCustomRole', 'getAllCustomRoles', 'getCustomRoleById'],
  employee: ['getCustomRoleById']
};

// Middleware to check role constraints
function roleConstraint(role: string) {
  return function(req: Request, res: Response, next: NextFunction) {
    const userRole = (req.body.user && req.body.user.accountType) || ''; // Assuming role is included in the user object

    if (!userRole || !rolePermissions[userRole] || !rolePermissions[userRole].includes(req.route.path)) {
      return res.status(403).send("Unauthorized");
    }

    next();
  };
}

export default roleConstraint;
