var distance = require('google-distance');
var NodeGeocoder = require('node-geocoder');

let apikey = 'AIzaSyA0Rwk_ewEA1790MD-MrPHkYGEKs1r5DtI'
distance.apiKey = apikey;

var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: apikey, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

var geocoder = NodeGeocoder(options);

let exportedMethods ={

    async getGeoCoder(address){
        let response;
        await geocoder.geocode(address, function(err, res) {
            response = res;
            // console.log(res);
          });

        // console.log("In models: ",response);
        
        return response;
    },

    async getDistance(list) {
        // console.log("In model maps:");
        // console.log(list);

        let distList = Array.apply(null, Array(list.length)).map(Number.prototype.valueOf,0);
        
        let sortedList = [];
        for(let i = 0; i < list.length - 1; i++){
            sortedList.push(list[i]);
            distList[i] = Infinity;
            for(let j = i+1; j< list.length; j++){
                // console.log(j);
                
                let orig = "";
                let dest = "";
                orig = orig + list[i].lat +","+ list[i].lng ;
                dest = dest + list[j].lat +","+ list[j].lng ;
                let dist = await distance.get({origin:orig,destination:dest}, async function(err, data) {
                    if (err) return console.log(err);
                    
                    // console.log("\nmaps: "+i+", " + j);
                    // console.log(data);
                    // distList[j] = data.distanceValue;
                    // console.log(distList);
                    return await data;
                  });
                // let dist = await this.getDist(orig, dest);
                // distList[j] = dist.distanceValue;
                // console.log(dist);
                
            }
        }
        return list;
    },

    // async getDist(orig, dest){
    //     let response;
    //     await distance.get({ origin: orig, destination: dest }, function(err, data) {
    //         if (err) return console.log(err);
    //         console.log("\nmaps:" + orig);
    //         response = data;
    //         console.log(data);
    //     });
    //     return response;
    // }
}

module.exports = exportedMethods;
