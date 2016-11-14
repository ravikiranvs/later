const routes = function(app){
    require('./me')(app, require('../middleware'))
}

module.exports = routes