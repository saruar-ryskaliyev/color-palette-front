import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Make sure the path is correct
import './styles.css';

export default function Navbar() {
    const { user, logout } = useAuth(); 



    function handleLogout() {
        logout(); 
    }

    return (
        <nav className="nav">
            <Link to="/" className="site-title">Colorful</Link>
            <ul className="nav-list">
                <CustomLink to="/">Color Picker</CustomLink>
                <CustomLink to="/my-colors">My Colors</CustomLink>
                <CustomLink to="/my-palettes">My Palettes</CustomLink>
                <CustomLink to='/search'>Search</CustomLink>
                
                {user && (
                    <>
                        <CustomLink to={`/my-profile/${user.userId}`}>My Profile</CustomLink>
                        <CustomLink onClick={handleLogout} className="nav-list">Logout</CustomLink>
                    </>
                  
                )}

                
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
