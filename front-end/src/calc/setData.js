let usersList = [];
let requestList = [];
let friendsList = [];
let userEmail = null;

const setData = async () => {
  await fetch("https://connectingworld-api.cyclic.app/usertable", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      usersList = responseJson;
    })
    .catch((error) => {
      console.log(error);
    });

  await fetch("https://connectingworld-api.cyclic.app/requests-list", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      requestList = responseJson;
    })
    .catch((error) => {
      console.log(error);
    });

  await fetch("https://connectingworld-api.cyclic.app/friends-list", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      friendsList = responseJson.friendsList;
      userEmail = responseJson.userEmail;
    })
    .catch((error) => {
      console.log(error);
    });

  return { usersList, requestList, friendsList, userEmail };
};

export default setData;
