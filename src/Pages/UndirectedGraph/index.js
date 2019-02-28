import React, { Component } from 'react';

import PageContainer from '../../Components/PageContainer';

class UndirectedGraphObject {
    constructor() {
        this.v = 0;   //number of vertices
        this.e = 0;       //number of edges
        
        this.adj = [];    //adjacency matrix
    };

    setVertices(v) {
        if (this.v > v) {
                console.log(`Error: you can only increase the number of vertices`);
        } else {
            for (let i = this.v; i < v; i++) {
                    this.adj[i] = [];
                };

                this.v = v;
            };
    };

    vertices() {
        return this.v;
    };

    edges() {
        return this.e;
    };

    validate(v) {
        if (v < 0 || v >= this.v ) {
            console.log(`Vertex ${v} is not valide`);
            
            return false;
        } else {
            return true;
        };
    };

    degree(v) {  //the degree of the vertices
        if (!this.validate(v)) return;
        
        return this.adj[v].length;
    };

    addEdge(from, to) {
        if( !this.validate(from) || !this.validate(to) ) return;

        let duplicateEdge = false;

        this.adj[from].forEach( item => {
            if ( item === to ) {
                duplicateEdge = true;
            };
        });
        
        if (!duplicateEdge) { 
            this.e++;

            this.adj[from].push(to);
            this.adj[to].push(from);
        } else {
            console.log(`edges ${from} and ${to} are duplicated`);
        };
    };

    adjacent(v) {
        if (!this.validate(v)) return;

        return this.adj(v);
    };
};

const UDG = new UndirectedGraphObject();
//Methods
const setVertices = (v) => {
    if (v === '') {
        console.log('error: vertices is empty object');

        return;
    };

    let stringToNumber = Number(v);

    if (Number.isNaN(stringToNumber) || stringToNumber <= 0) {
            console.log(`Error: "${v}" incorrect number of vertices`);
    } else {
        UDG.setVertices(stringToNumber);

        console.log(UDG);
    };
};

const addEdge = (from, to) => {
    if (from === '') {
        console.log('error: vertex FROM is empty object');

        return;
    } else if (to === '') {
        console.log('error: vertex TO is empty object');

        return;
    };

    const stringToNumberFrom = Number(from);
    const stringToNumberTo = Number(to);

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

    UDG.addEdge(stringToNumberFrom, stringToNumberTo);

    console.log(UDG);
};

const vertices = () => {
    console.log(`${UDG.vertices()} vertices`);
};

const edges = () => {
    console.log(`${UDG.edges()} edges`);
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

    const degree = UDG.degree(stringToNumber);
    
    const message = degree !== undefined && degree !== 0 
        ? `vertex ${stringToNumber} have ${degree} degree`
        : `vertex ${stringToNumber} has no degree`

    console.log(message);
};

export default class UndirectedGraph extends Component {
    render() {
        return (
            <PageContainer template = {
                <div>
                    <div>
                        <p className = 'data-structure-description'>
                            An undirected graph is graph, i.e., a set of objects (called vertices or nodes) that are connected together, where all the edges 
                            are bidirectional. An undirected graph is sometimes called an undirected network. In contrast, a graph where the edges point in 
                            a direction is called a directed graph.
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
                        <button 
                            className = 'button-styles' 
                            onClick={() => { 
                                addEdge(this.inputAddEdgeFromRef.value.trim(), this.inputAddEdgeToRef.value.trim()); 
                                
                                this.inputAddEdgeFromRef.value = ''; 
                                this.inputAddEdgeToRef.value = '';
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
                        <button  className = 'button-styles' onClick={ () => vertices() }>Get count of vertices</button>
                        <button  className = 'button-styles' onClick={ () => edges() }>Get count of edges</button>
                   </div>
                </div>
              }
            />
        );
    };
};
