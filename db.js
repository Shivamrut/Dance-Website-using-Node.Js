const mongoose = require('mongoose');
let instance = null;
main()
.then(res => {
    console.log('Db is connected');
    // console.log(res);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled


}

const contact = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    address:String,
    concern: String
});

const Contact = mongoose.model('Contact',contact);
 
// const item = new Contact({
//     name:'red',
//     phone:57,
//     email:'red.com',
//     address:'underworld',
//     concern: 'hacker'
// });

// item.save();

class Db{
    static getSingleInstance(){
        return instance  ? instance : new Db();  
    }

    async createContact(data)
    {
        
        try{
            const response = await new Promise((resolve,reject)=>{
                const item = new Contact(data);
                item.save()
                .then(data=>{
                    resolve({
                        success: true, data: data
                    });
                })
                .catch(err=>{
                    reject(new Error(err.message));
                })
            })

            return response;
        }
        catch(err)
        {
            console.log('Error in createContact db.js');
            // console.log(err);
        }
    }


}

module.exports = Db;