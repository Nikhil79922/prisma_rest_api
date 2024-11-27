import prisma from "../DB/db.config.js";

//create data
export async function createUser(req, res) {
    const { name, email, password } = req.body;

    // email check 
    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })


    // create user 
    if (findUser) {
        return res.status(400).json({ message: "Email alreaady exists , Try with some different Email" })
    } else {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        return res.status(200).json({ message: "New User created 🥳" })
    }
}

//Updating data
export async function updateUser(req, res) {
    const userId = req.params.id
    const { name, email, password } = req.body;

    const verifyUser = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        }
    })
    if (verifyUser) {
        const updateData = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        return res.status(200).json({ message: "User updated" })
    }
    else {
        return res.status(400).json({ message: "User not found" })
    }
}

//reading data
export async function showUser(req, res) {
    let userId = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        },
         //Data with users details and there posts details
         include:{
            post:true,
            comment:true,
        }


        //Data with users details and there post details,with only specific post details
        // include:{
        //     post:{
        //         select:{
        //             id:true,
        //             title:true,
        //             comment_count:true,
        //         }
        //     }
        // }


        //Data:- only the count of post and comment 
        // select:{
        //     _count:{
        //         select:{
        //             post:true,
        //             comment:true
        //         }
        //     }
        // }

    })
    if (user){
        return res.status(200).json({data:user})
    }
    else{
        return res.status(400).json({ message: "User not found" })
    }

}

// Reading All the data 
export async function fetchUsers(req, res) {
   
    const user = await prisma.user.findMany({
        //Data with users details and there posts details
        include:{
            post:true,
            comment:true,
        }


        //Data with users details and there post details,with only specific post details
        // include:{
        //     post:{
        //         select:{
        //             id:true,
        //             title:true,
        //             comment_count:true,
        //         }
        //     }
        // }


        //Data:- only the count of post and comment 
        // select:{
        //     _count:{
        //         select:{
        //             post:true,
        //             comment:true
        //         }
        //     }
        // }



        
    })
    if (user){
        return res.status(200).json({data:user})
    }
    else{
        return res.status(400).json({ message: "No User Found!" })
    }

}

// Delete User
export async function deleteUser(req, res) {
    let userId = req.params.id;
    const user = await prisma.user.delete({
        where:{
            id:Number(userId)
        }
    })
    if (user){
        return res.status(200).json({message:"User has been deleted" , success:true})
    }
    else{
        return res.status(400).json({ message: "No User Found!" })
    }

}

//Delete all data 
export async function clearUser(req, res) {
    const user = await prisma.user.deleteMany({})
    if (user){
        return res.status(200).json({message:"Table data is Clear 🧹" , success:true})
    }
    else{
        return res.status(400).json({ message: "No data is Available" })
    }
}
