import localStyles from '../../styles/modules/addComponent.module.scss'
import { MaleIcon, FemaleIcon } from '../../../public/index'

const AddComponent = ({ setComponent }: AddComponentProps) => {

  return (
    <>
      <h2>Select Component</h2>
      <div className={localStyles.container}>
        {/* Text Input */}
        <div onClick={() => setComponent("Text")} className={localStyles.componentContainer}>
          <h3>Text</h3>
          <div className={localStyles.text}>
            <div>Text</div>
          </div>
        </div>
        {/* Full Name Input */}
        <div onClick={() => setComponent("FullName")} className={localStyles.componentContainer}>
          <h3>Full Name</h3>
          <div className={localStyles.fullName}>
            <div>First Name</div>
            <div>Last Name</div>
          </div>
        </div>
        {/* Gender Input */}
        <div onClick={() => setComponent("Gender")} className={localStyles.componentContainer}>
          <h3>Gender</h3>
          <div className={localStyles.gender}>
            <div className={localStyles.male}><div className={localStyles.genderChoice}></div><MaleIcon/>Male</div>
            <div className={localStyles.female}><div className={localStyles.genderChoice}></div><FemaleIcon />Female</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddComponent