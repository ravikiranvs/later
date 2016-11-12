var DataBase = require('./database')

const databaseCreator = function (type, name, comparer, callback) {
    switch (type) {
        case 'csv': {
            var CsvStore = require('./csv')
            var store = new CsvStore(name)
            store.init((err, data) => {
                if (err) callback(err, null)
                else callback(null, new DataBase(store, data, comparer))
            })
        }
    }
}

module.exports = databaseCreator