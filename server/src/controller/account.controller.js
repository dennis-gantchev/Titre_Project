import model from "../models"
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import {count} from "types/lib/types/hash";

dotenv.config()
const { Account, Role, Group } = model
const AccountController = {
    index: (req, res) => {

    },
    show: async (req, res) => {
        const { id } = req.params

        try{
            const account = await Account.findOne({
                attributes: ["id","firstName", "lastName", "createdAt"],
                include: [{ model: Group, attributes: ["id", "name"]}] ,
                where: {id: id}
            })
            res.status(200).send({ok:true, status: 200, account: account})

        }catch (e){
            console.log(e)
            res.status(500).send({ok: false, status: 500})
        }
    },
    profile:async (req,res) => {
        const { accountId } = req.params

        try {
            const account = await Account.findOne({where: {id: accountId}})
            const countGroup = await account.countGroups()

            res.status(200).send({
                ok: true,
                status:200,
                account: {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    email: account.email,
                    createdAt: account.createdAt,
                    updatedAt: account.updatedAt,
                },
                countGroup: countGroup
            })
        }catch(e){
            console.log(e)
            res.status(500).send({ok: false, status:500})
        }
    },
    create:async (req, res)   => {
        //console.log(req)
        const { errors } = validationResult(req)

        if(errors.length){
            res.status(400).send({ok:false,status:400,errors:errors})
            return
        }
        try{

            const account = await Account.create(req.body)
            const salt = bcrypt.genSaltSync(Number(process.env.salt))
            account.password = bcrypt.hashSync(account.password, salt)
            console.log(account)
            await account.save()
            res.status(201).send({ok: true, status:201})
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }
    },
    edit:async (req, res) => {
        const { accountId } = req.params

        try {
            const account = await Account.findOne({where: {id: accountId}})


            res.status(200).send({
                ok: true,
                status:200,
                account: {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    email: account.email
                }
            })
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }

    },
    update:async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors:errors})
            return
        }
        const { firstName, lastName, email } = req.body
        try{
            const account = await Account.findOne({where: {id: req.params.accountId}})

            account.firstName = firstName
            account.lastName = lastName
            account.email = email
            account.updatedAt = Date.now()

            await account.save()
            res.status(200).send({ok: true, status:200})
        }catch(e){
            res.status(500).send({ok: false, status: 500})
        }



    },
    delete: async (req, res) => {

        try {
            const account = await Account.destroy({where: {id: req.params.accountId}})
            res.status(200).send({ok: true, status:200})
        }catch(e){
            res.status(500).send({ok: false, status:200})
        }
    }


}


export default AccountController