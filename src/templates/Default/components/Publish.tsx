import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import styles from "../../../styles/Default/modules/modal.module.scss"
import localStyles from "../../../styles/Default/modules/removeSection.module.scss"

const Publish = ({ content, close, handlePublish }:PublishProps) => {
  return (
    <>
      <button type='button' onClick={close} className={styles.close}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <h2>Publish {content.title}?</h2>
      <div className={localStyles.buttonsContainer}>
        <button onClick={() => {
          handlePublish(content)
          close()
        }} className={localStyles.yes}>Yes</button>
        <button onClick={close} className={localStyles.no}>No</button>
      </div>
    </>
  )
}

export default Publish