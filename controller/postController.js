import { query } from "express";
import prisma from "../DB/db.config.js";

//create data
export async function createPost(req, res) {
    const { user_id, title, description } = req.body;
    console.log("hello")
    const newpost = await prisma.post.create({

        data: {
            user_id: Number(user_id),
            title: title,
            description: description,
        }
    })
    return res.status(200).json({ message: "New Post created 🥳" })
}

//Updating data
export async function updatePost(req, res) {
    const PostId = req.params.id
    const { user_id, title, description } = req.body;

    const verifypost = await prisma.post.findFirst({
        where: {
            id: Number(PostId)
        }
    })
    if (verifypost) {
        const updateData = await prisma.post.update({
            where: {
                id: Number(PostId)
            },
            data: {
                user_id: Number(user_id),
                title: title,
                description: description,
            }
        })
        return res.status(200).json({ message: "Post updated" })
    }
    else {
        return res.status(400).json({ message: "Post not found" })
    }
}

//reading data
export async function showPost(req, res) {
    console.log("post")
    let postId = req.params.id;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        },
        //Data with users details and there comments details
        include: {
            comment: true,
        }


        //Data with users details and there comment details,with only specific comment details
        // include:{
        //     comment:{
        //         select:{
        //             comment:true
        //         }
        //     }
        // }


        //Data:- only the count of comments
        // select:{
        //     _count:{
        //         select:{
        //             comment:true
        //         }
        //     }
        // }
    })
    if (post) {
        return res.status(200).json({ data: post })
    }
    else {
        return res.status(400).json({ message: "post not found" })
    }

}

// Reading All the data 
export async function fetchPosts(req, res) {

    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 1

    if(page <=0){
        page=1
    }
    if(limit <=0 && limit>=100){
        limit=10
    }

    const skip=(page-1)*limit;
    const post = await prisma.post.findMany({
        skip:skip,
        //Data with users details and there comments details
        include: {
            comment: {
                include: {
                    user: true
                }
            }
        },


        //Data with users details and there comment details,with only specific comment details
        // include:{
        //     comment:{
        //         select:{
        //             comment:true
        //         }
        //     }
        // }


        //Data:- only the count of comments
        // select:{
        //     _count:{
        //         select:{
        //             comment:true
        //         }
        //     }
        // }

        orderBy: {
            id: "desc",
        },
        where: {
            //   comment_count:{
            //     gt:1
            //   }


            // OR:[
            //     {
            //         title:{
            //             startsWith:"Boy"
            //         },
            //         title:{
            //             endsWith:"Killed"
            //         }
            //     }
            // ],

            // AND:[
            //     {
            //         title:{
            //             startsWith:"Boy"
            //         },
            //         title:{
            //             endsWith:"Killed"
            //         }
            //     }
            // ],

            // NOT:{
            //     title:{
            //        startsWith:"Boy"
            //     }
            // },

            title: {
                // endsWith:"boat"
                // startsWith:"Boy"
                // equals:"Boy Killed"
            }
        }
    })
const totalPosts=await prisma.post.count()
const totalPages=Math.ceil(totalPosts/limit)
    if (post) {
        return res.status(200).json({ data: post , meta:{
            totalPosts,
            currents_page:page,
            limit:limit
        }})
    }
    else {
        return res.status(400).json({ message: "No post Found!" })
    }

}

// Delete post
export async function deletePost(req, res) {
    let postId = req.params.id;
    const post = await prisma.post.delete({
        where: {
            id: Number(postId)
        }
    })
    if (post) {
        return res.status(200).json({ message: "post has been deleted", success: true })
    }
    else {
        return res.status(400).json({ message: "No post Found!" })
    }

}

//Delete all data 
export async function clearPost(req, res) {
    const post = await prisma.post.deleteMany({})
    if (post) {
        return res.status(200).json({ message: "Table data is Clear 🧹", success: true })
    }
    else {
        return res.status(400).json({ message: "No data is Available" })
    }
}

//Searching the post through and word of description 
export async function searchPost(req,res){
    const Query=req.query.Q;
    const post=await prisma.post.findMany({
        where:{
            description:{
                contains:Query
            }
        }
    })
    if(Query){
        return res.status(200).json({ data: post });
    }
    else{
        return res.status(400).json({ message: "No post Found!" })
    }

}
