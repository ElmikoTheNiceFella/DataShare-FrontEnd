import styles from '../../styles/modules/modal.module.scss'
import localStyles from '../../styles/modules/removeSection.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const RemoveComponent = ({componentType, sectionID, componentID, handleRemove, close}:RemoveComponentProps) => {
  
  const camelCaseToNormal = (type:string) => {
    
    let newType:string = type[0].toUpperCase()

    for(let i = 1; i < type.length; i++) {
      if (type[i] == type[i].toUpperCase()) {
        newType += ' '
      }
      newType += type[i]
    }

    return newType
  }

  return (
    <>
      <button type='button' onClick={close} className={styles.close}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2>Delete This {camelCaseToNormal(componentType)}?</h2>
      <div className={localStyles.buttonsContainer}>
        <button onClick={() => {
          handleRemove(sectionID, componentID)
          close()
        }} className={localStyles.yes}>Yes</button>
        <button onClick={close} className={localStyles.no}>No</button>
      </div>
    </>
  )
}

export default RemoveComponent