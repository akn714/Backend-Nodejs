function log(req, res, next){
    console.log(req.url, req.method);
    next();
}

module.exports = log