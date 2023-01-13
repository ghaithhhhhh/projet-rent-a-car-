const { json } = require('body-parser');
const { query } = require('express');
//const { get } = require('../routes/auth');
const conn = require('../util/database')

module.exports =  class Users {
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;

    }

  
    

   static save(user){
      
    conn.query('INSERT INTO users (nom,prenom,email,password,role) VALUES(?,?,?,?,?)',[user.prenom,user.nom,user.email,user.password,user.role],(err,result)=>{
        if(!err){
            console.log('okay')
        }
        else{
         console.log('err')
        }
    })
   // conn.end();
  

   }




   static end(){
    conn.end();
   }


}