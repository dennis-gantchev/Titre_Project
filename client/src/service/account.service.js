import validator from "validator"

const AccountService = {
    validate: (account) =>{
        let haveError = false
        const errors = {
            firstName:[],
            lastName: [],
            email: [],
            password: [],
            passwordConfirm:[]
        }
        if(validator.isEmpty(account.firstName)){
            haveError = true
            errors.firstName.push('Le prénom ne doit pas être vide.')
        }else{
            if(!validator.isAlpha(account.firstName, "fr-FR")){
                haveError = true
                errors.firstName.push('Le prénom doit contenir seulement des lettres.')
            }
            if(!validator.isLength(account.firstName,{min:3, max:15})){
                haveError = true
                errors.firstName.push('Le prénom doit contenir plus de 3 caractères et 15 caractères maximum.')
            }
        }
        

        if(validator.isEmpty(account.lastName)){
            haveError = true
            errors.lastName.push('Le nom ne doit pas être vide.')
        }else{
            if(!validator.isAlpha(account.lastName, "fr-FR")){
                haveError = true
                errors.lastName.push('Le nom doit contenir seulement des lettres.')
            }
            if(!validator.isLength(account.lastName, {min:3, max:15})){
                haveError = true
                errors.lastName.push('Le nom doit contenir plus de 3 caractères et 15 caractères maximum.')
            }
        }
        

        if(validator.isEmpty(account.email)){
            haveError = true
            errors.email.push("Le mail ne doit pas être vide.")
        }else{
            if(!validator.isEmail(account.email)){
                haveError = true
                errors.email.push("Le format du mail est incorrecte.")
            }
        }
        
        if(validator.isEmpty(account.password)){
            haveError = true
            errors.password.push("Le mot de passe ne doit pas être vide.")
        }else{
            if(!validator.isLength(account.password, {min: 8})){
                haveError = true
                errors.password.push('Le mot de passe doit contenir au minimum 8 caractères')
            }
        }

        
        if(validator.isEmpty(account.passwordConfirm)){
            haveError = true
            errors.passwordConfirm.push("Le mot de passe de confirmation ne doit pas être vide.")
        }else{
            if(account.password !== account.passwordConfirm){
                haveError = true
                errors.passwordConfirm.push("Le mot de passe de confirmation ne correspond pas")
            }
        }
        

        if(haveError){
            return errors
        }else{
            return false
        }
    },
    editValidate: (account) =>{
        let haveError = false
        const errors = {
            firstName:[],
            lastName: [],
            email: []
        }
        if(validator.isEmpty(account.firstName)){
            haveError = true
            errors.firstName.push('Le prénom ne doit pas être vide.')
        }else{
            if(!validator.isAlpha(account.firstName, "fr-FR")){
                haveError = true
                errors.firstName.push('Le prénom doit contenir seulement des lettres.')
            }
            if(!validator.isLength(account.firstName,{min:3, max:15})){
                haveError = true
                errors.firstName.push('Le prénom doit contenir plus de 3 caractères et 15 caractères maximum.')
            }
        }


        if(validator.isEmpty(account.lastName)){
            haveError = true
            errors.lastName.push('Le nom ne doit pas être vide.')
        }else{
            if(!validator.isAlpha(account.lastName, "fr-FR")){
                haveError = true
                errors.lastName.push('Le nom doit contenir seulement des lettres.')
            }
            if(!validator.isLength(account.lastName, {min:3, max:15})){
                haveError = true
                errors.lastName.push('Le nom doit contenir plus de 3 caractères et 15 caractères maximum.')
            }
        }


        if(validator.isEmpty(account.email)){
            haveError = true
            errors.email.push("Le mail ne doit pas être vide.")
        }else{
            if(!validator.isEmail(account.email)){
                haveError = true
                errors.email.push("Le format du mail est incorrecte.")
            }
        }


        if(haveError){
            return errors
        }else{
            return false
        }
    }
}

export default AccountService