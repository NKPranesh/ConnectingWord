let nodes = [
  "pranesh@gmail.com",
  "vamshi@gmail.com",
  "mahesh@gmail.com",
  "virat@gmail.com",
  "rohit@gmail.com",
  "tarak@gmail.com",
  "charan@gmail.com",
];
let adjList = [[3, 5, 1], [0], [3, 6], [2, 4, 0], [3], [6, 0], [5, 2]];
let v = nodes.length;
let pathLists = [];
let pathcount = 0;
function printAllPaths(s, d) {
  let isVisited = new Array(v);
  for (let i = 0; i < v; i++) isVisited[i] = false;
  let pathList = [];

  pathList.push(nodes[s]);
  printAllPathsUtil(s, d, isVisited, pathList);
}
function printAllPathsUtil(u, d, isVisited, localPathList) {
  if (u === d) {
    pathLists[pathcount] = [];
    localPathList.map((node) => {
      pathLists[pathcount].push(node);
      return 0;
    });
    ++pathcount;
    return;
  }

  // Mark the current node
  isVisited[u] = true;
  for (let i = 0; i < adjList[u].length; i++) {
    if (!isVisited[adjList[u][i]]) {
      localPathList.push(nodes[adjList[u][i]]);
      printAllPathsUtil(adjList[u][i], d, isVisited, localPathList);
      localPathList.splice(localPathList.indexOf(nodes[adjList[u][i]]), 1);
    }
  }
  isVisited[u] = false;
}

const GITList = (source, destination, nodesList, userTable) => {
  nodes = [];
  adjList = [];
  pathLists = [];
  pathcount = 1;
  for (let i = 0; i < nodesList.length; i++) {
    nodes.push(nodesList[i].email);
  }

  for (let i = 0; i < nodes.length; i++) {
    let friends = [];
    for (let j = 0; j < userTable.length; j++) {
      if (userTable[j].friends.includes(nodes[i])) {
        friends.push(nodes.indexOf(userTable[j].email));
      }
    }
    adjList.push(friends);
  }

  printAllPaths(nodes.indexOf(source), nodes.indexOf(destination));
  return pathLists;
};

export default GITList;
