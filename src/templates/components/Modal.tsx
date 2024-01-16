import styles from '../../styles/modules/modal.module.scss'
import { AddSection } from '.'

type ModalProps = {
  open: boolean;
  close: () => void;
  handleChanges: () => void;
}

type HandleData = (type: string, data: FormDataEntryValue) => void;

const Modal = ({open, close, handleChanges}:ModalProps) => {

  // Processes Data According To The Type Of Modifications We Got
  const handleData:HandleData = (type, data) => {
    switch(type) {
      // Adding Section
      case "Add Section":
        // Adding Section To The Form Content
        handleAddSection(data)
        break;
      default:
        break;
    }
  }

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
      <div style={{
        opacity: open ? 1 : 0
      }} onClick={e => e.stopPropagation()} className={styles.modal}>
        <AddSection close={close} handleData={handleData} />
      </div>
    </div>
  )
}

export default Modal