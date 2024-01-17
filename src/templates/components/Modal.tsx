import styles from '../../styles/modules/modal.module.scss'
import { AddSection } from '.'

type ModalProps = {
  open: boolean;
  close: () => void;
  addSection: (sectionName: string) => void;
}

type HandleData = (type: string, data: FormDataEntryValue) => void;

const Modal = ({open, close, addSection}:ModalProps) => {

  const handleSubmit = (type:string) => (e:React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    switch(type) {
      case "Add Section":
        // Get Section Name
        let name;
        for(let [_,value] of data.entries()) {
          name = value as string;
        }
        // Call the function to add section name
        addSection(name!);
        break;
      default:
        break;
    }

  }

  // const handleChange = () => changeContent(type, )

  return (
    <div
      style={{
        visibility: open ? "visible" : "hidden",
        backgroundColor: `rgba(0,0,0,${open ? 0.5 : 0})`,
        transition: "0.1s ease-out"
      }} 
      onClick={close}
      className={styles.modalContainer}>
      <div style={{
        opacity: open ? 1 : 0
      }} onClick={e => e.stopPropagation()} className={styles.modal}>
        <AddSection close={close} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Modal