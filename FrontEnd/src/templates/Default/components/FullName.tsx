import localStyles from '../../../styles/Default/modules/fullName.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const FullName = ({styles, component, open, position, section}:ComponentProps) => {
  return (
    <div className={styles.inputContainer}>
      <div>
        <label htmlFor={`first-name-input-${position + 1}`}>{component[1].firstNameTitle}
          {component[1].isRequired &&
            <span style={{
              color: "red"
            }}>*</span>}
        </label>
        <input type="text" id={`first-name-input-${position + 1}`} placeholder={component[1].firstNamePH} />
      </div>
      <div>
        <label htmlFor={`last-name-input-${position + 1}`}>{component[1].lastNameTitle}
          {component[1].isRequired &&
            <span style={{
              color: "red"
            }}>*</span>}
        </label>
        <button type='button' onClick={() => open(["RemoveComponent", component[0], position, section[1]])} className={styles.removeSection}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
        </button>
        <input type="text" id={`last-name-input-${position + 1}`} placeholder={component[1].lastNamePH} />
      </div>
    </div>
  )
}

export const FullNameEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {
  
  const [values, setValues] = useState({
    firstNameTitle: "First Name",
    firstNamePH: "Enter First Name",
    lastNameTitle: "Last Name",
    lastNamePH: "Enter Last Name",
    isRequired: true
  })

  return (
    <form onSubmit={handleSubmit(["Add FullName", sectionID, values])}>
      <div className={localStyles.header}>
        <h2>Full Name Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <div className={localStyles.inputsContainer}>
        <div>
          <input name='inputTitle' placeholder='First Name' value={values.firstNameTitle} onChange={e=>setValues((s) => ({...s, firstNameTitle: e.target.value}))} type="text" />
          <input name='inputPlaceholder' placeholder='Enter First Name' value={values.firstNamePH} onChange={e => setValues((s) => ({ ...s, firstNamePH: e.target.value }))} type="text" />
        </div>
        <div>
          <input name='inputTitle' placeholder='Last Name' value={values.lastNameTitle} onChange={e => setValues((s) => ({ ...s, lastNameTitle: e.target.value }))} type="text" />
          <input name='inputPlaceholder' placeholder='Enter Last Name' value={values.lastNamePH} onChange={e => setValues((s) => ({ ...s, lastNamePH: e.target.value }))} type="text" />
        </div>
      </div>
      <input id='required' checked={values.isRequired} onChange={() => setValues((s) => ({...s, isRequired: !s.isRequired}))}  name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}