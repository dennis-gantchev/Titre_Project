import validator from "validator"


const RoleService = {
    validate: (role) => {
        const {name, canManageTicket} = role
        let haveError = false
        const errors = {
            name: [],
            permission: []
        }
        
        
        if(validator.isEmpty(name)){
            haveError = true
            errors.name.push('Le nom de la demande ne peut être vide.')
        }

        if(!validator.isAlpha(name)){
            haveError = true
            errors.name.push('Le nom doit contenir seulement des lettres.')
        }

        if(!validator.isLength(name, {min:3, max:15})){
            haveError = true
            errors.name.push('Le nom doit contenir entre 3 et 15 caractères.')
        }

        if(canManageTicket !== true){
            haveError = true
            errors.permission.push('La permission gérée ses ticket est obligatoire')
        }

        if(haveError){
            return errors
        }else{
            return null
        }

    }
}

export default RoleService