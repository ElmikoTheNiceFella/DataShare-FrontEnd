// Styles
import styles from '../../styles/modules/modal.module.scss'
// Hooks
import { useState } from 'react';
// Modal Components
import { AddSection, RemoveSection, AddComponent, TextEdit } from '.'

// Types
type ModalProps = {
  open: string[];
  close: () => void;
  addSection: (sectionName: string) => void;
  removeSection: (id: number) => void;
  addText: (inputData: InputType, sectionID: number) => void;
}
type InputType = { [key: string]: FormDataEntryValue };
type HandleSubmitArgs = string | [string, number];

const Modal = ({ open, close, addSection, removeSection, addText }: ModalProps) => {

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
        let inputData: InputType = {};
        for (let [key, value] of data.entries()) {
          inputData[key] = value;
        }
        addText(inputData, +type[1])
        break;
      default:
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
        {/* Add Text Input Component */}
        {open[0] == "AddComponent" && Component != "" && <Component sectionID={+open[1]} handleSubmit={handleSubmit} back={handleComponent} />}
      </div>
    </div>
  )
}

export default Modal