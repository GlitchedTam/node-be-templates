const customMiddleware = (req, res, next) => {
    console.log('Going through my custom middleware...');
    if(req.method === 'POST') console.log(req.body);
    next();
};

module.exports = customMiddleware;