import validator from "validator"


const RequestService = {
    validate: (request) => {
        console.log(request)
        let haveError = false
        const errors = {
            title: [],
            content: []
        }


        if(validator.isEmpty(request.title)){
            haveError = true
            errors.title.push('Le nom de la demande ne peut être vide.')
        }else{
            if(!validator.isAlphanumeric(request.title)){
                haveError = true
                errors.title.push('Le nom doit seulement contenir des lettres et chiffres.')
            }
    
            if(!validator.isLength(request.title, {min:3, max:50})){
                haveError = true
                errors.title.push('Le nom doit contenir entre 3 et 50 caractères')
            }
        }

        

        if(validator.isEmpty(request.content)){
            haveError = true
            errors.content.push('Le contenu ne doit pas être vide.')
        }else{
            if(!validator.isAlphanumeric(request.content)){
                haveError = true
                errors.content.push('Le contenu doit seulement contenir des lettres et chiffres.')
            }
    
            if(!validator.isLength(request.content, {min:3, max:255})){
                haveError = true
                errors.content.push('Le contenu doit contenir entre 3 et 255 carcactères.')
            }
        }

        

        if(haveError){
            return errors
        }else{
            return true
        }
    }
}

export default RequestService