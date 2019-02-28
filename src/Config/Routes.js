import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './../Pages/Home';
import Stack from './../Pages/Stack';
import Queue from './../Pages/Queue';
import BinaryTree from './../Pages/BinaryTree';
import HashTable from './../Pages/HashTable';
import UndirectedGraph from './../Pages/UndirectedGraph';
import DirectedGraph from './../Pages/DirectedGraph';
import EdgeWeightedGraph from './../Pages/EdgeWeightedGraph';
import MergeSort from './../Pages/MergeSort';

import history from './History';

const Routes = () => (
    <Router history = { history } >
        <Switch>
            <Route exact path = '/' component = { Home } />
            <Route path = '/stack' component = { Stack } />
            <Route path = '/queue' component = { Queue } />
            <Route exact path = '/binary-tree' component = { BinaryTree } />
            <Route path = '/hash-table' component = { HashTable } />
            <Route path = '/undirected-graph' component = { UndirectedGraph } />
            <Route exact path = '/directed-graph' component = { DirectedGraph } />
            <Route path = '/edge-weighted-graph' component = { EdgeWeightedGraph } />
            <Route path = '/merge-sort' component = { MergeSort } />
            <Redirect to = '/' />
        </Switch>
    </Router>
);

export default Routes;
