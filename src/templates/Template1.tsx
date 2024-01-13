// Styles
import styles from '../styles/modules/template1.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Template1 = () => {

  const demoDesc = `
Hello UDST Students, Get ready for something epic – Festival of Cultures, happening on March 7 & 8, 2024!
It's your chance to represent your country, showcase your culture and make awesome memories in the process!
Whether you're a performer, leader, or volunteer, we've got a spot for you.
    Let's make Festival of Cultures 2024 legendary together!`

  return (
    <>
      <header className={styles.header}>
        {/* LOGO */}
        <div className={styles.logoContainer}>
          <div className={styles.demoLogo}></div>
        </div>
        {/* Form Title */}
        <h1 className={styles.formTitle}>
          Festival of Cultures
        </h1>
      </header>
      <main className={styles.formContainer}>
        {/* Form Container */}
        <p className={styles.description}>{demoDesc}</p>
        <form className={styles.componentsContainer} action="#">
          <button className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
        </form>
      </main>
      <footer>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default Template1