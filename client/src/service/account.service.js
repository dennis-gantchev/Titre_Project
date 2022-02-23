import validator from "validator"

const AccountService = {
    validate: (firstName, lastName, email, password, passwordConfirm) =>{
        let haveError = false
        const error = {
            firstName:[],
            lastName: [],
            email: [],
            password: [],
            passwordConfirm:[]
        }
        if(validator.isEmpty(firstName)){
            haveError = true
            error.firstName.push('Le prénom ne doit pas être vide.')
        }
        if(!validator.isAlpha(firstName, "fr-FR")){
            haveError = true
            error.firstName.push('Le prénom doit contenir seulement des lettres.')
        }
        if(!validator.isLength(firstName,{min:3})){
            haveError = true
            error.firstName.push('Le prénom doit contenir plus de 3 caractères.')
        }

        if(validator.isEmpty(lastName)){
            haveError = true
            error.lastName.push('Le nom doit pas être vide.')
        }
        if(!validator.isAlpha(lastName, "fr-FR")){
            haveError = true
            error.lastName.push('Le nom doit contenir seulement des lettre.')
        }
        if(!validator.isLength(lastName, {min:3})){
            haveError = true
            error.lastName.push('Le nom doit contenir plus de 3 caractères.')
        }

        if(validator.isEmpty(email)){
            haveError = true
            error.email.push("Le mail ne doit pas être vide.")
        }
        if(!validator.isEmail(email)){
            haveError = true
            error.email.push("Le format du mail est incorrecte.")
        }

        if(validator.isEmpty(password)){
            haveError = true
            error.password.push("Le mot de passe ne doit pas être vide.")
        }

        if(!validator.isStrongPassword(password, {minLength: 8, minLowercase:1, minUppercase: 1, minNumbers:1})){
            haveError = true
            error.password.push('Le mot de passe doit contenir au minimum 8 caractère (une majuscule, une minuscule, un chiffre)')
        }

        if(password != passwordConfirm){
            haveError = true
            error.passwordConfirm.push("Le mot de passe de confirmation ne correspond pas")
        }

        if(haveError){
            return error
        }else{
            return true
        }
    }
}