// IMPORTS
const fastify = require('fastify')({ logger: true });


const sequelize = require('./config/database');

const PORT = 3000;



// Declare a route
fastify.get('/', async function handler (request, reply) {
    return { msg: 'hello from my project fastify !!' }
  })


  const start = async () => {
    try {
      await fastify.listen({ port: PORT });
      console.log(`Server is running on port ${PORT}`);
      await sequelize.authenticate();
      console.log('Connection has been established successfully!!');
      await sequelize.sync(); 

    } catch (error) {
      console.log(`Server failed to start on port ${PORT}`)
      fastify.log.error(error);
      process.exit(1);
    }
  };
  
  start();