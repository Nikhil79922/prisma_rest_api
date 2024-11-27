import {createUser,updateUser,showUser,fetchUsers,deleteUser,clearUser} from "../controller/Usercontroller.js"
import { Router } from "express"

const route=Router();

route.get("/fetchUsers",fetchUsers)
route.get("/showUser/:id",showUser)
route.post("/create",createUser);
route.patch("/update/:id",updateUser);
route.delete("/deleteUser/:id",deleteUser);
route.delete("/clearUser",clearUser);

export default route;
