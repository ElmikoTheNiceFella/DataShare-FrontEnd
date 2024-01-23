// Styles
import styles from '../styles/modules/template1.module.scss'
// Component Styles
import { textStyles, fullNameStyles, genderStyles } from '../styles/modules';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// Components
import { Modal } from './components';
import { useState } from 'react';

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
  const handleAddSection = (sectionName:string) => {
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections, [sectionName, prev.sections.length, []]],
    }));
  }

  // Remove Section By Section ID
  const handleRemoveSection = (sectionID:number) => {
    setContent((prev:any) => ({
      ...prev,
      sections: [...prev.sections.filter((s:any[]) => s[1] != sectionID)]
    }))
  }

  // Remove Component
  const handleRemoveComponent = (sectionID:number ,componentID:number) => {
    setContent((prev:any) => {
      // Deep Copy The Content Object
      let copy = JSON.parse(JSON.stringify(prev))
      // Traverse And Find The Section
      for (let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Remove The Component From The Section
          copy.sections[i][2].splice(componentID, 1)
          break;
        }
      }
      // Return The New Object
      return copy
    })
  }

  // Add Text Input Component
  const handleAddText = (inputData:InputType, sectionID:number) => {
    setContent((prev:any) => {
      // Deep Copy The Content Object
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section By Its ID
      for(let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Text Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], ["textInput", inputData]]
          break;
        }
      }
      // Return The New Object
      return copy;
    })
  }

  const handleAddFullName = (inputData: InputType, sectionID: number) => {
    setContent((prev: any) => {
      // Deep Copy The Content Object
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section By Its ID
      for (let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Full Name Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], ["fullNameInput", inputData]]
          break;
        }
      }
      // Return The New Object
      return copy;
    })
  }

  const handleAddGender = (inputData: InputType, sectionID: number) => {
    setContent((prev: any) => {
      // Deep Copy The Content Object
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section By Its ID
      for (let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Gender Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], ["genderInput", inputData]]
          break;
        }
      }
      // Return The New Object
      return copy;
    })
  }

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
        removeComponent={handleRemoveComponent}
        addText={handleAddText}
        addFullName={handleAddFullName}
        addGender={handleAddGender} />
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
                    <div className={styles.inputContainer}>
                    {/* Text Input Field */}
                      {component[0] == "textInput" &&
                        <div className={textStyles.inputContainer}>
                          <label htmlFor={`text-input-${i+1}`}>{component[1].inputTitle}
                          {component[1].isRequired && 
                            <span style={{
                              color: "red"
                            }}>*</span>}
                          </label>
                          <button onClick={() => handleOpen(["RemoveComponent", component[0], i, section[1]])} className={styles.removeSection}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
                          </button>
                          <input type="text" id={`text-input-${i + 1}`} placeholder={component[1].inputPlaceholder} />
                        </div>
                      }
                      {component[0] == "fullNameInput" &&
                        <div className={fullNameStyles.inputContainer}>
                          <div>
                            <label htmlFor={`first-name-input-${i + 1}`}>{component[1].firstNameTitle}
                              {component[1].isRequired &&
                                <span style={{
                                  color: "red"
                                }}>*</span>}
                            </label>
                            <input type="text" id={`first-name-input-${i + 1}`} placeholder={component[1].firstNamePH} />
                          </div>
                          <div>
                            <label htmlFor={`last-name-input-${i + 1}`}>{component[1].lastNameTitle}
                              {component[1].isRequired &&
                                <span style={{
                                  color: "red"
                                }}>*</span>}
                            </label>
                            <button onClick={() => handleOpen(["RemoveComponent", component[0], i, section[1]])} className={styles.removeSection}>
                              <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
                            </button>
                            <input type="text" id={`last-name-input-${i + 1}`} placeholder={component[1].lastNamePH} />
                          </div>
                        </div>
                      }
                      {component[0] == "genderInput" && 
                      <div className={genderStyles.inputContainer}>
                        <h3 className={genderStyles.title}>Gender</h3>
                        <div>
                          <label htmlFor={`gender-input-male-${i + 1}`}>
                            {component[1].male}
                          </label>
                          <input type="radio" name='gender' />
                        </div>
                        <div>
                          <label htmlFor={`gender-input-female-${i + 1}`}>
                            {component[1].female}
                          </label>
                          <input type="radio" name='gender' />
                        </div>
                      </div>}
                    </div>
                )}
              </div>
              <button onClick={() => handleOpen(["AddComponent", section[1]])} className={styles.addComponent}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Component</button>
            </section>
          )}
          {/* Adding Section */}
          <button onClick={() => handleOpen(["AddSection"])} className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
          {/* DEBUG BUTTON (IGNORE) */}
          {/* <button onClick={() => console.log(content)} className={styles.addSection}>LOG CONTENT</button> */}
        </form>
      </main>
      <footer>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default Template1