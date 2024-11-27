import {createPost,updatePost,showPost,fetchPosts,deletePost,clearPost,searchPost} from "../controller/postController.js"
import { Router } from "express"

const route=Router();

route.get("/fetchPosts",fetchPosts)

route.get("/showPost/:id",showPost)

route.post("/createPost",createPost);

route.patch("/updatePost/:id",updatePost);

route.delete("/deletePost/:id",deletePost);

route.delete("/clearPost",clearPost);

route.get("/searchPost",searchPost);

export default route;
