var csvHelper = require('json-2-csv')
var fs = require('fs')

class CsvDataBase {
    constructor(storeName) {
        this.filePath = `database/csv/${storeName}.csv`
    }

    init(callback) {
        fs.stat(this.filePath, (err, fileInfo) => {
            if (err) {
                this.save([], (err) => {
                    callback(err, [])
                })
            } else {
                this.load(callback)
            }
        })
    }

    load(callback) {
        fs.readFile(this.filePath, 'utf-8', (err, csv) => {
            if (err) callback(err, null)
            else {
                csvHelper.csv2json(csv, (err, jsonData) => {
                    if (err) callback(err, null)
                    else callback(null, jsonData)
                })
            }
        })
    }

    save(data, callback) {
        csvHelper.json2csv(data, (err, csv) => {
            if (err) callback(err)
            else {
                fs.writeFile(this.filePath, csv, function (err) {
                    if (err) callback(err)
                })
            }
        })
    }
}

module.exports = CsvDataBase