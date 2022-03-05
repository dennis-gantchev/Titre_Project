import validator from "validator"

const AuthService = {
    validate: (credential) => {
        let haveError = false
        const errors = {
            email: [],
            password: [],
        }

        if(validator.isEmpty(credential.email)){
            haveError = true
            errors.email.push("Le mail ne doit pas être vide.")
        }else{
            if(!validator.isEmail(credential.email)){
                haveError = true
                errors.email.push("Le format du mail est incorrecte.")
            }
        }

        if(validator.isEmpty(credential.password)){
            haveError = true
            errors.password.push('Le mot de passe ne doit pas être vide.')
        }
        
        if(haveError){
            return errors
        }else{
            return false
        }

    }
}

export default AuthService