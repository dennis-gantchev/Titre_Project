import validator from "validator"


const RoleService = {
    validate: (name, level) => {
        let haveError = false
        const errors = {
            name: [],
            level: []
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

        if(validator.isEmpty(level)){
            haveError = true
            errors.level.push('Le niveau de permission ne doit pas être vide.')
        }

        if(!validator.isNumeric(level)){
            haveError = true
            errors.level.push('Le niveau de permission doit être un numérique')
        }

        if(!(level > 0 && level > 3)){
            haveError = true
            errors.level.push('Le niveau doit être compris entre 1 et 3.')
        }

        if(haveError){
            return errors
        }else{
            return true
        }

    }
}