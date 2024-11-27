import express, { urlencoded } from "express"
import "dotenv/config"
import userRoute from "./route/userRoute.js";
import PostRoute from "./route/postRoute.js";
import CommentRoute from "./route/commentRoute.js";

const app=express();
const port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello world!")
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// routes
app.use("/user",userRoute);
app.use("/post",PostRoute);
app.use("/comment",CommentRoute);

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})