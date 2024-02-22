// Styles
import styles from '../../../styles/Default/modules/modal.module.scss'
// Hooks
import { useState } from 'react';
// Modal Components
import { AddSection, RemoveSection, RemoveComponent,AddComponent, TextEdit, FullNameEdit, GenderEdit, CountryEdit, YesOrNoEdit, ChoicesEdit } from '.'

const Modal = ({ open, close, addSection, removeSection, removeComponent, addText, addFullName, addGender, addCountry, addYesOrNo, addChoices }: ModalProps) => {

  /* --------------------------------------------------------- */
  /* Adding Changes And Calling Content Manipulation Functions */
  /* --------------------------------------------------------- */

  const handleSubmit = (type: HandleSubmitArgs) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    close();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    let action = type;
    if (typeof type != "string") {
      action = type[0]
    }

    switch (action) {
      case "Add Section":
        // Get Section Name
        let name;
        for (let [_, value] of data.entries()) {
          name = value as string;
        }
        // Call the function to add section name
        addSection(name!);
        break;
      case "Add Text":
        let textInputData: InputType = {};
        for (let [key, value] of data.entries()) {
          textInputData[key] = value;
        }
        addText(textInputData, +type[1])
        break;
      case "Add FullName":
        addFullName(type[2] as {[key:string]:string}, +type[1])
        break;
      case "Add Gender":
        addGender(type[2] as { [key: string]: string }, +type[1])
        break;
      case "Add Country":
        // Get Component Label
        let countryData: { [key: string]: string } = {};
        for (let [key, value] of data.entries()) {
          if (key == "inputTitle" || key == "isRequired") {
            countryData[key] = value as string
          }
        }
        if  (typeof type[2] == "string")
          countryData.defaultCountry = type[2]
        addCountry(countryData, +type[1])
        break;
      case "Add YesOrNo":
        addYesOrNo(type[2] as { [key: string]: string }, +type[1])
        break;
      case "Add Choices":
        addChoices(type[2] as { [key: string]: string }, +type[1])
        break;
      default:
        console.log("Data submission Error")
        break;
    }
  }
  
  /* ---------------------------------------- */
  /* Selecting A Component To Add To The Form */
  /* ---------------------------------------- */

  const [Component, setComponent] = useState<React.ElementType | "">("");

  const handleComponent = (component: string) => {
    setComponent((): any => {
      switch (component) {
        case "Text":
          return TextEdit
        case "FullName":
          return FullNameEdit
        case "Gender": 
          return GenderEdit
        case "Country":
          return CountryEdit
        case "YesOrNo":
          return YesOrNoEdit
        case "Choices":
          return ChoicesEdit
        default:
          return ""
      }
    })
  }

  return (
    <div
      style={{
        visibility: open[0] ? "visible" : "hidden",
        backgroundColor: `rgba(0,0,0,${open[0] ? 0.5 : 0})`,
        transition: "0.1s ease-out"
      }}
      onClick={close}
      className={styles.modalContainer}>
      <div style={{
        opacity: open[0] ? 1 : 0
      }} onClick={e => e.stopPropagation()} className={styles.modal}>
        {/* Rendering Components Based On
            The Content Manipulation Button Type */}
        {/* Add Section */}
        {open[0] == "AddSection" && <AddSection close={close} handleSubmit={handleSubmit} />}
        {/* Remove Section */}
        {open[0] == "RemoveSection" && <RemoveSection close={close} sectionName={open[1]} sectionID={+open[2]} handleRemove={removeSection} />}
        {/* Select Component to Add */}
        {open[0] == "AddComponent" && Component == "" && <AddComponent setComponent={handleComponent} />}
        {/* Remove Component */}
        {open[0] == "RemoveComponent" && <RemoveComponent close={close} handleRemove={removeComponent} sectionID={+open[3]} componentType={open[1]} componentID={+open[2]} />}
        {/* Add Text Input Component */}
        {open[0] == "AddComponent" && Component != "" && <Component sectionID={+open[1]} handleSubmit={handleSubmit} back={handleComponent} />}
      </div>
    </div>
  )
}

export default Modal