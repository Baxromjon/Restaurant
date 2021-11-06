const config=require('config');

if(!config.get('jwtPrivateKey')){
    console.log('ERROR: secretOrPrivateKey must have a value!')
    process.exit(1);
}