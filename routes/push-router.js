const fetch = require('node-fetch')
const p = require('node-prowl')
const apikey = process.env.PROWL_KEY

const prowl = new p(apikey);
//const url = 'https://api.prowlapp.com/publicapi/add'

const push = (msg) =>{

prowl.push(msg, 'My app', {
	priority: 2,
	url: 'https://eoys-uploader-2021.glitch.me/app'
}, function( err, remaining ){
	if( err ) throw err;
	console.log( 'I have ' + remaining + ' calls to the api during current hour. BOOM!' );
});

}

module.exports = push