const { MongoClient } = require("mongodb");
var settings = require('../config/settings');

module.exports.addQuote = function addQuote(name, workers, budget) {
    const client = new MongoClient(settings.testDBUser);
    async function run() {
    try {
        var dbo = client.db("testDB")
        var myobj = {quoteName:name, workers:workers, budget:budget};
        // Connect the client to the server
        await dbo.collection("quotes").insertOne(myobj, function(err,res){
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("1 quote inserted");
        });
        console.log("End of database add");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);

    return 0;
}
