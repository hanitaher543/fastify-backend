const User = require('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken');
const Token = require ('../models/Token');

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
                return  res.status(404).send({ error: 'email or password invalid !!' });
            }

            // 4 : verify if user exist or no using password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.code(401).send({ error: 'Invalid password !!' });
            }

           // res.status(200).send({ message: 'Login successful !!'});

            // 5 : Create TOKEN : AFTER verify my login and password is corrected 
           /* payload = {
                id : user.id,
                email : user.email,
                //password : user.password
            };
            token = jwt.sign(payload, '123456789')
            res.status(200).send({mytoken : token}); */

            // Access Token & Refresh Token
            const accessToken   =   jwt.sign({ id: user.id }, 'mkljbhghvbkjcghjklmlkjhghj',  { expiresIn: '15m' });
            const refreshToken  =   jwt.sign({ id: user.id }, 'kjhvcxcfghjkjhgghjkllkjhgvc', { expiresIn: '7d' });

            await Token.create({accessToken : accessToken , refreshToken : refreshToken,  userId : user.id})

            res.status(200).send({message : 'Login successful', accessToken, refreshToken});



            

        } catch(error){
            res.status(500).send({error: 'Login failed', details: error});

        }

    });



//Running Router
  done();
};






module.exports = Router;




