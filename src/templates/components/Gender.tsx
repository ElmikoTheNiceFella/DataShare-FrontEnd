import localStyles from '../../styles/modules/gender.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { MaleIcon, FemaleIcon } from '../../../public';
import { useState } from 'react';

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
          <input value={values.female} onChange={e => setValues(prev => ({...prev, female: e.target.value}))} type="text" name="FemaleText" />
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