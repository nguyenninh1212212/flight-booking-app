import roleRepo from "../repo/roleRepo";
import notFoundError from "../error/notFound";
import { IDatasRes, IRole } from "../interfaces/identityType";
const roleService = {
  getAllRoles: async (page: number = 1): Promise<IDatasRes> => {
    const [total, data]: [number, IRole[]] = await Promise.all([
      roleRepo.count(),
      roleRepo.findAll(page),
    ]);
    return {
      page,
      total,
      data,
    };
  },
  getRoleByName: async (name: string) => {
    return await roleRepo.findByName(name);
  },
  createRole: async (name: string) => {
    return await roleRepo.create(name);
  },
  getDefaultRole: async (): Promise<IRole> => {
    const role = await roleRepo.findByName("USER");
    if (!role) {
      throw new notFoundError("Default role not found");
    }
    return { id: role.id, name: role.name };
  },
  updateRole: async (id: number, name: string) => {
    const existingRole = await roleRepo.findById(id);
    if (!existingRole) {
      throw new notFoundError("Role not found");
    }
    return await roleRepo.update(id, name);
  },

  destroyRole: async (id: number) => {
    try {
      const existingRole = await roleRepo.findById(id);
      if (!existingRole) {
        throw new notFoundError("Role not found");
      }
      return await roleRepo.destroy(id);
    } catch (error) {}
  },
};

export default roleService;
