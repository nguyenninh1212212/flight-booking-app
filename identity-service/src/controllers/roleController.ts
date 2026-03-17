import roleService from "../services/roleService";
import { success, error } from "../util/response";

const roleController = {
  getAllRoles: async (req: any, res: any) => {
    try {
      const roles = await roleService.getAllRoles();
      success(res, roles, "Roles retrieved successfully", "ROLES_RETRIEVED");
    } catch (err: any) {
      error(res, err.message, "ROLES_RETRIEVAL_FAILED", 500);
    }
  },
  addRole: async (req: any, res: any) => {
    try {
      const { name } = req.body;
      const newRole = await roleService.createRole(name);
      success(res, newRole, "Role added successfully", "ROLE_ADDED");
    } catch (err: any) {
      error(res, err.message, "ROLE_CREATION_FAILED", 500);
    }
  },
  updateRole: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedRole = await roleService.updateRole(id, name);
      success(res, updatedRole, "Role updated successfully", "ROLE_UPDATED");
    } catch (err: any) {
      error(res, err.message, "ROLE_UPDATE_FAILED", 500);
    }
  },
};

export default roleController;
