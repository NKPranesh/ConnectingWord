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

const GITList = (source, destination) => {
  printAllPaths(nodes.indexOf(source), nodes.indexOf(destination));
  return pathLists;
};

export default GITList;
