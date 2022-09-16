const functions = require('@google-cloud/functions-framework');
const https = require('https')

functions.http('getHottestAreaInSG', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST');

    https.get('https://api.data.gov.sg/v1/environment/air-temperature', (response) => {

        response.on('data', (d) => {
            const data = JSON.parse(d)
            const hottestArea = getHottestArea(data)
            const hottestAreaNameAndTemp = getAreaName(hottestArea, data)
            res.send(hottestAreaNameAndTemp)
        });

    }).on('error', (error) => {
        console.log(error)
    });

    const getHottestArea = (data) => {
        const readings = data.items[0].readings
        const hottestArea = readings.reduce((prev, current) => {
            return prev.value > current.value ? prev : current
        }, {"station_id": null, "value": "-1"})
        return hottestArea
    }

    const getAreaName = (hottestArea, data) => {
        const stations = data.metadata.stations
        const id = hottestArea.station_id 
        const hottestStation = stations.find(element => element.id === id)
    
        hottestArea.name = hottestStation.name
        
        return hottestArea
    }
});
