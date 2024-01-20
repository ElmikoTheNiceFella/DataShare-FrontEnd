// Styles
import styles from '../styles/modules/template1.module.scss'
// Component Styles
import { textStyles } from '../styles/modules';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// Components
import { Modal } from './components';
import { useCallback, useState, useEffect } from 'react';

// Types
type InputType = { [key: string]: FormDataEntryValue };

const Template1 = () => {

  /* ------------ */
  /* Form Content */
  /* ------------ */
  
  const [content, setContent] = useState<any>({
    sections: []
  });
  
  /* --------------- */
  /* Modal Functions */
  /* --------------- */
  
  const [open, setOpen] = useState([""]);

  // Open Modal
  const handleOpen = (type:any[]) => {
    setOpen(type);
  }

  // Close Modal
  const handleClose = () => {
    setOpen([""])
  };

  /* -------------------- */
  /* Content Manipulation */
  /* -------------------- */

  // Add New Section
  const handleAddSection = useCallback((sectionName:string) => {
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections, [sectionName, prev.sections.length, []]],
    }));
  }, [content])

  // Remove Section By Section ID
  const handleRemoveSection = useCallback((sectionID:number) => {
    setContent((prev:any) => ({
      ...prev,
      sections: [...prev.sections.filter((s:any[]) => s[1] != sectionID)]
    }))
  }, [content])

  // Add Text Input Component
  const handleAddText = useCallback((inputData:InputType, sectionID:number) => {
    setContent((prev:any) => {
      // Copy Previous Content
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section By Its ID
      for(let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Text Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], ["textInput", inputData]]
        }
      }
      // Return The New Object
      return copy;
    })
  }, [content])

  /* --------- */
  /* DEMO DATA */
  /* --------- */
  
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
        {/* Form Description */}
        <p className={styles.description}>{demoDesc}</p>
        {/* Form Container */}
        <form className={styles.componentsContainer} action="#">
          {/* Render Sections */}
          {content.sections?.map((section:any) => 
            <section className={styles.section} key={section[1]}>
              <div className={styles.sectionHeaderContainer}>
                {/* Section Name */}
                <h2>{section[0]}</h2>
                {/* Delete Section */}
                <button onClick={() => handleOpen(["RemoveSection", section[0],section[1]])} className={styles.removeSection}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
                </button>
              </div>
              <div className={styles.inputsContainer}>
                {/* Rendering Components */}
                {section[2].map((component:any, i:number) => 
                    <>
                    {/* Text Input Field */}
                      {component[0] == "textInput" &&
                      <div className={styles.textInputContainer}>
                        <label htmlFor={`${i}`}>{component[1].inputTitle}
                        <span style={{ 
                          color: "red",
                          display: component[1].isRequired == "on" ? "inline" : "none" }}>*</span>
                        </label>
                        <input type="text" placeholder={component[1].inputPlaceholder} />
                      </div>
                      }
                    </>
                )}
              </div>
              <button onClick={() => handleOpen(["AddComponent", section[1]])} className={styles.addComponent}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Component</button>
            </section>
          )}
          {/* Adding Section */}
          <button onClick={() => handleOpen(["AddSection"])} className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
          {/* DEBUG BUTTON (IGNORE) */}
          <button onClick={() => console.log(content)} className={styles.addSection}>LOG CONTENT</button>
        </form>
      </main>
      <footer>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default Template1