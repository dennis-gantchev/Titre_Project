import { Router } from "express";
import { check } from "express-validator"
import AccountController from "../controller/account.controller";
import RequestController from "../controller/request.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import model from "../models";

const { Role, Request } = model
const requestRouter = Router()


requestRouter.get('/agent/progress/:page', AuthMiddleware.verifAgent, RequestController.indexAgentProgress)
requestRouter.get('/agent/completed/:page', AuthMiddleware.verifAgent, RequestController.indexAgentCompleted)
requestRouter.get('/agent/show/:id', AuthMiddleware.verifAgent,
    check('id')
        .notEmpty()
        .withMessage("Id vide")
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: { id: value }})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,RequestController.show)
requestRouter.get('/agent/edit/:id', AuthMiddleware.verifAgent,
    check('id')
        .notEmpty()
        .withMessage("Id vide")
        .custom(async (value, {req}) => {

            const request = await Request.findOne({where: {id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,RequestController.edit)
requestRouter.put('/agent/update',
    AuthMiddleware.verifAgent,
    check('id')
        .notEmpty()
        .withMessage('Id vide')
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        }),
    check('name')
        .notEmpty()
        .withMessage('Le titre de la demande ne doit pas être vide.')
        .isLength({min:3, max:50})
        .withMessage('Le titre doit contenir entre 3 et 50 caractères')
    ,
    check('roleId')
        .notEmpty()
        .withMessage('Le role ne doit pas être vide.')
        .custom( async (value, {req}) => {
            const roles = await Role.findAll();

            const roleIds = roles.map((role) => role.id)

            if(roleIds.includes(value)){
                return true
            }else{
                throw Error('Role inexistant')
            }

        })
    ,
    check('content')
        .notEmpty()
        .withMessage('Le contenu ne doit pas être vide.')
        .isLength({min:3, max:255})
        .withMessage('Le contenu doit contenir entre 3 et 255 caractères.')
    ,
    RequestController.update
)
requestRouter.delete('/agent/delete/:id',AuthMiddleware.verifAgent,
    check('id')
        .notEmpty()
        .withMessage("Id vide")
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,RequestController.delete)
requestRouter.get("/agent/resolve/:id", AuthMiddleware.verifAgent,
    check('id')
        .notEmpty()
        .withMessage("Id vide")
        .custom(async (value, {req}) => {
            console.log(value)
            const request = await Request.findOne({where: {id: value, resolved: false}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        }),
    RequestController.resolve

)
requestRouter.get('/progress/:page',AuthMiddleware.verifToken, RequestController.indexProgress)
requestRouter.get('/completed/:page',AuthMiddleware.verifToken, RequestController.indexCompleted)
requestRouter.get('/show/:id', AuthMiddleware.verifToken,
    check('id')
        .notEmpty()
            .withMessage("Id vide")
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {clientId: req.params.accountId, id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,
    RequestController.show)
requestRouter.get('/edit/:id', AuthMiddleware.verifToken,
    check('id')
        .notEmpty()
            .withMessage("Id vide")
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {clientId: req.params.accountId, id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,RequestController.edit)
requestRouter.get('/new', AuthMiddleware.verifToken, RequestController.new)
requestRouter.post('/create',
    AuthMiddleware.verifToken,

    check('name')
        .notEmpty()
            .withMessage('Le titre de la demande ne doit pas être vide.')
        .isLength({min:3, max:50})
            .withMessage('Le titre doit contenir entre 3 et 50 caractères')
    ,
    check('roleId')
        .notEmpty()
            .withMessage('Le role ne doit pas être vide.')
        .custom( async (value, {req}) => {
            const roles = await Role.findAll();

            const roleIds = roles.map((role) => role.id)

            if(roleIds.includes(value)){
                return true
            }else{
                throw Error('Role inexistant')
            }

        })
    ,
    check('content')
        .notEmpty()
            .withMessage('Le contenu ne doit pas être vide.')
        .isLength({min:3, max:255})
            .withMessage('Le contenu doit contenir entre 3 et 255 caractères.')
    ,
    RequestController.create
)

requestRouter.put('/update',
    AuthMiddleware.verifToken,
    check('id')
        .notEmpty()
        .withMessage('Id vide')
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {clientId: req.params.accountId, id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        }),
    check('name')
        .notEmpty()
            .withMessage('Le titre de la demande ne doit pas être vide.')
        .isLength({min:3, max:50})
            .withMessage('Le titre doit contenir entre 3 et 50 caractères')
    ,
    check('roleId')
        .notEmpty()
            .withMessage('Le role ne doit pas être vide.')
        .custom( async (value, {req}) => {
            const roles = await Role.findAll();

            const roleIds = roles.map((role) => role.id)

            if(roleIds.includes(value)){
                return true
            }else{
                throw Error('Role inexistant')
            }

        })
    ,
    check('content')
        .notEmpty()
            .withMessage('Le contenu ne doit pas être vide.')
        .isLength({min:3, max:255})
            .withMessage('Le contenu doit contenir entre 3 et 255 caractères.')
    ,
    RequestController.update
)

requestRouter.delete('/delete/:id',AuthMiddleware.verifToken,
    check('id')
        .notEmpty()
        .withMessage("Id vide")
        .custom(async (value, {req}) => {
            const request = await Request.findOne({where: {clientId: req.params.accountId, id: value}})

            if(request === null){
                throw Error('Demande inexistant')
            }else{
                return true
            }
        })
    ,RequestController.delete)








export default requestRouter