function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
const PNYlist = (latitude, longitude, loginEmail, nodes, UserTable) => {
  console.log(nodes);
  let distance = [];
  nodes.map((node) => {
    UserTable.map((user) => {
      if (user.email === node.email && user.email !== loginEmail) {
        let latitude1 = user.latitude;
        let longitude1 = user.longitude;
        let lon1 = toRadians(longitude);
        let lon2 = toRadians(longitude1);
        let lat1 = toRadians(latitude);
        let lat2 = toRadians(latitude1);

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a =
          Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
        distance.push({
          name: user.name,
          email: node.email,
          distance: c * r,
          latitude: user.latitude,
          longitude: user.longitude,
          occupation: user.occupation,
        });
      }
      return 0;
    });
    return 0;
  });
  distance.sort((a, b) => {
    return a.distance - b.distance;
  });
  return distance;
};
//PNYlist(78.3453,3.4567);
export default PNYlist;
