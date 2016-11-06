var csvHelper = require('json-2-csv')
var fs = require('fs')

class CsvDataBase {
    constructor() {
        this.filePath = 'database/csv/data.csv'
        this.data = []

        fs.stat(this.filePath, function(err, fileInfo) {
            if (err) {
                save(this.filePath, this.data, function(err) {
                    if (err) console.log(err)
                })
            }
            else {
                read(this.filePath, function(err, data) {
                    if (err) console.log(err)
                    else this.data = data
                }.bind(this))
            }
        }.bind(this))
    }

    findOrCreate(profile, callback) {
        var userArr = this.data.filter(function(value) {
            return value.redditId == profile.redditId || value.twitterId == profile.twitterId || value.imgurId == profile.imgurId
        })

        if (userArr.length == 0) {
            this.data.push(profile)
            save(this.filePath, this.data, function(err) {
                callback(err, null)
            })
        }
        else {
            callback(null, userArr[0])
        }
    }

    find(id, callback) {
        var userArr = this.data.filter(function(value) {
            return value.redditId == id || value.twitterId == id || value.imgurId == id
        })

        if (userArr.length == 0) {
            callback(new Error('No user found.'), null)
        }
        else {
            callback(null, userArr[0])
        }
    }


}

function read(filePath, callback) {
    fs.readFile(filePath, 'utf-8', function(err, csv) {
        if (err) callback(err, null)
        else {
            csvHelper.csv2json(csv, function(err, jsonData) {
                if (err) callback(err, null)
                else callback(null, jsonData)
            })
        }
    })
}

function save(filePath, data, callback) {
    csvHelper.json2csv(data, function(err, csv) {
        if (err) callback(err)
        else {
            fs.writeFile(filePath, csv, function(err) {
                if (err) callback(err)
            })
        }
    })
}

module.exports = CsvDataBase