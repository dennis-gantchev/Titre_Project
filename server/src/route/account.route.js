import { Router } from "express"
import { check } from "express-validator"
import AccountController from "../controller/account.controller"
import model from "../models"
import AuthMiddleware from "../middleware/auth.middleware";
import bcrypt from "bcrypt";
import {isEmail} from "validator";


const { Account } = model
const accountRouter = Router()
accountRouter.get('/edit',AuthMiddleware.verifToken, AccountController.edit, )
accountRouter.get('/profile',AuthMiddleware.verifToken ,AccountController.profile)
accountRouter.get('/show/:id', AccountController.show)
accountRouter.post('/create',
    check('firstName')
        .notEmpty()
            .withMessage('Le prénom ne doit pas être vide.')
        .trim().escape()
        .isAlpha("fr-FR")
            .withMessage('Le prénom doit contenir seulement des lettres.')
        .isLength({min: 3, max:15})
            .withMessage('Le prénom doit contenir plus de 3 caractères et 15 caractères maximum.')
    ,
    check('lastName')
        .notEmpty()
            .withMessage('Le nom ne doit pas être vide.')
        .trim().escape()
        .isAlpha("fr-FR")
            .withMessage('Le nom doit contenir seulement des lettres.')
        .isLength({min: 3, max:15})
            .withMessage('Le nom doit contenir plus de 3 caractères et 15 caractères maximum.')
    ,
    check('email')
        .notEmpty()
            .withMessage('Le mail ne doit pas être vide.')
        .normalizeEmail()
        .isEmail()
            .withMessage('Le format du mail est incorrecte.')
        .custom( async (value, {req}) => {
            console.log(value)
            const accountExist = await Account.findOne({where: {email: value}});
            console.log(accountExist)
            if(accountExist !== null){

                throw Error("L'email est déjà utilisé")
            }

            return true
        })
    ,
    check('password')
        .notEmpty()
            .withMessage('Le mot de passe ne doit pas être vide.')
        .isLength({min:8})
                .withMessage('Le mot de passe doit contenir au minimum 8 caractères ')
    ,
    check('passwordConfirm')
        .custom((value, { req }) => {
            
            if(value !== req.body.password){
                throw Error("Le mot de passe de confirmation ne correspond pas")
                
            }
            return true
        })
    ,
    AccountController.create
)
accountRouter.put('/update',
    AuthMiddleware.verifToken,
    check('firstName')
        .notEmpty()
            .withMessage('Le prénom ne doit pas être vide.')
        .isAlpha("fr-FR")
            .withMessage('Le prénom doit contenir seulement des lettres.')
        .isLength({min: 3, max:15})
            .withMessage('Le prénom doit contenir plus de 3 caractères et 15 caractères maximum.')
    ,
    check('lastName')
        .notEmpty()
            .withMessage('Le nom ne doit pas être vide.')
        .isAlpha("fr-FR")
            .withMessage('Le nom doit contenir seulement des lettres.')
        .isLength({min: 3, max:15})
            .withMessage('Le nom doit contenir plus de 3 caractères et 15 caractères maximum.')
    ,
    check('email')
        .notEmpty()
            .withMessage('Le mail ne doit pas être vide.')
        .normalizeEmail()
        .isEmail()
            .withMessage('Le format du mail est incorrecte.')
        .custom( async (value, {req}) => {
            const accountExist = await Account.findOne({where: {email: value}});

            if(accountExist !== null){
                if(accountExist.id !== req.params.accountId){
                    throw Error("L'email est déjà utiilisé")
                }else{
                    return true
                }

            }else{
                return true
            }
        }),
    AccountController.update
)

accountRouter.delete('/delete',AuthMiddleware.verifToken,AccountController.delete)












export default accountRouter