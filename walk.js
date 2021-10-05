function walk(node, callback) {
  callback(node);

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}
r

let getElementsByTagName = function(nodes, nameOfTag) {
  let elements = [];
  
  walk(nodes, function(node) {
      if (node.nodeName === nameOfTag) {
          elements.push(node);
      }
  });
  return elements;
};

let updateIntroDiv = function() {
  let divs = 
}