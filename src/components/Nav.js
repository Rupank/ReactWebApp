import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav-list">
                    <Link className="link" to={"/"}>
                        <li >Home</li>
                    </Link>
                    <Link className="link" to={"/about"}>
                        <li>About Page</li>
                    </Link>
                    <Link className="link" to={"/scroll"}>
                        <li>Infinite Scroller</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default Nav
