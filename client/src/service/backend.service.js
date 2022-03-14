import Auth from "../utils/Auth"
const AuthService = new Auth()
const BackendService = {
    get:async (path, data) => {
        const url = new URL(`http://localhost:3003/${path}/${data}`)
        const header = new Headers()
        if(AuthService.loggedIn()){
            header.append('Authorization','Bearer '+ AuthService.getToken())
        }
        const myInit = {
            method: 'GET',
            headers: header,
            mode: 'cors'
        }

        let response = await fetch(url,myInit)
        

        response = await response.json()
        return response

    },
    post: async (path, data) => {
        const url = new URL(`http://localhost:3003/${path}`)
        const header = new Headers({
            'Content-Type': 'application/json'
        })
        if(AuthService.loggedIn()){
            header.append('Authorization','Bearer '+ AuthService.getToken())
        }
        const myInit = {
            method: 'POST',
            headers: header,
            mode: "cors",
            body:JSON.stringify(data)
        }

        let response = await fetch(url,myInit)


        response = await response.json()
        return response


    },
    postD: async (path, data) => {
        const url = new URL(`http://localhost:3003/${path}`)
        const header = new Headers({
            
        })
        console.log('post')
        if(AuthService.loggedIn()){
            header.append('Authorization','Bearer '+ AuthService.getToken())
        }
        const myInit = {
            method: 'POST',
            headers: header,
            mode: "cors",
            body: data
        }

        let response = await fetch(url,myInit)
        console.log(response)
        if(response.ok){
            response = await response.json()
            return response
        }
        return false
    },
    put: async (path, data) => {
        const url = new URL(`http://localhost:3003/${path}`)
        const header = new Headers({
            'Content-Type': 'application/json'
        })
        if(AuthService.loggedIn()){
            header.append('Authorization','Bearer '+ AuthService.getToken())
        }
        const myInit = {
            method: 'PUT',
            headers: header,
            mode: "cors",
            body:JSON.stringify(data)
        }

        let response = await fetch(url,myInit)
        

        response = await response.json()
        return response

    },
    delete:async (path, data) => {
        const url = new URL(`http://localhost:3003/${path}/${data}`)
        const header = new Headers()
        if(AuthService.loggedIn()){
            header.append('Authorization','Bearer '+ AuthService.getToken())
        }
        const myInit = {
            method: 'DELETE',
            headers: header,
            mode: 'cors'
        }

        let response = await fetch(url,myInit)



        response = await response.json()
        return response


    },   
}


export default BackendService