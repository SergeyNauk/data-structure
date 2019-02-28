import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class BinaryTreeNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        
        this.left = null;
        this.right = null;
    }
};

class BinaryTreeObject {
    constructor() {
        this.root = null;
    };

    isEmpty() {
        return this.root === null;
    };

    isContains(key) {
        return this.get(key) !== null
    };

    get(key) {
        return this.iGet(this.root, key);
    };

    iGet(node, key) {
        if (key === null) {
            console.log('Key is null');
            } else {
                if (node === null) return null;
                if (key === null)  console.log('key is null'); 
                if (key < node.key) return this.iGet(node.left, key);
                if (key === node.key) return node.value;
                if (key > node.key) return this.iGet(node.right, key);  
        };
    };

    put(key, value) {
        if (key, value) {
            if (key === null) {
                console.log('key is null');
            } else if (value === null) {
                console.log('value is null');
            } else {
                this.root = this.iPut(this.root, key, value);
            }
        }
    };

    iPut(x, key, value) {
        if(x === null) return new BinaryTreeNode(key, value);

        if(key < x.key) {
            x.left = this.iPut(x.left, key, value);
        } else if (key > x.key) {
            x.right = this.iPut(x.right, key, value);
        } else {
            console.log(`Error: key "${key}" is duplicate`);
        };

        return x;
    };
};

const BTOInstanse = new BinaryTreeObject();
//Methods
const validateKeyValue = (key, value) => {
    if (key === '') {
        console.log('error: key is empty object');

        return;
    } else if (value === '') {
        console.log('error: value is empty object');

        return;
    };

    const keyToNumber = Number(key);
    
    if (!Number.isNaN(keyToNumber)) {
        BTOInstanse.put(keyToNumber, value);

        console.log(BTOInstanse);
    } else {
        console.log(`Error: key "${key}" is not a number`);
    }
};

const getValueByKey = (key) => {
    if (key === '') {
        console.log('error: key is empty object');

        return;
    };

    const keyToNumber = Number(key);
    
    if (Number.isNaN(keyToNumber)) {
        console.log(`Error: key "${key}" is not a number`);
    } else {
        if (BTOInstanse.isContains(keyToNumber)) {
            console.log(`value of object with key "${key}": ${BTOInstanse.get(keyToNumber)}`);
        } else {
            console.log(`The object with the key "${key}" is not in the binary tree`);
        }
    }
};

const isEmpty = () => {
    console.log(`Tree is empty: ${BTOInstanse.isEmpty()}`);
};

const isContains = (key) => {
    if (key === '') {
        console.log('error: key is empty object');

        return;
    };

    const keyToNumber = Number(key);
    
    if (Number.isNaN(keyToNumber)) {
        console.log(`Error: key "${key}" is not a number`);
    } else {
        console.log(`Object with key ${key} in binary tree: ${BTOInstanse.isContains(keyToNumber)}`);
    }
};

export default class BinaryTree extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                <div>
                    <p className = 'data-structure-description'>
                        In computer science, binary search trees (BST), sometimes called ordered or sorted binary trees, are a particular type of container:
                        data structures that store "items" (such as numbers, names etc.) in memory. They allow fast lookup, addition and removal of items,
                        and can be used to implement either dynamic sets of items, or lookup tables that allow finding an item by its key (e.g., finding 
                        the phone number of a person by name). Binary search trees keep their keys in sorted order, so that lookup and other operations can 
                        use the principle of binary search: when looking for a key in a tree (or a place to insert a new key), they traverse the tree from 
                        root to leaf, making comparisons to keys stored in the nodes of the tree and deciding, on the basis of the comparison, to continue 
                        searching in the left or right subtrees. On average, this means that each comparison allows the operations to skip about half of 
                        the tree, so that each lookup, insertion or deletion takes time proportional to the logarithm of the number of items stored in the 
                        tree. This is much better than the linear time required to find items by key in an (unsorted) array, but slower than the 
                        corresponding operations on hash tables.
                    </p>
                </div>
                 <div>
                    <div>
                        <input 
                            className ='input-styles' 
                            placeholder = 'input key (only number)' 
                            ref = {(input => this.inputKeyRef = input)} 
                        />
                        <input 
                            className ='input-styles' 
                            placeholder = 'input value' 
                            ref = {(input => this.inputValueRef = input)} 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                validateKeyValue(this.inputKeyRef.value.trim(), this.inputValueRef.value.trim()); 
                                
                                this.inputKeyRef.value = ''; 
                                this.inputValueRef.value = '';
                            }
                          }
                        >
                            Add element
                        </button>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            ref = {(input => this.inputGetValueToKeyRef = input)}
                            placeholder = 'The key to get the value' 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => {
                                getValueByKey(this.inputGetValueToKeyRef.value.trim());
                                
                                this.inputGetValueToKeyRef.value = '';
                            }
                          }
                        >
                            Get value by key
                        </button>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            ref = {(input => this.inputIsContainRef = input)}
                            placeholder = 'Enter the key to check' 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={ () => {
                                isContains(this.inputIsContainRef.value.trim());
   
                                this.inputIsContainRef.value = '';
                            }
                          }
                        >
                            Сheck availability of object by key
                        </button>
                    </div>
                    <div>
                        <button  className = 'button-styles' onClick={ () => isEmpty() }>Tree is Empty</button>
                   </div>
               </div> 
            </div> 
              }
            />
        );
    };
};
