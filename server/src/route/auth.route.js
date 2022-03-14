import { Router } from "express"
import { check } from "express-validator"
import model from "../models"
import AuthController from "../controller/auth.controller";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()
const { Account } = model
const authRoute = Router()


authRoute.post('/login',
    check('email')
        .notEmpty()
            .withMessage('Le mail ne doit pas être vide.')
        .normalizeEmail()
        .custom( async (value, {req}) => {
            const accountExist = await Account.findOne({where: {email: value}});

            if(accountExist === null){
                throw Error("Les identifiants n'existent pas")
            }else{
                const goodPassword = bcrypt.compareSync(req.body.password, accountExist.password)

                if(!goodPassword){
                    throw Error("Les identifiants n'existent pas")
                }

                return true
            }
        })
    ,
    AuthController.login
    )



export default authRoute
