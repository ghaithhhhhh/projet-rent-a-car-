const {validationResult} = require('express-validator')
const cryptr = require('cryptr')
const User = require('../models/user')
const conn = require('../util/database')

exports.signup = async (req,res,next)=> {


var sql = "SELECT * FROM users WHERE email = ?";
      conn.query(sql, [req.body.email] ,async function  (err, result) {
           if (err) {console.log(err)};
           console.log(result.length)
           if(result.length > 0){
            console.log('ok')
            res.send({status:"eroor",error:"email already has been registres"})
           }else{

            const nom = req.body.nom  
            const prenom = req.body.prenom 
            const email = req.body.email
            const password = req.body.password 
            
            try{
          //  const hashedPass = await cryptr.(password , 12);
          const hashedPass = await cryptr.encrypt(password)
            const userDetail = {
                nom : nom,
                prenom :prenom,
                email : email ,
                password : req.body.password,
                role: 'user',
            }
            
            User.save(userDetail)
            
             res.status(201).json({ message : 'user registred'})
            }catch(err){
                if(err.statusCode == 500){
                   err.statusCode = 500
                }
                 next(err)
            }



           }



           })















}


