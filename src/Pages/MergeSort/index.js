import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class MergeSortObject {
    constructor() {
        this.initArr = [];
        this.sortArr = [];
    };

    sort() {
        const auxArr = [...this.initArr];
        const result = this.merge_sort(auxArr);

        this.sortArr = [...result];

        return this.sortArr;
    };

    addElem(elem) {
        this.initArr.push(elem);
    };

    merge(leftArr, rightArr) {
        let result = [];
        let il = 0;
        let ir = 0;
        
        while (il < leftArr.length && ir < rightArr.length){
          if (leftArr[il] < rightArr[ir]){
            result.push(leftArr[il++]);
          } else {
            result.push(rightArr[ir++]);
          };
        };
     
        return result.concat(leftArr.slice(il)).concat(rightArr.slice(ir));
      };

    merge_sort(arr) {
        if (arr.length < 2){
            return arr;
        };

        const middle = Math.floor(arr.length / 2);
        
        const leftArr = arr.slice(0, middle);
        const rightArr = arr.slice(middle);
        
        return this.merge(this.merge_sort(leftArr), this.merge_sort(rightArr));
    };
};

const sortMerge = new MergeSortObject();
//Methods
const addElement = (e) => {
    if (e === '') {
        console.log('error: element is empty object');

        return;
    };

    const stringToNumber = Number(e);

    if (Number.isNaN(stringToNumber)) {
        console.log(`Error: "${e}" incorrect value`);
        
        return;
    } else {
        sortMerge.addElem(stringToNumber);

        console.log(sortMerge);
    };
};

const sort = () => {
    console.log(`Sorted array: [${sortMerge.sort()}]`);
};

export default class MergeSort extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            In computer science, merge sort (also commonly spelled mergesort) is an efficient, general-purpose, comparison-based 
                            sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same 
                            in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.
                        </p>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            ref = {(input => this.inputElementRef = input)}
                            placeholder = 'add element (only number)' 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => {
                                addElement(this.inputElementRef.value.trim());
                                
                                this.inputElementRef.value = '';
                            }
                          }
                        >
                            Add element
                        </button>
                    </div>
                    <div>
                    <button 
                        className = 'button-styles' 
                        onClick={ () => sort() }
                    >
                        Sort array
                    </button>
                    </div>
                </div>
            } />
        )
    }
};
