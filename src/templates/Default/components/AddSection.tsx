import styles from '../../../styles/Default/modules/modal.module.scss'
import localStyles from '../../../styles/Default/modules/addSection.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const AddSection = ({close, handleSubmit}:AddSectionProps) => {

  const [input, setInput] = useState("")

  return (
    <form onSubmit={handleSubmit('Add Section')}>
      <button type='button' onClick={close} className={styles.close}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {/* Name */}
      <h2>Add Section</h2>
      {/* Properties */}
      <div className={localStyles.inputContainer}>
        <input value={input} onChange={e => setInput(e.target.value)} required type='text' name='new-section' className={localStyles.modalTextInput} id='new-section-input' />
        <label className={localStyles.modalInputPlaceholder} htmlFor='new-section-input'>Section Name</label>
      </div>
      <button type='submit' disabled={!input} className={styles.submit}>Save Changes</button>
    </form>
  )
}

export default AddSection