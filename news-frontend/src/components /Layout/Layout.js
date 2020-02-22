import React, {Fragment} from 'react';
import './Layout.css'
const Layout = props => (
    <Fragment>
        <header className='border-bottom mt-3 pb-3 pl-5'>News</header>

        <main>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;