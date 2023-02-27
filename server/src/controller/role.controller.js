import {validationResult} from "express-validator";

const RoleController = {
    index: (req, res) => {

    },
    create:(req, res) => {
        const {errors} = validationResult(req)
        console.log(errors)
    },
    edit: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}

export default RoleController