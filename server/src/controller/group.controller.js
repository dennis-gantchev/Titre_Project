import { validationResult } from 'express-validator';
import model from "../models";
import GroupService from "../service/group.service";
const { Account,Group, Role, sequelize } = model

const GroupController = {
    create: async (req, res) => {
        const {errors} = validationResult(req)
        console.log(req.body)
        console.log(req.file)
        console.log(errors)

        if(errors.length){
            res.status(400).send({ok: false, status:400, errors: errors})
            return
        }

        const t = await sequelize.transaction()
        try{
            const { accountId } = req.params
            const account = await Account.findOne({ where: {id: accountId}})
            const newGroup = GroupService.create(req, account)
            console.log(newGroup)
            const group = await Group.create(
                newGroup,
                {include: [Role] , transaction: t}
            )
            await account.addGroup(group,{ transaction: t })
            const roles = await group.getRoles({ transaction: t })
            await account.addRole(
                roles.filter(role => role.getDataValue("name")==="Responsable")[0],
                { transaction: t }
            )
            console.log(account)
            await t.commit();

            res.status(201).send({ok: true, status:201})
        }catch (e) {
            console.log(e)
            await t.rollback();
            res.status(500).send({ok: false, status:500})
        }

        res.status(200)
    },
    index: async (req, res) => {

        try{
            const pageSize = 12
            const offset = (req.params.page - 1 ) * pageSize
            const account = await Account.findOne({where: { id: req.params.accountId}, include: [Role, Group]})
            console.log(account)
            const groups = await account.getGroups({include: [Role]})
            const roles = await account.getRoles({include: [Group], limit: pageSize, offset: offset})
            const count = await account.countRoles()
            console.log(roles)
            res.status(200).send({ok: true, status:200, count: count, roles: roles})
        }catch(e){
            res.status(500).send({ok: false, status: 500})
        }

    },
    show: async (req, res) => {
        const error = validationResult(req)
        console.log(error)
    }
}


export default GroupController