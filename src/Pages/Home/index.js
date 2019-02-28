import React from 'react';

import PageContainer from '../../Components/PageContainer';

const Home = () => (
    <PageContainer template = {
        <div className='home-wrapper'>
            <span>Hi friends, you are using the database structures Illustrator program.</span> 
            <span> Clicking on the links in the menu you get to the component "telling" and "showing" the work of a certain database structure.</span> 
            <span><strong>Important !</strong><br/>In order to save program development time, the result is displayed in the console log. 
            Well, no offense to that :)
            </span>
        </div>
    } />
);

export default Home;