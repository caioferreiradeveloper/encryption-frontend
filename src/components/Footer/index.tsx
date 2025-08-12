// React imports
import { Link } from 'react-router-dom'

// Style imports
import styles from './Footer.module.scss'


// Footer Component
const Footer = () => {

  // Return Component
  return (

    // Footer
    <footer className={styles.footer}>

        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} AutoBridge. Todos os direitos reservados.</p>

        {/* Links */}
        <div className={styles.links}>
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
          <Link to="/contato">Contato</Link>
        </div>

    </footer>
  )
}

// Export Footer
export default Footer


