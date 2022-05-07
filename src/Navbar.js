import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();


// leaving this in (commented) for now, as can repurpose later to browse by nation/attribute
  // _renderGameLink = (gameID) => {
  //   return (
  //     <li>
  //       <Link id={gameID} to={`/${gameID}`}>{this.props.gamesConfig[gameID].name}</Link>
  //     </li>
  //   )
  // }

  const logoutWithRedirect = () => logout({
      returnTo: (
            window.location.origin.includes('localhost')
          ? window.location.origin
          : 'https://asukii314.github.io/sn-suit-reference'
      )
  });

  const renderWishlistBtn = () => {
      if(user?.sub) {
          return (<li><a href={`#/wishlist/${user.sub}`} onClick={() => setMenuOpen(false)}>Wishlist</a></li>)
      }
      return (<li><a href='' onClick={() => {loginWithRedirect(); setMenuOpen(false);}}>Wishlist</a></li>)
  }

  const renderClosetBtn = () => {
      if(user?.sub) {
          return (<li><a href={`#/closet/${user.sub}`} onClick={() => setMenuOpen(false)}>Closet</a></li>)
      }
      return (<li><a href='' onClick={() => {loginWithRedirect(); setMenuOpen(false);}}>Closet</a></li>)
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <div>
            {menuOpen && <div className='menu-open-background' onClick={() => setMenuOpen(false)}></div>}
            <nav role='navigation' className={menuOpen ? 'open' : ''}>
                <b>
                    <img className='mobile-hamburger-menu' src='./menu.png' onClick={toggleMenu} />
                    SN Suit Reference
                </b>
                <ul>
                    <li><a href="#/" onClick={() => setMenuOpen(false)}>All Suits</a></li>
                    {/*<li><a>Games</a>
                    <ul>
                      {Object.keys(this.props.gamesConfig).map(this._renderGameLink)}
                    </ul>
                    </li>*/}
                    {renderWishlistBtn()}
                    {renderClosetBtn()}
                    <li><a href="#/credits" onClick={() => setMenuOpen(false)}>Credits</a></li>
                    <li><a href="#/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                    <li><a href="#/privacy" onClick={() => setMenuOpen(false)}>Privacy</a></li>
                    <li><a href="https://ko-fi.com/asukii" target="_blank" onClick={() => setMenuOpen(false)}>Donate</a></li>
                    {!isAuthenticated && <li><a href='' onClick={() => {loginWithRedirect(); setMenuOpen(false);}}>Log In</a></li>}
                    {isAuthenticated && <li><a onClick={() => {logoutWithRedirect(); setMenuOpen(false);}}>Log Out</a></li>}
                </ul>
            </nav>
        </div>
    );
}
