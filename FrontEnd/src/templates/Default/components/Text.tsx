import localStyles from '../../../styles/Default/modules/text.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

// Text Element
export const Text = ({styles, component, position, section, open}:ComponentProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={`text-input-${position + 1}`}>{component[1].inputTitle}
        {component[1].isRequired &&
          <span style={{
            color: "red"
          }}>*</span>}
      </label>
      <button type='button' onClick={() => open(["RemoveComponent", component[0], position, section[1]])} className={styles.removeSection}>
        <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
      </button>
      <input type="text" id={`text-input-${position + 1}`} placeholder={component[1].inputPlaceholder} />
    </div>
  )
}

// Editing The Text Element
export const TextEdit = ({back, sectionID, handleSubmit}:TextEditProps) => {
  return (
    <form onSubmit={handleSubmit(["Add Text", sectionID])}>
      <div className={localStyles.header}>
        <h2>Text Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <div className={localStyles.inputsContainer}>
        <input name='inputTitle' placeholder='Input Title' type="text" />
        <input name='inputPlaceholder' placeholder='Input Placeholder' type="text" />
      </div>
      <input id='required' name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}