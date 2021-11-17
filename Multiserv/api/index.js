//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| o_o |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require('./src/app');
const { conn } = require('./src/db.js');
const { Servicios, Usuarios } = require('./src/db.js');
const fs = require('fs');
const services = JSON.parse(fs.readFileSync('./src/mockup-data/services.json'));

require('dotenv').config();
const {
    PORT
} = process.env


let DataServices = async () => {
            try {
                // var serviceCreated = await Servicios.bulkCreate(services);
            //    var serviciosCreados=  services.map( async s => {
            //     var serviceCreated = await Servicios.create({
            //             title: s.title, 
            //             currency: s.currency,
            //             description: s.description, 
            //             max: parseInt(s.max),
            //             min: parseInt(s.min), 
            //             rating: parseInt(s.rating), 
            //             photos: s.photos,  
            //     })
            //     console.log(serviceCreated);

            
                // serviceCreated.addUsuarios(s.id);
                // return serviceCreated;

                //  })
                //  console.log(serviciosCreados)

                for(let s of services) {
                    const servicio = await Servicios.create( {
                        title: s.title, 
                        currency: s.currency,
                        description: s.description, 
                        max: parseInt(s.max),
                        min: parseInt(s.min), 
                        rating: parseInt(s.rating), 
                        photos: s.photos, 
                    })
                    // await servicio.addUsuarios(usuarios.id)
                }
            }
            catch(err){
                console.log(err)
            }
        }      

DataServices();


conn
    .sync({ force: false })
    .then(async () => {
        await app.listen(PORT || 3001, () => {
            console.log('Server on port', PORT || 3001)
        })
    })
    .catch ((e)=>console.log(e.message))


