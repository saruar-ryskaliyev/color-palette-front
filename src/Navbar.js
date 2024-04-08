import { Link, useMatch, useResolvedPath  } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <Link href="/" className="site-title"> Colorful</Link>
        <ul className="nav-list">
            <CustomLink to="/">Color Picker</CustomLink>
            <CustomLink to="/my-colors">My Colors</CustomLink>
            <CustomLink to="/my-palettes">My Palettes</CustomLink>
        </ul>
    </nav>
}



function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}