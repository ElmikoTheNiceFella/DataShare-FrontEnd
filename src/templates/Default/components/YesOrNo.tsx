import localStyles from '../../../styles/Default/modules/binary.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export const YesOrNo = ({ styles, component, position, section, open }: ComponentProps) => {
  return (
    <div className={styles.inputContainer}>
      <h3 className={styles.title}><span>{component[1].title} {component[1].isRequired &&
        <span style={{
          color: "red"
        }}>*</span>}</span>
        <button type='button' onClick={() => open(["RemoveComponent", component[0], position, section[1]])} className={styles.removeSection}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
        </button></h3>
      <div className={styles.yesOrNoContainer}>
        <input className={localStyles.yesRadio} type="radio" id={`yes-input-${position + 1}`} name={component[1].title} />
        <label htmlFor={`yes-input-${position + 1}`} className={styles.yesInput}>
          <div>
            <FontAwesomeIcon icon={faCheck} />
            {component[1].yes}
          </div>
        </label>
        <input className={localStyles.noRadio} type="radio" id={`no-input-female-${position + 1}`} name={component[1].title} />
        <label className={styles.noInput} htmlFor={`no-input-female-${position + 1}`}>
          <div>
            <FontAwesomeIcon icon={faX} />
            {component[1].no}
          </div>
        </label>
      </div>
    </div>
  )
}

export const YesOrNoEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {

  const [values, setValues] = useState({
    title: "",
    yes: "Yes",
    no: "No",
    isRequired: true
  })

  return (
    <form onSubmit={handleSubmit(["Add YesOrNo", sectionID, values])}>
      <div className={localStyles.header}>
        <h2>Yes or No Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <input name='inputTitle' className={localStyles.yesOrNoTitle} value={values.title} onChange={e => setValues(prev => ({ ...prev, title: e.target.value }))} placeholder='Input Title' type="text" />
      <div className={localStyles.inputsContainer}>
        <div className={localStyles.yes}>
          <FontAwesomeIcon icon={faCheck} />
          <input value={values.yes} onChange={e => setValues(prev => ({ ...prev, male: e.target.value }))} type="text" name="MaleText" />
        </div>
        <div className={localStyles.no}>
          <FontAwesomeIcon icon={faX} />
          <input value={values.no} onChange={e => setValues(prev => ({ ...prev, female: e.target.value }))} type="text" name="FemaleText" />
        </div>
      </div>
      <input id='required' checked={values.isRequired} onChange={() => setValues((s) => ({ ...s, isRequired: !s.isRequired }))} name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}