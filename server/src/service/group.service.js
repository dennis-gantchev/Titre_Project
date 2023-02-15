const GroupService = {
    create : (req, account) => {
        const { name, description, image, roles } = req.body
        const file = req.file
        console.log('service: ',description.trim())
        return {
            name: JSON.parse(name),
            description: JSON.parse(description.trim()) !== "" ? JSON.parse(description.trim()) : null,
            image: file ? file.filename : null,
            Roles: JSON.parse(roles),
            Account:account
        }
    }
}


export default GroupService