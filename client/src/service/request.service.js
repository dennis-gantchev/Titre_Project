import validator from "validator"


const RequestService = {
    validate: (request, roles) => {
        console.log(request)
        let haveError = false
        const errors = {
            name: [],
            content: [],
            roleId: []
        }


        if(validator.isEmpty(request.name)){
            haveError = true
            errors.name.push('Le titre de la demande ne doit pas être vide.')
        }else{

            if(!validator.isLength(request.name, {min:3, max:50})){
                haveError = true
                errors.name.push('Le titre doit contenir entre 3 et 50 caractères')
            }
        }

        if(validator.isEmpty(request.roleId.toString())){
            haveError = true
            errors.roleId.push('Le rôle de la demande ne doit pas être vide.')
        }else{
            if(!validator.isNumeric(request.roleId.toString())){
                haveError = true
                errors.roleId.push('Le rôle doit être un numérique.')
            }
            const ids = roles.map((role) => role.id)
            if(!ids.includes(request.roleId)){
                haveError = true
                errors.roleId.push('Rôle est inexistant.')
            }
        }

        if(validator.isEmpty(request.content)){
            haveError = true
            errors.content.push('Le contenu ne doit pas être vide.')
        }else{

            if(!validator.isLength(request.content, {min:3, max:255})){
                haveError = true
                errors.content.push('Le contenu doit contenir entre 3 et 255 caractères.')
            }
        }

        

        if(haveError){
            return errors
        }else{
            return false
        }
    }
}

export default RequestService