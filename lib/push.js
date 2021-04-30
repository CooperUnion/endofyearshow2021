const p = require('node-prowl')
const apikey = process.env.PROWL_KEY

const prowl = new p(apikey);
//const url = 'https://api.prowlapp.com/publicapi/add'

const push = (id, msg='') =>{

const url = `https://eoys-uploader-2021.glitch.me/app/post/${id}`
  
prowl.push(msg, 'EOYS 2021', {
	priority: 2,
	url
}, function( err, remaining ){
	if( err ) throw err;
	console.log( 'I have ' + remaining + ' calls to the api during current hour. BOOM!' );
});

}

module.exports = push