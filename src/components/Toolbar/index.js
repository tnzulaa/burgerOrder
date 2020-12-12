import React from 'react';
import styles from './style.module.css';
import Logo from '../Logo';
import Menu from '../Menu';
import HamburgerMenu from '../HamburgerMenu';

const Toolbar = (props) => <header className={styles.Toolbar}>
    <HamburgerMenu toggleSideBar={props.toggleSideBar}/>
    <Logo/>
    <nav className={CSS.HideOnMobile}>
        <Menu/>
    </nav>
    </header>;

export default Toolbar;