import React from 'react';
import Shadow from '../General/Shadow';
import Logo from '../Logo';
import Menu from '../Menu';
import css from './style.module.css';

const Sidebar = (props) => {
    let classes = [css.SideBar, css.Close];
    if(props.showSidebar){
        classes = [css.SideBar, css.Open];
    }
    return (
        <div>
            <Shadow show={props.showSidebar} darahad={props.toggleSideBar}/>
            <div onClick={props.toggleSideBar} className={classes.join(" ")}>        
                <div className={css.Logo}>
                    <Logo/>
                </div>
                <Menu/>
            </div>
        </div>
   );
};

export default Sidebar;