import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class DirectedEdge {
    constructor(from, to, weight) {
        this.From = from;   
        this.To = to;      
        this.Weight = weight;
    };

    from() {
        return this.From;
    };

    to() {
        return this.To;
    };

    weight() {
        return this.Weight;
    };

};


class EdgeWeightedGraphObject {
    constructor() {
        this.v = 2;   //number of vertices, minimum 2
        this.e = 0;       //number of edges
        
        this.adj = []; //adjacency matrix
        this.inDegree = []; 
        
        this.edgeArray = [];

        for (let i = 0; i<2; i++) {
            this.inDegree[i] = 0;
            this.adj[i] = [];
        }
    };


    setVertices(v) {
        if (this.v > v) {
                console.log(`Error: you can only increase the number of vertices`);
        } else {
            for (let i = this.v; i < v; i++) {
                    this.adj[i] = [];
                    this.inDegree[i] = 0;
                };

                this.v = v;
            };
    };

    validate(v) {
        if (v < 0 || v >= this.v ) {
            console.log('Vertex is not valide');

            return false;
        } else {
            return true;
        }
    };

    degree(v) {  //the degree of the vertices
        if (!this.validate(v)) return;
        
        return this.adj[v].length;
    };

    indegree(v) {
        if (!this.validate(v)) return;

        return this.inDegree[v];
    };

    addEdge(from, to, weight) {
        if( !this.validate(from) || !this.validate(to) ) return;

        let duplicateEdge = false;

       this.adj[from].forEach( item => {
           if ( item === to ) {
               duplicateEdge = true;
           }
       });

       if (!duplicateEdge) { 
        this.e++;

        this.adj[from].push(to);
        this.inDegree[to]++;

        const directedEdgeInstanse = new DirectedEdge(from, to, weight);

        this.edgeArray.push(directedEdgeInstanse);
        } else {
            console.log(`edges ${from} and ${to} are duplicated`);
        };
    };

    vertices() {
        return this.v;
    };

    edges() {
        return this.e;
    };
};

const EWG = new EdgeWeightedGraphObject();

const setVertices = (v) => {
    if (v === '') {
        console.log('error: vertices is empty object');

        return;
    };

    const stringToNumber = Number(v);

    if (Number.isNaN(stringToNumber) || stringToNumber < 2) {
            console.log(`Error: "${v}" incorrect number of vertices`);
    } else {
        EWG.setVertices(stringToNumber);

        console.log(EWG);
    };
};

const addEdge = (from, to, weight) => {
    if (from === '') {
        console.log('error: vertex FROM is empty object');

        return;
    } else if (to === '') {
        console.log('error: vertex TO is empty object');

        return;
    } else if (weight === '') {
        console.log('error: WEIGHT is empty object');

        return;
    };

    const stringToNumberFrom = Number(from);
    const stringToNumberTo = Number(to);
    const stringToNumberWeight = Number(weight);

    if (stringToNumberFrom === stringToNumberTo) {
        console.log(`Error: vertex FROM equal vertex TO`);

        return;
    };

    if (Number.isNaN(stringToNumberFrom) || stringToNumberFrom < 0) {
        console.log(`Error: "${from}" incorrect number of vertices`);
        
        return;
    };

    if (Number.isNaN(stringToNumberTo) || stringToNumberTo < 0) {
        console.log(`Error: "${to}" incorrect number of vertices`);
        
        return;
    };

    if (Number.isNaN(stringToNumberWeight) || stringToNumberWeight < 0) {
        console.log(`Error: "${weight}" incorrect value of weight`);
        
        return;
    };

    EWG.addEdge(stringToNumberFrom, stringToNumberTo, stringToNumberWeight);

    console.log(EWG);
};

const vertices = () => {
    console.log(`${EWG.vertices()} vertices`);
};

const edges = () => {
    console.log(`${EWG.edges()} edges`);
};

const degree = (v) => {
    if (v === '') {
        console.log('error: vertex is empty object');

        return;
    };

    const stringToNumber = Number(v);

    if (Number.isNaN(stringToNumber) || stringToNumber < 0) {
        console.log(`Error: "${v}" incorrect number of vertices`);
        
        return;
    };

    const degree = EWG.degree(stringToNumber);
    
    const message = degree !== undefined && degree !== 0 
        ? `vertex ${stringToNumber} have ${degree} degree`
        : `vertex ${stringToNumber} has no degree`;

    console.log(message);
};

const indegree = (v) => {
    if (v === '') {
        console.log('error: vertex is empty object');

        return;
    };
    
    const stringToNumber = Number(v);

    if (Number.isNaN(stringToNumber) || stringToNumber < 0) {
        console.log(`Error: "${v}" incorrect number of vertices`);
        
        return;
    };

    const inDegree = EWG.indegree(stringToNumber);
    
    const message = inDegree !== undefined && inDegree !== 0 
        ? `vertex ${stringToNumber} have ${inDegree} indegree`
        : `vertex ${stringToNumber} has no indegree`;

    console.log(message);
};

export default class EdgeWeightedGraph extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            Weighted graph it's a graph whose edges have weights
                        </p>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            ref = {(input => this.inputVerticesRef = input)}
                            placeholder = 'Count of vertices' 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => {
                                setVertices(this.inputVerticesRef.value.trim());
                                
                                this.inputVerticesRef.value = '';
                            }
                          }
                        >
                            Set number of vertices
                        </button>
                    </div>
                    <div>
                        <input 
                            className ='input-styles' 
                            placeholder = 'Add edges from' 
                            ref = {(input => this.inputAddEdgeFromRef = input)} 
                        />
                        <input 
                            className ='input-styles' 
                            placeholder = 'Add edges to' 
                            ref = {(input => this.inputAddEdgeToRef = input)} 
                        />
                        <input 
                            className ='input-styles' 
                            placeholder = 'Add weight of edges' 
                            ref = {(input => this.inputAddEdgeWeightRef = input)} 
                        />
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                addEdge(this.inputAddEdgeFromRef.value.trim(), this.inputAddEdgeToRef.value.trim(), this.inputAddEdgeWeightRef.value.trim()); 
                                
                                this.inputAddEdgeFromRef.value = ''; 
                                this.inputAddEdgeToRef.value = '';
                                this.inputAddEdgeWeightRef.value ='';
                            }
                          }
                        >
                            Add edge
                        </button>
                    </div>
                    <div>
                        <input 
                                className ='input-styles' 
                                placeholder = 'Number of vertex' 
                                ref = {(input => this.inputNumberOfVertexRef = input)} 
                         />
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                degree(this.inputNumberOfVertexRef.value.trim()); 
                                
                                this.inputNumberOfVertexRef.value = ''; 
                            }
                          }
                        >
                            Get count degree of vertex 
                        </button>
                    </div>
                    <div>
                        <input 
                                className ='input-styles' 
                                placeholder = 'Number of vertex' 
                                ref = {(input => this.inputNumberOfindegreeRef = input)} 
                         />
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                indegree(this.inputNumberOfindegreeRef.value.trim()); 
                                
                                this.inputNumberOfindegreeRef.value = ''; 
                            }
                          }
                        >
                            Get count indegree of vertex 
                        </button>
                    </div>
                    <div>
                        <button  className = 'button-styles' onClick={ () => vertices() }> Get count of vertices </button>
                        <button  className = 'button-styles' onClick={ () => edges() }> Get count of edges </button>
                    </div> 
                </div>
              }
            />
        );
    };
};
