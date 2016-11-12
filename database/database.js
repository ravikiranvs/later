class DataBase {
    constructor(store, initData, comprarer) {
        this.store = store
        this.data = initData
        this.comprarer = comprarer
    }

    findOrCreate(value, callback) {
        var userArr = this.data.filter((element) => {
            return !this.comprarer(value, element)
        })

        userArr.push(value)

        this.data = userArr

        this.save(callback)
    }

    find(value, callback) {
        var userArr = this.data.filter(this.comprarer)

        if (userArr.length == 0) {
            callback(new Error('No data found.'), null)
        }
        else {
            callback(null, userArr[0])
        }
    }

    save(callback) {
        this.store.save(this.data, callback)
    }
}

module.exports = DataBase