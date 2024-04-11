import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './styles.css';

export default function Navbar() {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    function handleLogout(event) {
        event.stopPropagation();
        logout();
        navigate('/login');

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
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-button">Logout</button>
                        </li>
                        
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
