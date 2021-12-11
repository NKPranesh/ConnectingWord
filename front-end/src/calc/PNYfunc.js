import   UserTable from  "../data/usersTable.json";
let nodes=["pranesh@gmail.com","vamshi@gmail.com","mahesh@gmail.com","virat@gmail.com","rohit@gmail.com","tarak@gmail.com","charan@gmail.com"];
let graph=[
    [3,5,1],
    [0],
    [3,6],
    [2,4,0],
    [3],
    [6,0],
    [5,2]
];
function toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
const PNYlist = (latitude,longitude,loginEmail) => {
    let distance=[];
    nodes.map((node)=>{
        UserTable.map((user)=>
        {
            if(user.email === node && user.email!==loginEmail){
            let latitude1=user.latitude;
            let longitude1=user.longitude;
            let lon1 = toRadians(longitude);
            let lon2 = toRadians(longitude1);
            let lat1 = toRadians(latitude);
            let lat2 = toRadians(latitude1);

            // Haversine formula
            let dlon = lon2 - lon1;
            let dlat = lat2 - lat1;
            let a = Math.pow(Math.sin(dlat / 2), 2)
                        + Math.cos(lat1) * Math.cos(lat2)
                        * Math.pow(Math.sin(dlon / 2),2);
                    
            let c = 2 * Math.asin(Math.sqrt(a));

            // Radius of earth in kilometers. Use 3956
            // for miles
            let r = 6371; 
            distance.push({name : user.name,email : node,
            distance : c*r,latitude : user.latitude,longitude : user.longitude,occupation :user.occupation});
        }
        })
    })
    distance.sort((a, b) => {
        return a.distance-b.distance;
    });
    //console.log(distance);
            return(
                distance
            );
    }
    //PNYlist(78.3453,3.4567);
export default PNYlist;