import { Router } from "express"
import { check } from "express-validator"
import RoleController from "../controller/role.controller"


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