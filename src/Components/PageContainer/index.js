import React from 'react';

import Menu from '../Menu';
import Header from '../Header';

const PageContainer = ({ template }) => (
    <div className = 'page-container-wrapper'>
        <Header />
        <Menu />
        <div className='template'>
            { template }
        </div>
    </div>
);

export default PageContainer;
