// React imports
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Close } from '@mui/icons-material';

// Style imports
import styles from './Topbar.module.scss';


// Topbar Component
const Topbar = () => {

  // Variables by useState
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
 * Toggles the mobile menu open/closed state
 * by inverting the current mobileMenuOpen boolean value
 */
  const toggleMobileMenu = () => {

    // Update the state to the opposite of its current value
    setMobileMenuOpen(!mobileMenuOpen);

  };

  // Return Component
  return (
    <header className={styles.topbar}>

      {/* Logo */}
      <div className={styles.left}>
        <span className={styles.logoText}>Cifras</span>
      </div>

      {/* Menu Hamburger (Mobile) */}
      <button 
        className={styles.menuToggle}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <Close fontSize="medium" />
        ) : (
          <Menu fontSize="medium" />
        )}
      </button>

      {/* Overlay for when the mobile menu is open*/}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={toggleMobileMenu} />
      )}

      {/* Main container */}
      <div className={`${styles.menuContainer} ${mobileMenuOpen ? styles.open : ''}`}>
        
        {/* Options menu */}
        <nav className={styles.center}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? styles.active : undefined}
            onClick={toggleMobileMenu}
          >
            Substituição
          </NavLink>
          <NavLink
            to="/transposition"
            className={({ isActive }) => isActive ? styles.active : undefined}
            onClick={toggleMobileMenu}
          >
            Transposição
          </NavLink>
          <NavLink
            to="/unic-key"
            className={({ isActive }) => isActive ? styles.active : undefined}
            onClick={toggleMobileMenu}
          >
            Chave Única
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

// Export Topbar
export default Topbar;