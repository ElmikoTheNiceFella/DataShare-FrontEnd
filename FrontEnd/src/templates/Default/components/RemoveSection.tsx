import styles from '../../../styles/Default/modules/modal.module.scss'
import localStyles from '../../../styles/Default/modules/removeSection.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type RemoveSectionProps = {
  close: () => void;
  sectionName: string;
  sectionID: number;
  handleRemove: (id:number) => void;
}

const RemoveSection = ({close, sectionName, sectionID, handleRemove}:RemoveSectionProps) => {
  return (
    <>
      <button type='button' onClick={close} className={styles.close}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2>Delete {sectionName}</h2>
      <div className={localStyles.buttonsContainer}>
        <button onClick={() => {
          handleRemove(sectionID)
          close()
        }} className={localStyles.yes}>Yes</button>
        <button onClick={close} className={localStyles.no}>No</button>
      </div>
    </>
  )
}

export default RemoveSection