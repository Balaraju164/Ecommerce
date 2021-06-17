const bcrypt = require('bcryptjs')
const users =[
    {
        name:'admin Bala',
        mail:'admin@gmail.com',
        password:bcrypt.hashSync('1111',10),
        isAdmin:'true'
    },
    {
        name:'Bala',
        mail:'Bala@gmail.com',
        password:bcrypt.hashSync('121212',10),
    },
    {
        name:'Raju',
        mail:'Raju@gmail.com',
        password:bcrypt.hashSync('212121',10),
    },
]

module.exports=users