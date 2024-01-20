import localStyles from '../../styles/modules/fullName.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const FullNameEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {
  return (
    <form onSubmit={handleSubmit(["Add FullName", sectionID])}>
      <div className={localStyles.header}>
        <h2>Full Name Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <div className={localStyles.inputsContainer}>
        <div>
          <input name='inputTitle' placeholder='First Name' type="text" />
          <input name='inputPlaceholder' placeholder='Enter First Name' type="text" />
        </div>
        <div>
          <input name='inputTitle' placeholder='Last Name' type="text" />
          <input name='inputPlaceholder' placeholder='Enter Last Name' type="text" />
        </div>
      </div>
      <input id='required' name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}