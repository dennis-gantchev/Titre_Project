import {Router} from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import GroupController from "../controller/group.controller";
import model from "../models"
import { check } from "express-validator"
import groupController from "../controller/group.controller";


const { Group, Account, Role } = model
const groupRouter = Router()
const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) //Appending extension
    }
})
const uploader = multer({ storage: storage })

groupRouter.post('/create', AuthMiddleware.verifToken,uploader.single('image'),
    check("name")
        .notEmpty()
            .withMessage("Le nom ne doit pas être vide.")
        .custom( async (value, {req}) => {
            const groupExist = await Group.findOne({where: {name: value}})
            console.log(groupExist)
            if(groupExist !== null){
                throw Error("Ce nom est déjà utilisé.")
            }else{
                return true
            }
        }),
    check('image')
        .custom( async (value, {req}) => {
            const file = req.file

            if(file !== undefined){
                if(!file.mimetype.includes("image")){
                    throw Error("Le fichier doit être une image")
                }
            }
            return true
        }),
    check('description'),
    check('roles')
        .notEmpty()
            .withMessage("Les rôles de doit pas être vide.")
        .custom( async (value, {req}) => {
            const roles = JSON.parse(value)
            const haveResponsables = []
            for( let role of roles){
                 const isResponsable =
                     role.name === "Responsable" &&
                     role.canInviteMember &&
                     role.canBanMember &&
                     role.canAssignRole &&
                     role.canCreateRole &&
                     role.canEditGroupTicket &&
                     role.canDeleteGroupTicket &&
                     role.canAssignTicket &&
                     role.canManageTicket &&
                     role.canResolveTicket
                haveResponsables.push(isResponsable)
            }

            if(!haveResponsables.includes(true)){
                throw Error('Le role Responsable est obligatoire.')
            }

            return true

        })
    , GroupController.create)

groupRouter.get('/index/:page', AuthMiddleware.verifToken, GroupController.index)

groupRouter.get('/show/:id', AuthMiddleware.verifToken,
    check('id')
        .isNumeric().withMessage("L'id doit être un nombre")
        .custom(async  (value, {req}) => {
            console.log("test")
            const account = await Account.findOne({where: {id: req.params.accountId}})
            const group = await account.getGroups({where: {id: req.params.id}})
            console.log(group)
            if(!group.length){
                throw Error("Forbidden")
            }else{
                return true
            }
        })
    ,
    GroupController.show

)

groupRouter.post('/addMember', AuthMiddleware.verifToken,
        check('id')
            .isNumeric().withMessage("L'id doit être un nombre.")
            .custom( async  (value, {req}) => {
                const account = await Account.findOne({where: { id: req.params.accountId}})
                const group = await account.getGroups({where: { id: req.body.id}})

                if(!group.length){
                    throw Error("Forbidden")
                }

                const roles = await account.getRoles({where: {groupId: group[0].getDataValue("id")}})
                if(!roles[0].canInviteMember){
                    throw Error("Forbidden")
                }

                return true


            }),
        check('email')
            .notEmpty().withMessage("L'email ne doit pas être vide.")
            .isEmail().withMessage("Le format de l'email est incorrect")
            .custom(async(value, {req}) => {
                const account = await Account.findOne({where: { email: value}})
                if(!account){
                    throw Error("Cet utilisateur n'existe pas")
                }
                return true
            }),
        check('roleId')
            .notEmpty().withMessage("Le roleId ne doit pas être vide")
            .isNumeric().withMessage("Le roleId doit être un nombre")
            .custom(async (value, {req}) => {
                const role = await Role.findOne({where: { id: req.body.id}})

                if(!role){
                    throw Error("Le role n'existe pas")
                }
                return true
            }),
    GroupController.addMember
    )

export default groupRouter