import { Router } from "express"
import { check } from "express-validator"
import RoleController from "../controller/role.controller"
import {isBoolean} from "validator";
import {where} from "sequelize";


const roleRouter = Router()

roleRouter.get('/',RoleController.index)
roleRouter.get('/edit',RoleController.edit)
roleRouter.get('/new' )
roleRouter.post('/create',
    check('name')
        .notEmpty()
            .withMessage('Le nom de la demande ne peut être vide.')
        .isAlpha('fr-FR')
            .withMessage('Le nom doit contenir seulement des lettres.')
        .isLength({min:3, max:15}) 
            .withMessage('Le nom doit contenir entre 3 et 15 caractères.')   
    ,
    check('canInviteMember')
        .isBoolean().withMessage('canInviteMember doit être un boolean')
    ,
    check('canBanMember')
        .isBoolean().withMessage('canBanMember doit être un boolean')
    ,
    check('canAssignRole')
        .isBoolean().withMessage('canAssignRole doit être un boolean')
    ,
    check('canCreateRole')
        .isBoolean().withMessage('canCreateRole doit être un boolean')
    ,
    check('canEditGroupTicket')
        .isBoolean().withMessage('canEditGroupTicket doit être un boolean')
    ,
    check('canAssignTicket')
        .isBoolean().withMessage('canAssignTicket doit être un boolean')
    ,
    check('canManageTicket')
        .isBoolean().withMessage('canManageTicket doit être un boolean')
        .custom((value, {req}) => {
            if(value !== true){
                throw Error('canManageTicket ne peut être faux')
            }
            return true
        })
    ,
    check('canResolveTicket')
        .isBoolean().withMessage('canResolveTicket doit être un boolean')
    ,
    check('GroupId')
        .isNumeric().withMessage('GroupId doit être un numérique')
        .custom(async(value, {req}) => {
            const account = await Account.findOne({where: {id: req.params.accountId}})

            if(!account){
                throw Error('Forbidden')
            }

            const group = await account.getGroups({where:{id: value}})

            if(!group.length){
                throw Error('Forbidden')
            }

            const role = await account.getRoles({where:{groupId: value}})

            if(!role.length){
                throw Error('Forbidden')
            }

            if(!role[0].canCreateRole){
                throw Error('Forbidden')
            }

            return true

        })
    ,
    RoleController.create
)
roleRouter.put('/update',
    check('name')
    .notEmpty()
        .withMessage('Le nom de la demande ne peut être vide.')
    .isAlpha('fr-FR')
        .withMessage('Le nom doit contenir seulement des lettres.')
    .isLength({min:3, max:15}) 
        .withMessage('Le nom doit contenir entre 3 et 15 caractères.')   
    ,
    check('level')
    .notEmpty()
        .withMessage('Le niveau de permission ne doit pas être vide.')
    .isNumeric()
        .withMessage('Le niveau de permission doit être un numérique')
    .custom((value) => {
        if(value < 0 && value > 3){
            throw new Error('Le niveau doit être compris entre 1 et 3.')
        }
    })
    ,
    RoleController.create
)
roleRouter.delete('/delete', RoleController.delete)







export default roleRouter