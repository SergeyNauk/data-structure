import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Accordion } from 'react-burger-menu';

import { menuStyles } from './configMenu';
import { Links } from './links';

const Menu = () => (
	<Accordion styles={ menuStyles }>
		{ Links.map((item, idx) => (
              <Link 
                key = {idx} 
                className='menu-item' 
                to={ item.path }
              >
                <p>{ item.name }</p>
              </Link>  
            ) 
        )}
	</Accordion>
);

export default Menu;
