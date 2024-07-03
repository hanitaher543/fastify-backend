const User = require('../models/user')
const bcrypt = require ('bcrypt')

const Router = (fastify, options, done) => {


    fastify.post('/register', async (req, res) => {
        // 1 : Read data from request
        const { fullname, email, password, telephone } = req.body;

        try{
        // crypt my password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create instance from my model
        const newUser = await User.create({
            fullname,
            email,
            password : hashedPassword,
            telephone,
         });
         res.status(200).send({ message: 'User registered successfully', user: newUser});

        } catch (error){
         res.status(500).send({error: 'User registration failed', details: error});
        }
    });



//Running Router
  done();
};






module.exports = Router;




