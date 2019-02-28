import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};

class StackElement {
    constructor() {
        this.root = null;
        this.n = 0;
    }

    isEmpty() {
        return this.n === 0;
    };

    size() {
        return this.n;
    };

    push(value) {
        const oldElement = this.root;

        this.root = new StackNode(value);
        this.root.next = oldElement;
        this.n++;
    }
    
    pop() {
        if (this.isEmpty()) return null;

        const oldElement = this.root;

        this.root = oldElement.next;
        this.n--;
        return oldElement.value;
    }
};

const newStack = new StackElement();
//methods
const pushMethod = (value) => {
    newStack.push(value);
};

const popMethod = () => {
    newStack.pop();

    console.log(newStack);
};

const sizeMethod = () => {
   const result = newStack.size();

    console.log('Stack size', result);
};

const isEmptyMethod = () => {
   const result = newStack.isEmpty();

    console.log('Stack is empty', result);
};

const validate = (value) => {
    if (value !== '') {
        pushMethod(value);

        console.log(newStack);
    } else {
        console.log('Empty object');
    };
};

export default class Stack extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            A stack is a basic data structure that can be logically thought of as a linear structure represented by a real physical stack or pile, 
                            a structure where insertion and deletion of items takes place at one end called top of the stack. The basic concept can be illustrated 
                            by thinking of your data set as a stack of plates or books where you can only take the top item off the stack in order to remove 
                            things from it. This structure is used all throughout programming.
                        </p>
                    </div>
                    <div>
                        <div>
                            <input 
                                className ='input-styles' 
                                ref = {(input => this.inputRef = input)} 
                                placeholder = 'Add element in stack'
                                />
                            <button 
                                className = 'button-styles' 
                                onClick={() => { 
                                    validate(this.inputRef.value.trim());

                                    this.inputRef.value = '';
                                    }
                                }
                            >
                                Add in the stack
                            </button>
                        </div>
                        <div>
                            <button  className = 'button-styles' onClick={ () => popMethod() }>Live the stack</button>
                            <button  className = 'button-styles' onClick={ () => sizeMethod() }>Get stack size</button>
                            <button className = 'button-styles'  onClick={ () => isEmptyMethod() }>Stack is empty</button>
                        </div>
                    </div>
                </div>
              }
            />
        );
    };
};
