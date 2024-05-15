import { create, deletRole, findAll, updateRole } from "../controllers/role.controller.js";


export default app => {
  app.post("/role", create);
  app.get("/roles", findAll);
  app.put("/role/:id", updateRole);
  app.delete("/role/:id", deletRole);
};
