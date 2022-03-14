import model from "../models"
import { validationResult } from 'express-validator';

const { Role, Request, Account } = model

const RequestController = {
    resolve: async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors:errors})
            return
        }

        try{
            const { id, accountId } = req.params

            const request = await Request.findOne({where: {id: id}})

            request.agentId = accountId
            request.resolved = true
            request.updatedAt = Date.now

            await request.save()


            res.status(200).send({ok: true, status:200})
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }
    },
    indexAgentProgress: async (req, res) => {
        const { accountRole, page} = req.params
        const pageSize = 4
        const offset = (page - 1) * pageSize

        try{
            const requests = await Request.findAndCountAll({
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['name']
                }],
                attributes: ['id','name', 'createdAt'],
                where: {roleId: accountRole,resolved: false},
                limit: pageSize,
                offset: offset
            })

            res.status(200).send({ok: true,status:200, requests:requests})
        }catch (e){
            res.status(500).send({ok: false,status:500})
        }
    },
    indexAgentCompleted: async (req, res) => {
        const { accountRole, page} = req.params
        const pageSize = 4
        const offset = (page - 1) * pageSize

        try{
            const requests = await Request.findAndCountAll({
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['name']
                }],
                attributes: ['id','name', 'createdAt'],
                where: {roleId: accountRole, resolved: true},
                limit: pageSize,
                offset: offset
            })

            res.status(200).send({ok: true,status:200, requests:requests})
        }catch (e){
            res.status(500).send({ok: false, status:500})
        }
    },
    indexProgress: async (req, res) => {
        const { accountId, page} = req.params
        const pageSize = 4
        const offset = (page - 1) * pageSize

        try{
            const requests = await Request.findAndCountAll({
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['name']
                }],
                attributes: ['id','name', 'createdAt'],
                where: {clientId: accountId,resolved: false},
                limit: pageSize,
                offset: offset
            })

            res.status(200).send({ok: true,status:200, requests:requests})
        }catch (e){
            res.status(500).send({ok: false, status:500})
        }

    },
    indexCompleted: async (req, res) => {
        const { accountId, page} = req.params
        const pageSize = 4
        const offset = (page - 1) * pageSize

        try{
            const requests = await Request.findAndCountAll({
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['name']
                }],
                attributes: ['id','name', 'createdAt'],
                where: {clientId: accountId, resolved: true},
                limit: pageSize,
                offset: offset
            })

            res.status(200).send({ok: true,status:200 ,requests:requests})
        }catch (e){
            res.status(500).send({ok: false, status:500})
        }
    },
    new: async (req, res) =>{

        try{
            const roles = await Role.findAll()
            res.status(200).send({ok: true,status:200 ,roles: roles})
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }
    },
    create: async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400,errors:errors})
            return
        }

        try{
            req.body.clientId = req.params.accountId
            const request = await Request.create(req.body)
            await request.save()
            res.status(201).send({ok: true, status:201})
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }

    },
    show: async (req,res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors: errors})
            return
        }
        const { accountId , id} = req.params
        try{
            const request = await Request.findOne({ where: { id: id}})

            res.status(200).send({ok: true,status:200, request: request})
        }catch (e){
            res.status(500).send({ok: false, status:500})
        }


    },
    edit: async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors: errors})
            return
        }

        const { accountId , id} = req.params
        try{
            const request = await Request.findOne({ where: { id: id}})
            const roles = await Role.findAll()
            res.status(200).send({ok: true,status:200, request: request, roles: roles})
        }catch (e){
            res.status(500).send({ok: false, status: 500})
        }

    },
    update: async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors: errors})
            return
        }

        try{
            const { id,name, content, roleId} = req.body
            const request = await Request.findOne({where: { id: id}})

            request.name = name
            request.roleId = roleId
            request.content = content
            request.updatedAt = Date.now()

            await request.save()
            res.status(200).send({ok: true, status:200})
        }catch(e){
            res.status(500).send({ok: false, status: 500})
        }
    },
    delete: async (req, res) => {
        const { errors } = validationResult(req)
        console.log(errors)
        if(errors.length){
            res.status(400).send({ok:false, status:400, errors: errors})
            return
        }

        const { id } = req.params
        try{
            const request = await Request.destroy({where: {id: id}})
            res.status(200).send({ok: true, status: 200})
        }catch(e){
            res.status(500).send({ok: false, status:500})
        }
    }

}

export default RequestController