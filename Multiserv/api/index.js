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
const { LlamadoUsers, DataServices, Categoriasmockup, ResenasMockup, Users, CrearHorarios} = require('./src/Funciones/User');
require('dotenv').config();

conn
    .sync({ force: true})
    .then(async () => {
        await LlamadoUsers(Users);
        await Categoriasmockup();
        await DataServices();
        await ResenasMockup();
        await CrearHorarios();   
        await app.listen(process.env.PORT || 3001, () => {
            console.log('Server on port '+ process.env.PORT || 3001)
        })
    })
    .catch ((e)=>console.log(e.message));

