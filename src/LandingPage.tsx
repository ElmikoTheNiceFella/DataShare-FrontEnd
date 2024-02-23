import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles/landingpage.module.scss'
import LOGO_DARK from '../public/FormMakerLight.png'
import LOGO_LIGHT from '../public/FormMaker.png'

const LandingPage = () => {

  const [dark, setDark] = useState(false)

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/editor", { state: { title, description } })
  }

  return (
    <>
      <header style={{
        backgroundColor: dark ? "#1C1D1E" : "#fff"
      }} className={styles.header}>
        <div>

        </div>
        <div className={styles.headerElements}>
          <img src={dark ? LOGO_DARK : LOGO_LIGHT} alt="" />
          <div style={{
            backgroundColor: dark ? "#FFFFFF10" : "#DFE3E850"
          }} className={styles.inputsHeader}>
            <h1 style={{
              color: dark ? "#fff" : "#1C1D1E"
            }}>Create A Beautiful Form Quickly <br />&amp; Easily for FREE</h1>
            <div className={styles.inputsContainer}>
              <input style={{
                color: dark ? "#fff" : "#1C1D1E",
                borderColor: dark ? "#FFFFFF10" : "#1C1D1E10"
              }} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Form Title' />
              <textarea value={description} onChange={e => setDescription(e.target.value)} style={{
                color: dark ? "#fff" : "#1C1D1E",
                borderColor: dark ? "#FFFFFF10" : "#1C1D1E10"
              }} placeholder='Form Description'></textarea>
              <button onClick={handleCreate} style={{
                color: dark ? "#fff" : "#1C1D1E",
                borderColor: dark ? "#FFFFFF10" : "#1C1D1E10"
              }} className={styles.create}>Create</button>
            </div>
          </div>
        </div>
      </header>
      <main>World</main>
      <footer>Footer</footer>
    </>
  )
}

export default LandingPage