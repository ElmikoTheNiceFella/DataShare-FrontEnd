import styles from '../../styles/modules/modal.module.scss'
import {useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { AddSection } from '.'

type ModalProps = {
  open: boolean;
  close: () => void;
  type: string;
  handleChanges: (type:string, content:{[key:string]:any}) => void;
}

const handleType = (type:string) => {
  switch(type) {
    case 'addSection':
      return {name: 'Add Section', properties: {
        placeholder: 'Section Name',
        id: 'add-section'
      }}
    default:
      return {name: 'Error'}
  }
}

const Modal = ({open, close, type, handleChanges}:ModalProps) => {

  const values = useMemo(() => handleType(type), [type])

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    let result:{[key:string]:any} = {};
    switch(type) {
      case 'addSection':
        result.newSection = data;
        break;
      default:
        break;
    }
    console.log(data.entries())
    console.log(result)
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
        <form onSubmit={handleSubmit}>
          <button onClick={close} className={styles.close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {/* Name */}
          <h2>{values.name}</h2>
          {/* Properties */}
          <div className={styles.inputContainer}>
            <input type='text' name={values.properties?.id} className={styles.modalTextInput} id={values.properties?.id} />
            <label className={styles.modalInputPlaceholder} htmlFor={values.properties?.id}>{values.properties?.placeholder}</label>
          </div>
          <button type='submit' className={styles.submit}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default Modal