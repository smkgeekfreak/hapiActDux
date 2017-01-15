'use strict';

const r = require('rethinkdb');

exports.register = function (server, options, next) {

    const db = 'Puffin';
    const groupTable = 'Group';
    let conn;

    //Connect and initialize
    r.connect((err, connection) => {

        if (err) {
            return next(err);
        }

        conn = connection;

        //Create db
        r.dbCreate(db).run(connection, (err, result) => {

            //Create entries table
            r.db(db).tableCreate(groupTable).run(connection, (err, result) => {

                return next();
            });

        });
    });

    server.method('db.saveEntry', (entry, callback) => {
        r.uuid(entry.name).run(conn, (err, result) => {
          console.log("uuid = " +  result);
          entry.id = result;
          r.db(db).table(groupTable).insert(entry).run(conn, callback);
        });
    });

    server.method('db.findEntries', (limit, callback) => {

        r.db(db).table(groupTable).orderBy(r.desc('createdAt')).limit(limit).run(conn, callback);
    });

    server.method('db.setupChangefeedPush', () => {

        r.db(db).table(groupTable).changes().run(conn, (err, cursor) => {

            cursor.each((err, item) => {

                server.publish('/timeline/updates', item.new_val);
            });
        });
    }, {
        callback: false
    });
};

exports.register.attributes = {
    name: 'rtdb'
};
