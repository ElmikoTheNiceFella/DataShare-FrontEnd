import localStyles from '../../styles/modules/fullName.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

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