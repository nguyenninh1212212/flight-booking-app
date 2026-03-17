import roleRepo from "../repo/roleRepo";
import notFoundError from "../error/notFound";
import { IRole } from "../interfaces/identityType";
const roleService = {
  getAllRoles: async () => {
    return await roleRepo.findAll();
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
};

export default roleService;
