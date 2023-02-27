import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import model from "../models";


const { Account, Role } = model

const AuthController = {
    login: async (req, res) => {
        const { errors } = validationResult(req)
        const errorsLogin = {
            msg: "Les identifiants n'existes pas"
        }

        if(errors.length){
            res.status(400).send({ok:false, status:400, errors:errorsLogin})
            return
        }
        try{
            const { email } = req.body
            const account = await Account.findOne({where : {email: email}})
            //const role = await Role.findOne({where: {id: account.roleId}})

            const token = jwt.sign({
                id:account.id,
                email: account.email,
                isAdmin: account.isAdmin
                //role: role.name,
                //roleId: role.id,
                //roleLevel: role.level
            },process.env.jwtSecret, { expiresIn: '1h' })

            res.status(200).send({ok: true,status:200 ,token: token})
        }catch(e){
            res.status(500).send({ok: false, status: 500})
        }



    }
}


export default AuthController