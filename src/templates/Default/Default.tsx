// Styles
import styles from '../../styles/Default/modules/default.module.scss'
// Component Styles
import { textStyles, fullNameStyles, binaryStyles, countryStyles, choicesStyles } from '../../styles/Default/modules';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import FM_LOGO from '../../../public/FormMaker.png'
// Components
import { Modal, Text, FullName, Gender, Country, YesOrNo } from './components';
// Hooks
import { useState, useEffect } from 'react';
// Demo Data
import { demoDesc } from '../../../demoData'
import { Choices } from './components/Choices';

const Default = () => {

  /* ------------ */
  /* Form Content */
  /* ------------ */

  const [content, setContent] = useState<any>({
    template: "default",
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
  const handleAddCountry = (inputData: InputType, sectionID: number) => {
    handleAddComponent("countryInput", inputData, sectionID)
  }

  // Add YesOrNo Input
  const handleAddYesOrNo = (inputData: InputType, sectionID: number) => {
    handleAddComponent("yesOrNoInput", inputData, sectionID)
  }

  // Add Choices
  const handleAddChoices = (inputData: InputType, sectionID: number) => {
    handleAddComponent("choicesInput", inputData, sectionID)
  }
  // Saving Changes
  useEffect(() => {
    window.localStorage.setItem('FORM_CONTENT', JSON.stringify(content))
  }, [content])

  // Getting Data After Refreshing
  useEffect(() => {
    const data = window.localStorage.getItem('FORM_CONTENT')
    console.log(data)
  }, [])

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
        addCountry={handleAddCountry}
        addYesOrNo={handleAddYesOrNo}
        addChoices={handleAddChoices} />
      <header className={styles.header}>
        {/* LOGO */}
        <div className={styles.logoContainer}>
          <div className={styles.demoLogo}>
            <img src={FM_LOGO} alt="" />
          </div>
        </div>
        {/* Form Title */}
        <h1 className={styles.formTitle}>
          Festival of Cultures
        </h1>
      </header>
      <main style={{
        height: open[0] ? "calc(100vh - 150px)" : "auto"
      }} className={styles.formContainer}>
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
                <button type='button' onClick={() => handleOpen(["RemoveSection", section[0], section[1]])} className={styles.removeSection}>
                  <FontAwesomeIcon type='button' icon={faTrash} style={{ color: "#1C1D1E" }} />
                </button>
              </div>
              <div className={styles.inputsContainer}>
                {/* Rendering Components */}
                {section[2].map((component: any, i: number) =>
                  <div key={i} className={styles.inputContainer}>
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
                        styles={binaryStyles}
                        key={`gender-${i}`}
                      />
                    }
                    {/* Country Input Field */}
                    {component[0] == "countryInput" &&
                      <Country
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        key={`country-${i}`}
                        styles={countryStyles}
                      />
                    }
                    {/* Yes or No Input Field */}
                    {component[0] == "yesOrNoInput" &&
                      <YesOrNo
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        styles={binaryStyles}
                        key={`yes-or-no-${i}`}
                      />
                    }
                    {/* Choices Input Field */}
                    {component[0] == "choicesInput" &&
                      <Choices
                        component={component}
                        open={handleOpen}
                        position={i}
                        section={section}
                        styles={choicesStyles}
                        key={`choices-${i}`}
                      />
                    }
                  </div>
                )}
              </div>
              <button type='button' onClick={() => handleOpen(["AddComponent", section[1]])} className={styles.addComponent}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Component</button>
            </section>
          )}
          {/* Add Section */}
          <button type='button' onClick={() => handleOpen(["AddSection"])} className={styles.addSection}><FontAwesomeIcon icon={faPlus} />&nbsp;Add Section</button>
          {/* DEBUG BUTTON (IGNORE) */}
          {/* <button onClick={() => console.log(content)} className={styles.addSection}>LOG CONTENT</button> */}
        </form>
      </main>
      <footer>
        {/* Copyright (empty for now) */}
      </footer>
    </>
  )
}

export default Default