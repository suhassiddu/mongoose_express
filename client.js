const axios = require('axios')

const Api = axios.create({
    baseURL: 'http://localhost:3000'
})

async function findAll(){
    const {data} = await Api.get('/notes')
    console.log({findAll: data})
}

async function create(){
    try{
        const {data} = await Api.post('/notes', {
            title: 'second',
            content: 'second content'
        })
        console.log({create: data})
    } catch(err){
        console.log({err})
    }
}

async function findOne({id}){
    try{
        const {data} = await Api.get(`/notes/${id}`)
        console.log({findOne: data})
    } catch(err){
        console.log({err})
    }
}

async function update({id, content}){
    try{
        const {data} = await Api.put(`/notes/${id}`, {content})
        console.log({update: data})
    } catch(err){
        console.log({err})
    }
}

async function remove({id}){
    try{
        const {data} = await Api.delete(`/notes/${id}`)
        console.log({delete: data})
    } catch(err){
        console.log({err})
    }
}

async function main(){
    const id = '5e0484802932aa218e1c681c'
    const content = 'updated content'
    // await create()
    await findOne({id})
    await update({id, content})
    await findAll()
    await remove({id})
}

main()