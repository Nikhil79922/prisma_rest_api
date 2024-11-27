import {createComment,updateComment,showComment,fetchComments,deleteComment,clearComment} from "../controller/commentController.js"
import { Router } from "express"

const route=Router();

route.get("/fetchComments",fetchComments)

route.get("/showComment/:id",showComment)

route.post("/createComment",createComment);

route.patch("/updateComment/:id",updateComment);

route.delete("/deleteComment/:id",deleteComment);

route.delete("/clearComment",clearComment);

export default route;