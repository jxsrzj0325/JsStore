describe('Db Update data type Test', function () {
    it('terminate connection', function (done) {
        con.terminate().then(function () {
            con = new JsStore.Instance();
            done();
        }).catch(function (error) {
            done(error);
        });
    });

    it('create db DbUpdateTest', function (done) {
        var db = DbUpdateTest.getDbSchema();
        console.log("executing create db 1");
        console.log(db)
        con.initDb(db).then(function (isDbCreated) {
            console.log("executing create db 2");

            expect(isDbCreated).to.be.an('boolean').equal(true);
            done();
        }).catch(function () {
            done("dff")
        })
        console.log("executing create db 3");

    });

    it('getDbSchema', function (done) {
        con.getDbSchema("DbUpdateTest").then(function (schema) {
            const processIdColumn = schema.tables[0].columns[1];
            expect(processIdColumn.name).to.equal("process_id");
            expect(processIdColumn.dataType).to.equal("number");
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('change db', function (done) {
        var db = DbUpdateTest.getV2DbSchema();
        con.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(true);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('getDbSchema after updating db', function (done) {
        con.getDbSchema("DbUpdateTest").then(function (schema) {
            const processIdColumn = schema.tables[0].columns[1];
            expect(processIdColumn.name).to.equal("process_id");
            expect(processIdColumn.dataType).to.equal("string");
            done();
        }).catch(function (err) {
            done(err);
        });
    });

});

var DbUpdateTest = {
    getDbSchema: function () {
        var people = {
            "name": "test",
            "columns":
            {
                "id": {
                    "primaryKey": true,
                    "dataType": "number",
                    "autoIncrement": true,
                    "notNull": true
                },
                "process_id": {
                    "dataType": "number"
                },
            },

        },
            dataBase = {
                name: 'DbUpdateTest',
                tables: [people]
            };
        return dataBase;
    },
    getV2DbSchema: function () {
        var people = {
            "name": "test",
            "columns":
            {
                "id": {
                    "primaryKey": true,
                    "dataType": "number",
                    "autoIncrement": true,
                    "notNull": true
                },
                "process_id": {
                    "dataType": "string"
                },
            },
            version: 2
        },
            dataBase = {
                name: 'DbUpdateTest',
                tables: [people]
            };
        return dataBase;
    },
    getValues: function () {
        var values = [{
            name: "Ray",
            tags: ["apple", "banana", "beer"]
        },
        {
            name: "Scott",
            tags: ["beer"]
        }, {
            name: "Marc",
            tags: ["mongo", "jenkins"]
        }
        ];
        return values;
    }
}