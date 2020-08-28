'use strict';

module.exports = function(app) {
// Handlers
    app.get('/', async (req, res) => {

        let data = []
        await planetResources.getall(data)
        .then( response => {
            res.render('home', {layout : 'index', quotes: data });
        })
        .catch(error => console.error(error));
    })

    app.get('/planet_resources', async (req, res) => {
        let data = []
        await planetResources.getall(data)
        .then( response => {
            res.render('planet_resources', {layout : 'index', planet_resources: data});
        })
        .catch(error => console.error(error));
    })

    app.post('/planet_resources', async (req, res) => {
        await planetResources.add(req.body)
        .then(result => {
            res.redirect('/');
        })
        .catch(error => console.error(error));
    })

    app.put('/planet_resources', (req, res) => {
        console.log(req.body)
    })
};
