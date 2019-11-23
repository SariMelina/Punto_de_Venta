const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10); //Genera un hash
    const hash = await bcrypt.hash(password, salt); //Cifra la contraseña
    return hash;
};

//Para el Loggeo
helpers.matchPassword = async(password, savePassword) => {
    try {
        return await bcrypt.compare(password, savePassword); //Compara la contraseña 
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;