// React imports
import { Outlet } from "react-router-dom";

// Component imports
import Topbar from "./Topbar";

// Style imports
import styles from './AnonymousLayout.module.scss';

// Export AnonymousLayout Layout
export default function AnonymousLayout() {

  // Return Layout
  return (
    <div className={styles.anonymousLayout}>

      {/* Header */}
      <header>
        <Topbar />
      </header>

      {/* Body */}
      <main>
        <Outlet />
      </main>
      
    </div>
  )

}