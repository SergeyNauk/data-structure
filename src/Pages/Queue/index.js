import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    };
};

class QueueElement {
    constructor() {
        this.first = null;
        this.last = null;
        this.n = 0;
    }

    isEmpty() {
        return this.first === null;
    };

    size() {
        return this.n;
    };

    enqueue(value) {
        const oldLastElement = this.last;
        
        this.last = new QueueNode(value);
        
        if (this.isEmpty()) {
            this.first = this.last;
        } else {
            oldLastElement.next = this.last;
        };

        this.n++;
    };

    dequeue() {
        if(this.isEmpty()) {
                this.last = null;
                return null;
            };
            
            const element = this.first.value;
            this.first = this.first.next;
            
            this.n--;

            return element;
    };
};

const newQueue = new QueueElement();
//Methods
const enqueueMethod = (value) => {
    newQueue.enqueue(value);
};

const dequeueMethod = () => {
    newQueue.dequeue();

    console.log(newQueue);
};

const sizeMethod = () => {
   const result = newQueue.size();

    console.log('Queue size', result);
};

const isEmptyMethod = () => {
   const result = newQueue.isEmpty();

    console.log('Queue is empty', result);
};

const validate = (value) => {
    if (value !== '') {
        enqueueMethod(value);

        console.log(newQueue);
    } else {
        console.log('Empty object');
    }
};

export default class Queue extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            In computer science, a queue is a collection in which the entities in the collection are kept in order and 
                            the principal (or only) operations on the collection are the addition of entities to the rear terminal position,
                            known as enqueue, and removal of entities from the front terminal position, known as dequeue. This makes the 
                            queue a First-In-First-Out (FIFO) data structure. In a FIFO data structure, the first element added to the
                            queue will be the first one to be removed. This is equivalent to the requirement that once a new element is added,
                            all elements that were added before have to be removed before the new element can be removed. Often a peek or 
                            front operation is also entered, returning the value of the front element without dequeuing it. A queue is an 
                            example of a linear data structure, or more abstractly a sequential collection.
                        </p>
                    </div>
                    <div>
                        <div>
                            <input 
                                className ='input-styles' 
                                ref = {(input => this.inputRef = input)}
                                placeholder = 'Add element in queue' 
                            />
                            <button 
                                className = 'button-styles' 
                                onClick={() => {
                                    validate(this.inputRef.value.trim()); 
                                    
                                    this.inputRef.value = '';
                                }}
                            >
                                Enqueu
                            </button>
                        </div>
                        <div>
                            <button  className = 'button-styles' onClick={ () => dequeueMethod() }> Dequeue </button>
                            <button  className = 'button-styles' onClick={ () => sizeMethod() }> Queue size </button>
                            <button className = 'button-styles'  onClick={ () => isEmptyMethod() }> Queue is empty </button>
                        </div>
                    </div>
                </div>
              }
            />
        );
    };
};
