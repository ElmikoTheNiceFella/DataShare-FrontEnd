import styles from '../../styles/modules/modal.module.scss'
import {useState, useEffect, useMemo} from 'react'

type ModalProps = {
  open: boolean;
  close: () => void;
  type: string;
  // changeContent: (type:string, content:{[key:string]:any}) => void;
}

const handleType = (type:string) => {
  switch(type) {
    case 'addSection':
      return {name: 'Edit Section', properties: {
        placeholder: 'Section Name',
        id: 'add-section'
      }}
    default:
      return {name: 'Error'}
  }
}

const Modal = ({open, close, type}:ModalProps) => {

  const values = useMemo(() => handleType(type), [type])

  // const handleChange = () => changeContent(type, )

  return (
    <div
      style={{
        visibility: open ? "visible" : "hidden",
        backgroundColor: `rgba(0,0,0,${open ? 0.5 : 0})`,
        transition: "0.1s ease-out"
      }} 
      onClick={close}
      className={styles.modalContainer}>
      <div onClick={e => e.stopPropagation()} className={styles.modal}>
        {/* Name */}
        <h2>{values.name}</h2>
        {/* Properties */}
        <div className={styles.inputContainer}>
          <input type='text' className={styles.modalTextInput} id={values.properties?.id} />
          <label className={styles.modalInputPlaceholder} htmlFor={values.properties?.id}>{values.properties?.placeholder}</label>
        </div>
        <button className={styles.submit}>Save Changes</button>
      </div>
    </div>
  )
}

export default Modal