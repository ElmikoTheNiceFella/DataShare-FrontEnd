// Styles
import styles from '../styles/modules/template1.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// Components
import { Modal } from './components';
import { useCallback, useState } from 'react';

const Template1 = () => {

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>({
    sections: []
  });

  /* Modal Functions */

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    // setContent(content => content.)
  };

  // Content Manipulation

  /* Add Section */

  const handleAddSection = useCallback((sectionName:string) => {
    console.log(content);
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections, [sectionName, prev.sections.length, {}]],
    }));
    console.log(content)
  }, [setContent])

  const demoDesc = `
Hello Students, Get ready for something epic – Festival, happening on X DATE!
It's your chance to represent your country, showcase your culture and make awesome memories in the process!
Whether you're a performer, leader, or volunteer, we've got a spot for you.
Let's make this festival legendary together!`

  return (
    <>
      {/* Modal */}
      <Modal 
        open={open} 
        close={handleClose} 
        addSection={handleAddSection} />
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
          {content.sections?.map((section:any) => 
            <section className={styles.section} key={section[1]}>
              <h2>{section[0]}</h2>
            </section>
          )}
          <button onClick={() => handleOpen()} className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
        </form>
      </main>
      <footer>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default Template1