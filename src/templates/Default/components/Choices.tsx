import localStyles from '../../../styles/Default/modules/choices.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

export const Choices = ({ styles, component, position, section, open }: ComponentProps) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={`choices-input-${position + 1}`}>{component[1].title}
        {component[1].isRequired &&
          <span style={{
            color: "red"
          }}>*</span>}
      </label>
      <button type='button' onClick={() => open(["RemoveComponent", component[0], position, section[1]])} className={styles.removeSection}>
        <FontAwesomeIcon icon={faTrash} style={{ color: "#1C1D1E" }} />
      </button>
      <div>
        {component[1].choices.map((choice: string, i: number) => (
          <>
            {choice[0].length === 1 ?
              (<div className={styles.shownChoice}>
                <input type="radio" name={`choices-input-${position + 1}`} id={`choice-${i}`} />
                <label htmlFor={`choice-${i}`}>{choice}</label>
              </div>) : (<div className={styles.shownChoiceOther}>
                <input type="radio" name={`choices-input-${position + 1}`} id={`choice-${i}`} />
                <label htmlFor={`choice-${i}`}>{choice[0]}<input type='text' /></label>
              </div>)
            }
          </>
        ))}
      </div>
    </div>
  )
}

export const ChoicesEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {

  const [choices, setChoices] = useState<(string | string[])[]>([]);

  const [result, setResult] = useState<{ [key: string]: any }>({ title: "Input Title", choices, isRequired: "" });

  useEffect(() => {
    setResult(prev => ({
      ...prev,
      choices
    }))
  }, [choices])

  const handleAddChoice = () => {
    setChoices(prev => [...prev, ""])
  }
  const handleAddCustomChoice = () => {
    setChoices(prev => [...prev, [""]])
  }
  const handleRemoveChoice = (i: number) => {
    setChoices(prev => [...prev].filter(v => prev.indexOf(v) !== i))
  }

  return (
    <form onSubmit={handleSubmit(["Add Choices", sectionID, result])}>
      <div className={localStyles.header}>
        <h2>Choices Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <input onChange={(e) => setResult(p => ({ ...p, title: e.target.value }))} className={localStyles.title} name='inputTitle' value={result.title} type="text" />
      <div className={localStyles.choicesContainer}>
        {result.choices.map((choice: (string | string[]), i: number) => (
          <div key={i} className={localStyles.choiceAdd}>
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
      <input id='required' onChange={(e) => setResult(p => ({ ...p, isRequired: `${e.target.value}` }))} name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}