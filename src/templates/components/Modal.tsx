import styles from '../../styles/modules/modal.module.scss'
import { useState } from 'react';
import { AddSection, RemoveSection, AddComponent, TextEdit } from '.'

type ModalProps = {
  open: string[];
  close: () => void;
  addSection: (sectionName: string) => void;
  removeSection: (id: number) => void;
  addText: (inputData:InputType, sectionID:number) => void;
}
type InputType = { [key: string]: FormDataEntryValue };
type HandleSubmitArgs = string | [string, number];

// type HandleData = (type: string, data: FormDataEntryValue) => void;

const Modal = ({open, close, addSection, removeSection, addText}:ModalProps) => {
  // Submitting A Form
  const handleSubmit = (type:HandleSubmitArgs) => (e:React.SyntheticEvent) => {
    e.preventDefault();
    close();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    let action = type;
    if(typeof type != "string") {
      action = type[0]
    }

    switch(action) {
      case "Add Section":
        // Get Section Name
        let name;
        for(let [_,value] of data.entries()) {
          name = value as string;
        }
        // Call the function to add section name
        addSection(name!);
        break;
      case "Add Text":
        let inputData:InputType = {};
        for (let [key, value] of data.entries()) {
          inputData[key] = value;
        }
        console.log(inputData)
        addText(inputData, +type[1])
        break;
      default:
        break;
    }
  }

  // Rendering The Component
  const [Component, setComponent] = useState<React.ElementType|"">("");

  const handleComponent = (component:string) => {
    setComponent(():any => {
      switch(component) {
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
        {open[0] == "AddSection" && <AddSection close={close} handleSubmit={handleSubmit} />}
        {open[0] == "RemoveSection" && <RemoveSection close={close} sectionName={open[1]} sectionID={+open[2]} handleRemove={removeSection} />}
        {open[0] == "AddComponent" && Component == "" && <AddComponent setComponent={handleComponent} />}
        {open[0] == "AddComponent" && Component != "" && <Component sectionID={+open[1]} handleSubmit={handleSubmit} back={handleComponent} />}
      </div>
    </div>
  )
}

export default Modal