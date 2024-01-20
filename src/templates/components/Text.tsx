import localStyles from '../../styles/modules/text.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'

// Actual Text Element
// export const Text = () => {
//   return (
//     <></>
//   )
// }

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