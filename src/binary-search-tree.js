const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    function placeInTree(node) {
      if (!node) {
        return newNode;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        node.right = placeInTree(node.right);
      } else {
        node.left = placeInTree(node.left);
      }

      return node;
    }

    this.rootNode = placeInTree(this.rootNode);
  }

  has(data) {
    function isInTree(node) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (node.data < data) {
        return isInTree(node.right);
      } else {
        return isInTree(node.left);
      }
    }

    return isInTree(this.rootNode);
  }

  find(data) {
    function findInTree(node) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        return findInTree(node.right);
      } else {
        return findInTree(node.left);
      }
    }

    return findInTree(this.rootNode);
  }

  remove(data) {
    function removeFromTree(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {        
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        } else {
          let minNodeFromRightSubtree = node.right;

          while (minNodeFromRightSubtree.left) {
            minNodeFromRightSubtree = minNodeFromRightSubtree.left;
          }

          node.data = minNodeFromRightSubtree.data;
          node.right = removeFromTree(node.right, node.data);

          return node;
        }
      }

      if (node.data < value) {
        node.right = removeFromTree(node.right, value);
      } else {
        node.left = removeFromTree(node.left, value);
      }

      return node;
    }

    this.rootNode = removeFromTree(this.rootNode, data);
  }

  min() {
    let minNode = this.rootNode;

    if (minNode) {
      while (minNode.left) {
        minNode = minNode.left;
      }

      return minNode.data;
    } else {
      return null;
    }    
  }

  max() {
    let maxNode = this.rootNode;

    if (maxNode) {
      while (maxNode.right) {
        maxNode = maxNode.right;
      }

      return maxNode.data;
    } else {
      return null;
    }  
  }
}

module.exports = {
  BinarySearchTree
};
