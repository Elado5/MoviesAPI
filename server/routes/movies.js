// movies route

//load modules

const express = require(`express`);
const sql = require(`mssql`);
const config = require(`../utils/config`)

//create router

let moviesRoute = express.Router()

moviesRoute.get(`/all`, async (req, res) => {

    //error handling
    sql.on(`error`, (error) => res.send(error))

    //connect to db
    let db = await sql.connect(config.db)

    //run a query
    let query = db.query(`select * from movies`)

    //get the data
    let data = await query.recordset

    //close the server
    await db.close() //ממתינים לסגירה של מסד הנתונים ולאחר שזה קורה שולחים את הדאטה

    //send the data to the client via
    res.send(data)
})

moviesRoute.get(`/:id`, async (req, res) => {

    //error handling
    sql.on(`error`, (error) => res.send(error))

//get the parameters from the request, in the () of the header
    let params = req.params

    //connect to db
    let db = await sql.connect(config.db)

    //run a query
    let query = db.request()
        .input(`id`, sql.Int, params.id)
        .execute(`elad_select_movie_by_id`)

    //get the data
    let data = await query.recordset

    //close the server
    await db.close() //ממתינים לסגירה של מסד הנתונים ולאחר שזה קורה שולחים את הדאטה

    //send the data to the client via
    res.send(data[0])
})



moviesRoute.post(`/add`, async (req, res) => {

    //error handling
    sql.on(`error`, (error) => res.send(error))

    //get request body
    let body = req.body

    //connect to db
    let db = await sql.connect(config.db)

    //run a query
    let query = db.request()
        .input(`title`, sql.Nvarchar(250), body.title)
        .input(`genre`, sql.Nvarchar(100), body.genre)
        .input(`director`, sql.Nvarchar(250), body.director)
        .input(`publishedDate`, sql.DateTime, body.publishedDate)
        .input(`poster`, sql.Text, body.poster)
        .output(`id`, sql.Int)
        .execute(`elad_add_movie`)

    //get the data
    let data = await query

    //close the server
    await db.close() //ממתינים לסגירה של מסד הנתונים ולאחר שזה קורה שולחים את הדאטה

    //send the data to the client via
    res.send(data)
})

moviesRoute.delete(`/delete/:id`, async (req, res) =>{

    sql.on(`error`, (error) => res.send(error))

    let params = req.params

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`id`, sql.Int, params.id)
        .execute(`elad_delete_movie`)
    let data = await query

    await db.close()

    res.send(data)

})


moviesRoute.put(`/update/:id`, async (req, res) => {

    let params = req.params //אחסון פרמטרים
    let body = req.body //הנתונים שאנחנו רוצים לעדכן
    
    sql.on(`error`, (error) => res.send(error))
    
    let db = await sql.connect(config.db)

    let query = await db.request()
    .input(`id`, sql.Int, params.id)
    .input(`title`, sql.Nvarchar(250), body.title)
    .input(`genre`, sql.Nvarchar(100), body.genre)
    .input(`director`, sql.Nvarchar(250), body.director)
    .input(`publishedDate`, sql.DateTime, body.publishedDate)
    .input(`poster`, sql.Text, body.poster)
    .execute(`elad_update_movie`)

    let data = await query

    await db.close()

    res.send(data) //שלח את הפרמטרים לתוך הבאדי
    
})

//export the router so server.js can use it
module.exports = moviesRoute