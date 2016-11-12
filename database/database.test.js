import test from 'ava';
import DataBase from './database'

var store = {
    save: function(data, cb){
        cb(null)
    }
}

const comparer = (x, y) => {
    return x == y
}

test('Can add 1 element', t => {
    var database = new DataBase(store, [], comparer)
    database.findOrCreate('test', () => {})
    t.is(database.data.length, 1)
})

test('Can add 2 different elements', t => {
    var database = new DataBase(store, [], comparer)
    database.findOrCreate('test1', (err) => {
        database.findOrCreate('test2', (err) => {
            t.is(database.data.length, 2)
        })
    })
})

test('No duplicates', t => {
    var database = new DataBase(store, [], comparer)
    database.findOrCreate('test', (err) => {
        database.findOrCreate('test', (err) => {
            t.is(database.data.length, 1)
        })
    })
})