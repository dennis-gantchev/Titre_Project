import {Router} from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import GroupController from "../controller/group.controller";
import model from "../models"
import { check } from "express-validator"
import groupController from "../controller/group.controller";


const { Group, Account } = model
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
        .notEmpty()
            .withMessage("L'id ne doit pas être vide")
        .custom(async  (value, {req}) => {
            console.log("test")
            const account = await Account.findOne({where: {id: req.params.accountId}})
            const group = await account.getGroups({where: {id: req.params.id}})
            console.log(group)
            if(!group.length){
                throw Error({
                    message: 'Not an email',
                    errorCode: 1,
                })
            }else{
                return true
            }
        }),
    GroupController.show

)

export default groupRouter