const User = require('../models/user')
const bcrypt = require ('bcrypt')

const Router = (fastify, options, done) => {

    //API : RESGISTER
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



    //API : LOGIN
    fastify.post('/login', async (req, res) => {

        //1: Read data from body request
        const {email, password} = req.body;

        try{

            // 2: Get user by email from DB 
            const user = await User.findOne({where : { email }});

            // 3: verifiy if user exist or no using mail
            if(!user){
                return  res.status(404).send({ error: 'User not found !!' });
            }

            // 4 : verify if user exist or no using password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.code(401).send({ error: 'Invalid password' });
            }

            res.status(200).send({ message: 'Login successful !!'});

            

        } catch(error){
            res.status(500).send({error: 'Login failed', details: error});

        }

    });



//Running Router
  done();
};






module.exports = Router;




