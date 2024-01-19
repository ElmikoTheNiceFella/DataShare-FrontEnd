// Styles
import styles from '../styles/modules/template1.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// Components
import { Modal } from './components';
import { useCallback, useState } from 'react';

type InputType = { [key: string]: FormDataEntryValue };

const Template1 = () => {

  const [open, setOpen] = useState([""]);
  const [content, setContent] = useState<any>({
    sections: []
  });

  /* Modal Functions */

  const handleOpen = (type:any[]) => {
    setOpen(type);
  }

  const handleClose = () => {
    setOpen([""])
    // setContent(content => content.)
  };

  // Content Manipulation

  /* Add Section */

  const handleAddSection = useCallback((sectionName:string) => {
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections, [sectionName, prev.sections.length, []]],
    }));
  }, [setContent])

  /* Remove Section */
  const handleRemoveSection = useCallback((sectionID:number) => {
    setContent((prev:any) => ({
      ...prev,
      sections: [...prev.sections.filter((s:any[]) => s[1] != sectionID)]
    }))
  }, [setContent])

  /* Add Text Input */
  const handleAddText = useCallback((inputData:InputType, sectionID:number) => {
    console.log(
      inputData,
      sectionID,
      content
    )
    setContent((prev:any) => {
      // Copy Previous Element
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section ID
      for(let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Text Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], ["textInput", inputData]]
        }
      }
      return copy;
    })
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
        addSection={handleAddSection}
        removeSection={handleRemoveSection}
        addText={handleAddText} />
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
              <div className={styles.sectionHeaderContainer}>
                <h2>{section[0]}</h2>
                <button onClick={() => handleOpen(["RemoveSection", section[0],section[1]])} className={styles.removeSection}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
                </button>
              </div>
              <div className={styles.inputsContainer}>
                {section[2].map((component:any) => {
                  {
                    component[0] == "textInput" &&
                    <>
                      <p>{component[1].inputTitle}</p>
                      <p>{component[1].inputPlaceholder}</p>
                      <p>{component[1].isRequired}</p>
                    </>
                  }
                })}
              </div>
              <button onClick={() => handleOpen(["AddComponent", section[1]])} className={styles.addComponent}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Component</button>
            </section>
          )}
          <button onClick={() => handleOpen(["AddSection"])} className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
        </form>
      </main>
      <footer>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default Template1