class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val); 
    if(!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
  while (true) {
    if (val < current.val) {
      if (current.left === null) {
        current.left = newNode;
        return this;
      }
      current = current.left;
    } else {
      if (current.right === null) {
        current.right = newNode;
        return this;
      }
      current = current.right;
    }
  }
}

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this; 
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
      } else {
        this.insertRecursively(val, current.left);
      }
    } else {
      if (!current.right) {
        current.right = new Node(val); 
      } else {
        this.insertRecursively(val, current.right); 
      }
    }
    return this; 

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while(current) {
      if (val === current.val) return current;
      if(val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined; 

  }


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current; 
    if (val < current.val) return this.findRecursively(val, current.left); 
    return this.findRecursively(val, current.right); 
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = [];

    function traverse(node) {
      result.push(node.val); 
      if(node.left) traverse(node.left); 
      if(node.right) traverse(node.right); 
    }

    if(this.root) traverse(this.root); 
    return result; 
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = [];

    function traverse(node) {
      if (node.left) traverse(node.left) // traverse left subtree.
      result.push(node.val); // visit current node.
      if (node.right) traverse(node.right); // traverse right sub tree. 
    }

    if (this.root) traverse(this.root); 
    return result; 

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = [];

    function traverse(node) {
      if (node.left) traverse(node.left); // traverse left subtree/ 
      if (node.right) traverse(node.right); // traverse right subtree
      result.push(node.val); // visit current node.
    }

    if (this.root) traverse(this.root); 
    return result; 
  }

  /** bfs(): Traverse the array using BFS. (Breadth-first-search)
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root,
        result = [],
        queue = []; 

    queue.push(node); 

    while(queue.length) {
      node = queue.shift();
      result.push(node.val); // visit current node. 

      if(node.left) queue.push(node.left); // add left child to queue
      if(node.right) queue.push(node.right); // add right child to queue
    }

    return result; // return result array
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    function removeNode(node, val) {
      if(!node) return null; 

      if(val < node.val) {
        node.left = removeNode(node.left, val);
        return node; 
      } else if (val > node.val) {
        node.right = removeNode(node.right, val); 
        return node;
      } else {
        // Node found
        // case 1: no childretn, leaf node
        if (!node.left && !node.right) return null; 

        // Case 2: One child
        if (!node.left) return node.right; 
        if(!node.right) return node.left; 

        // Case 3: two children
        let successor = node.right; 
        while (successor.left) {
          successor = successor.left; 
        }
        node.val = successor.val;
        node.right = removeNode(node.right, successor.val); 
        return node; 
      }
    }

    this.root = removeNode(this.root, val); 
    return this; 

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function checkHeight(node) {
      if(!node) return 0;
      let leftHeight = checkHeight(node.left); 
      if(leftHeight === -1) return -1; 
      let rightHeight = checkHeight(node.right);
      if(rightHeight === -1) return -1; 

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(this.root) !== -1; 

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined; 
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current; 
      current = current.right;
    }

    // Case 1: righmost node has left subtree
    if(current.left) {
      let node = current.left;
      while(node.right) {
        node = node.right;
      }
      return node.val; 
    }

    // Case 2: no left subtree, parent is second highest
    return parent.val; 
  }
}

module.exports = BinarySearchTree;
