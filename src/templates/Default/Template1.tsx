// Styles
import styles from '../../styles/Default//modules/template1.module.scss'
// Component Styles
import { textStyles, fullNameStyles, genderStyles, countryStyles } from '../../styles/Default/modules';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
// Components
import { Modal, Text, FullName, Gender, Country } from './components';
// Hooks
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
  const handleOpen = (type: any[]) => {
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
  const handleAddSection = (sectionName: string) => {
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections, [sectionName, prev.sections.length, []]],
    }));
  }

  // Remove Section By Section ID
  const handleRemoveSection = (sectionID: number) => {
    setContent((prev: any) => ({
      ...prev,
      sections: [...prev.sections.filter((s: any[]) => s[1] != sectionID)]
    }))
  }

  // Remove Component
  const handleRemoveComponent = (sectionID: number, componentID: number) => {
    setContent((prev: any) => {
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

  // Add Component - Main Behavior
  const handleAddComponent = (type: string, inputData: InputType, sectionID: number) => {
    setContent((prev: any) => {
      // Deep Copy The Content Object
      let copy = JSON.parse(JSON.stringify(prev));
      // Find the Section By Its ID
      for (let i = 0; i < copy.sections.length; i++) {
        if (copy.sections[i][1] == sectionID) {
          // Add The Text Input To That Section
          copy.sections[i][2] = [...copy.sections[i][2], [type, inputData]]
          break;
        }
      }
      // Return The New Object
      return copy;
    })
  }

  // Add Text Input Component
  const handleAddText = (inputData: InputType, sectionID: number) => {
    handleAddComponent("textInput", inputData, sectionID)
  }

  // Add Full Name Input
  const handleAddFullName = (inputData: InputType, sectionID: number) => {
    handleAddComponent("fullNameInput", inputData, sectionID)
  }

  // Add Gender Input
  const handleAddGender = (inputData: InputType, sectionID: number) => {
    handleAddComponent("genderInput", inputData, sectionID)
  }

  // Add Country Input
  const handleAddCountry = (inputData:InputType, sectionID:number) => {
    handleAddComponent("countryInput", inputData, sectionID)
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
        addGender={handleAddGender}
        addCountry={handleAddCountry} />
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
          {content.sections?.map((section: any) =>
            <section className={styles.section} key={section[1]}>
              <div className={styles.sectionHeaderContainer}>
                {/* Section Name */}
                <h2>{section[0]}</h2>
                {/* Delete Section */}
                <button onClick={() => handleOpen(["RemoveSection", section[0], section[1]])} className={styles.removeSection}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
                </button>
              </div>
              <div className={styles.inputsContainer}>
                {/* Rendering Components */}
                {section[2].map((component: any, i: number) =>
                  <div className={styles.inputContainer}>
                    {/* Text Input Field */}
                    {component[0] == "textInput" &&
                      <Text 
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        styles={textStyles}
                        key={`text-${i}`}
                      />
                    }
                    {/* Full Name Input Field */}
                    {component[0] == "fullNameInput" &&
                      <FullName
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        styles={fullNameStyles}
                        key={`fullName-${i}`}
                      />
                    }
                    {/* Gender Input Field */}
                    {component[0] == "genderInput" &&
                      <Gender
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        styles={genderStyles}
                        key={`gender-${i}`}
                      />
                    }
                    {
                      component[0] == "countryInput" &&
                      <Country 
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        key={`country-${i}`}
                        styles={countryStyles}
                      />
                    }
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