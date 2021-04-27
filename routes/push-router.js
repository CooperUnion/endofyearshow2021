const fetch = require('node-fetch')
const p = require('node-prowl')
const apikey = process.env.PROWL_KEY

const prowl = new p(apikey);
//const url = 'https://api.prowlapp.com/publicapi/add'

const push = (msg) =>{

prowl.push('YO, this is awesomez!', 'My app', {
	providerkey: 'my-provider-key',
	priority: 2,
	url: 'http://revrise.com'
}, function( err, remaining ){
	if( err ) throw err;
	console.log( 'I have ' + remaining + ' calls to the api during current hour. BOOM!' );
});

}

module.exports = push