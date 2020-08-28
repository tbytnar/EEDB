// Firebase

class PlanetResources {
    constructor(db) {
        this.database = db.collection('planet_resources');
    }

    async getall(data) {
        var self = this;
        await self.database.get()
        .then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    constellation: doc.data().constellation,
                    region: doc.data().region,
                    solarsystem: doc.data().solarsystem,
                    seclevel: doc.data().seclevel,
                    planet: doc.data().planet,
                    planettype: doc.data().planettype,
                    material: doc.data().material,
                    grade: doc.data().grade,
                    hrlyoutput: doc.data().hrlyoutput,
                    efficiency: doc.data().efficiency,
                    tempsensitivity: doc.data().tempsensitivity,
                    seclevelmodifer: doc.data().seclevelmodifer
                };
                data.push(selectedItem);
            }
        })

        return data;
    }

    async add(data) {
        var self = this;
        await self.database.add(data);
    }
}

module.exports = PlanetResources;