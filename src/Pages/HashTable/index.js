import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class HashTableObject {
    constructor(capacity) {
        this.INIT_CAPACITY = 5;
        this.n = 0; //amount of elements 
        this.m = capacity | this.INIT_CAPACITY;  // amount of table   // | bitwize operator OR   
        
        this.keys = new Array(this.m);
        this.vals = new Array(this.m);

        for ( let i = 0; i < this.m ; i++ ) {
            this.keys[i] = null;
            this.vals[i] = null;
        }
    };

    size() {
        return this.n;
    };

    isEmpty() {
        return this.size() === 0;
    };

    contains(key) {
        if (key == null) {
            console.log('key is null')
        } else {
            return this.get(key) != null;
        };
    };

    hash(key) {
        const hashKey = (key & 0x7fffffff)%this.m; // & bitwize operator AND  
        return hashKey;
    };

    resize(newCapacity) {
        const tableMap = new HashTableObject(newCapacity);

        for ( let i = 0; i < this.m ; i++) {
            if (this.keys[i] != null ) {
                tableMap.put(this.keys[i], this.vals[i]);
            }
        };

        this.keys = tableMap.keys;
        this.vals = tableMap.vals;
        this.m = tableMap.m;
    };

    put(key, value) {
        if(key == null) {
            console.log('key is null');
        
            return;
        };
       if (value == null) {
           this.delete(key);

           return;
       };

       if (this.n + 1 > this.m/2) {
           this.resize(2*this.m);
            
           console.log('resize hash table: to bigger size');
        };
       
       let i = 0;
       
       for (i = this.hash(key); this.keys[i] != null ; i = (i+1)%this.m) {  //if there is a collision, algoritm find the next empty cell
           if(this.keys[i] == key) {  //overwriting an object with a duplicate key
               this.vals[i] = value;
               
               return;
           }
       };
    
       this.keys[i] = key;
       this.vals[i] = value;
       
       this.n++;
    };

    get(key) {
        if(key == null) return;
        for(let i = this.hash(key); this.keys[i] != null; i = (i+1)%this.m) {
            if (this.keys[i] == key) {
                return this.vals[i];
            }
        };
        
        return null;
    };

    delete(key) {
        if (key == null) {
            console.log('key is null');
            return;
        };
        
        if (this.contains(key) == false) {
            return;
        };

        let i = this.hash(key);
       
        while (key != this.keys[i]) {
            i = (i + 1)%this.m;
        }

        this.keys[i] = null;
        this.vals[i] = null;
        
        i = (i+1)%this.m;

        while( this.keys[i] != null ) {
            let newKey = this.keys[i];
            let newValue = this.vals[i];

            this.put(newKey, newValue);
            i = (i+1)%this.m;
        };

        this.n--;
        
        if (this.n > 0 && this.n <= this.m/4) {
            this.resize(this.m/2);

            console.log('resize hash table: to smaller size');
        };
    };
};

const hashTable = new HashTableObject();
//Methods
const put = (key, value) => {
    if (key === '') {
        console.log('error: key is empty object');

        return;
    } else if (value === '') {
        console.log('error: value is empty object');

        return;
    };

    const keyToNumber = Number(key);

    if (!Number.isNaN(keyToNumber)) {
        hashTable.put(keyToNumber, value);

        console.log(hashTable);
    } else {
        console.log(`Error: key "${key}" is not a number`);
    };
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
        if (hashTable.contains(keyToNumber)) {
            console.log(`The object with the key "${key}" have value: ${hashTable.get(keyToNumber)}`);
        } else {
            console.log(`The object with the key "${key}" is not in the hash table`);
        };
    };
};

const isEmpty = () => {
    console.log(`Hash table is empty: ${hashTable.isEmpty()}`);
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
        console.log(`Object with key ${key} in hash table: ${hashTable.contains(keyToNumber)}`);
    };
};

const deleteMethod = (key) => {
    if (key === '') {
        console.log('error: key is empty object');

        return;
    };

    const keyToNumber = Number(key);
    
    if (Number.isNaN(keyToNumber)) {
        console.log(`Error: key "${key}" is not a number`);
    } else {
        if (hashTable.contains(keyToNumber)) {
            hashTable.delete(keyToNumber);

            console.log(hashTable);
        } else {
            console.log(`The object with the key "${key}" is not in the hash table`);
        };
    };
};

export default class HashTable extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            In computing, a hash table (hash map) is a data structure that implements an associative array abstract data type,
                             a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of 
                             buckets or slots, from which the desired value can be found.
                        </p>
                        <p className = 'data-structure-description'>
                            Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect 
                            hash function, which might cause hash collisions where the hash function generates the same index for more than one key. 
                            Such collisions must be accommodated in some way.
                        </p>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            placeholder = 'Input key (only number)' 
                            ref = {(input => this.inputKeyRef = input)} 
                        />
                        <input 
                            className ='input-styles' 
                            placeholder = 'Input value' 
                            ref = {(input => this.inputValueRef = input)} 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                put(this.inputKeyRef.value.trim(), this.inputValueRef.value.trim()); 
                                
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
                            placeholder = 'The key to check' 
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
                        <input 
                            className ='input-styles' 
                            ref = {(input => this.inputDeleteRef = input)}
                            placeholder = 'The key to delete' 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={ () => {
                                deleteMethod(this.inputDeleteRef.value.trim());
   
                                this.inputDeleteRef.value = '';
                            }
                          }
                        >
                           Delete object by key
                        </button>
                    </div>
                    <div>
                        <button  className = 'button-styles' onClick={ () => isEmpty() }>Tree is Empty</button>
                   </div>
                </div>
              }
            />
        );
    };
};
