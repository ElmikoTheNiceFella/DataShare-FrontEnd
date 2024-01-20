import localStyles from '../../styles/modules/addComponent.module.scss'

const AddComponent = ({ setComponent }:AddComponentProps) => {

  return (
    <>
      <h2>Select Component</h2>
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
    </>
  )
}

export default AddComponent