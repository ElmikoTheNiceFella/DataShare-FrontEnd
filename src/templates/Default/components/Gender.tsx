import localStyles from '../../../styles/Default/modules/gender.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MaleIcon, FemaleIcon } from '../../../../public';
import { useState } from 'react';

export const Gender = ({ styles, component, position, section, open }:ComponentProps) => {
  return (
    <div className={styles.inputContainer}>
      <h3 className={styles.title}>Gender {component[1].isRequired &&
        <span style={{
          color: "red"
        }}>*</span>}
        <button type='button' onClick={() => open(["RemoveComponent", component[0], position, section[1]])} className={styles.removeSection}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
        </button></h3>
      <div className={styles.gendersContainer}>
        <label htmlFor={`gender-input-male-${position + 1}`} className={styles.maleInput}>
          <input type="radio" id={`gender-input-male-${position + 1}`} name='gender' />
          <div>
            <MaleIcon />
            {component[1].male}
          </div>
        </label>
        <div className={styles.femaleInput}>
          <label htmlFor={`gender-input-female-${position + 1}`}>
            <input type="radio" id={`gender-input-female-${position + 1}`} name='gender' />
            <div>
              <FemaleIcon />
              {component[1].female}
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export const GenderEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {

  const [values, setValues] = useState({
    male: "Male",
    female: "Female",
    isRequired: true
  })

  return (
    <form onSubmit={handleSubmit(["Add Gender", sectionID, values])}>
      <div className={localStyles.header}>
        <h2>Gender Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <div className={localStyles.inputsContainer}>
        <div className={localStyles.male}>
          <div></div>
          <MaleIcon />
          <input value={values.male} onChange={e => setValues(prev => ({ ...prev, male: e.target.value }))} type="text" name="MaleText" />
        </div>
        <div className={localStyles.female}>
          <div></div>
          <FemaleIcon />
          <input value={values.female} onChange={e => setValues(prev => ({ ...prev, female: e.target.value }))} type="text" name="FemaleText" />
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