import styles from '../../styles/modules/modal.module.scss'
import {useState, useEffect, useMemo} from 'react'

type ModalProps = {
  open: boolean;
  close: () => void;
  type: string;
}

const handleType = (type:string) => {
  
}

const Modal = ({open, close, type}:ModalProps) => {

  const values = useMemo(() => handleType(type), [type])

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

      </div>
    </div>
  )
}

export default Modal