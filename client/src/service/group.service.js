import validator from "validator"
const GroupService = {
    validate: (group) => {
        const { name, image, description} = group
        console.log(image)
        let haveError = false
        const errors = {
            name: [],
            image: [],
            description: []
        }

        if(validator.isEmpty(name)){
            haveError = true
            errors.name.push('Le nom de la demande ne peut être vide.')
        }

        if(!validator.isLength(name, {min:3, max:15})){
            haveError = true
            errors.name.push('Le nom doit contenir entre 3 et 15 caractères.')
        }

        if(image){
            if(!validator.isMimeType(image.name) && !image.type.includes('image')){
                haveError = true
                errors.image.push('Le format du fichier est incorrect.')
            }
        }


        if(haveError){
            return errors
        }else{
            return null
        }

    }
}

export default GroupService