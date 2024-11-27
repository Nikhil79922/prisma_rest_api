import prisma from "../DB/db.config.js";

//create data
export async function createComment(req, res) {
    const { post_id,user_id,comment } = req.body;

//Incrementing the Post comment_count while Adding a Comment 
await prisma.post.update({
    data:{
        comment_count: {
            increment: 1
        }
    }
    ,where:{
        id:post_id
    }
})
        const newComment = await prisma.comment.create({
            
            data: {
                post_id: Number(post_id),
                user_id: Number(user_id),
                comment: comment,
            }
        })
        return res.status(200).json({ message: "New Comment created 🥳" })
    }

//Updating data
export async function updateComment(req, res) {
    const CommentId = req.params.id
    const { post_id,user_id,comment } = req.body;

    const verifyComment = await prisma.comment.findFirst({
        where: {
            id: Number(CommentId)
        }
    })
    if (verifyComment) {
        const updateData = await prisma.comment.update({
            where: {
                id: Number(CommentId)
            },
            data: {
                post_id: Number(post_id),
                user_id: Number(user_id),
                comment: comment,
            }
        })
        return res.status(200).json({ message: "Comment updated" })
    }
    else {
        return res.status(400).json({ message: "Comment not found" })
    }
}

//reading data
export async function showComment(req, res) {
    console.log("Comment")
    let CommentId = req.params.id;
    const Comment = await prisma.comment.findUnique({
        where: {
            id: Number(CommentId)
        }
    })
    console.log(Comment)
    if (Comment){
        return res.status(200).json({data:Comment})
    }
    else{
        return res.status(400).json({ message: "Comment not found" })
    }

}

// Reading All the data 
export async function fetchComments(req, res) {
    const Comment = await prisma.comment.findMany({
        include:{
            post:{
                include:{
                    user:true
                }
            }
        }
    })
    if (Comment){
        return res.status(200).json({data:Comment})
    }
    else{
        return res.status(400).json({ message: "No Comment Found!" })
    }

}

// Delete Comment
export async function deleteComment(req, res) {
    let CommentId = req.params.id;

//decrementing the Post comment_count while deleting a Comment 
await prisma.post.update({
    data:{
        comment_count: {
            decrement: 1
        }
    }
})

    const Comment = await prisma.comment.delete({
        where:{
            id:Number(CommentId)
        }
    })
    if (Comment){
        return res.status(200).json({message:"Comment has been deleted" , success:true})
    }
    else{
        return res.status(400).json({ message: "No Comment Found!" })
    }

}

//Delete all data 
export async function clearComment(req, res) {
    const Comment = await prisma.comment.deleteMany({})
    if (Comment){
        return res.status(200).json({message:"Table data is Clear 🧹" , success:true})
    }
    else{
        return res.status(400).json({ message: "No data is Available" })
    }
}
