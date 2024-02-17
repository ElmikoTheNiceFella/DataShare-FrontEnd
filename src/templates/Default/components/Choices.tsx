import localStyles from '../../../styles/Default/modules/choices.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const Choices = () => {
  return (
    <div>Choices</div>
  )
}

export const ChoicesEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {

  const [choices, setChoices] = useState<(string|string[])[]>([]);

  const handleAddChoice = () => {
    setChoices(prev => [...prev, ""])
  }
  const handleAddCustomChoice = () => {
    setChoices(prev => [...prev, [""]])
  }
  const handleRemoveChoice = (i:number) => {
    setChoices(prev => [...prev].filter(v => prev.indexOf(v) !== i))
  }
  
  return (
    <form onSubmit={handleSubmit(["Add Choices", sectionID])}>
      <div className={localStyles.header}>
        <h2>Choices Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <input className={localStyles.title} name='inputTitle' placeholder='Input Title' type="text" />
      <div className={localStyles.choicesContainer}>
        {choices.map((choice, i) => (
          <div className={localStyles.choiceAdd}>
            <input type="radio" name="choices" id={`choice-${i}`} />
            <label htmlFor={`choice-${i}`}>
              {typeof choice == "string" ?
              <input 
                type="text"
                value={choice}
                onChange={e => setChoices(prev => {
                  let copy = [...prev];
                  copy[i] = e.target.value
                  return copy
                })} />
                :
                <input
                  type="text"
                  value={choice[0]}
                  style={{
                    color: "#2d2e30"
                  }}
                  onChange={e => setChoices(prev => {
                    let copy = [...prev];
                    if (Array.isArray(copy[i])) {
                      (copy[i] as string[])[0] = e.target.value
                    }
                    return copy
                  })} />
              }
            </label>
            <button onClick={() => handleRemoveChoice(i)} type='button'><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        ))}
      </div>
      <button onClick={handleAddChoice} className={localStyles.addChoice} type='button'><FontAwesomeIcon icon={faPlus} />Add Choice</button>
      <button onClick={handleAddCustomChoice} className={localStyles.addChoice} type='button'><FontAwesomeIcon icon={faPlus} />Add Custom Choice</button>
      <input id='required' name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}