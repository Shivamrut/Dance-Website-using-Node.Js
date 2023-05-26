const mongoose = require('mongoose');
main()
.then(res => {
    console.log('userDb is connected');
    // console.log(res);
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled


}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

const user = mongoose.model('danceUser', UserSchema);

module.exports = user;