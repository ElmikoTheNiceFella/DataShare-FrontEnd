import styles from '../../styles/modules/modal.module.scss'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type AddSectionProps = {
  close: () => void;
  handleData: (type: string, data: {}) => void;
}

const AddSection = ({close, handleData}:AddSectionProps) => {

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    
    let result: { [key: string]:  {}} = {};

    for (let [_, value] of data.entries()) {
      result[value as string] = {};
    }

    handleData('Add Section', result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={close} className={styles.close}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {/* Name */}
      <h2>Add Section</h2>
      {/* Properties */}
      <div className={styles.inputContainer}>
        <input type='text' name='new-section' className={styles.modalTextInput} id='new-section-input' />
        <label className={styles.modalInputPlaceholder} htmlFor='new-section-input'>Section Name</label>
      </div>
      <button type='submit' className={styles.submit}>Save Changes</button>
    </form>
  )
}

export default AddSection