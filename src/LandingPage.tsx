import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage  from './hooks/useLocalStorage'
import styles from './styles/landingpage.module.scss'
import LOGO_DARK from '../public/FormMakerLight.png'
import LOGO_LIGHT from '../public/FormMaker.png'

interface StorageState {
  title: string
  description: string
}

const LandingPage = () => {

  const [dark, setDark] = useState(false)

  const [matrix, setMatrix] = useState([window.innerWidth / 30, window.innerHeight / 30]);

  const myLocalStorage = useLocalStorage()

  const [storageState, setStorageState] = useState<StorageState|null>(null)

  useEffect(() => {
    function handleResize() {
      setMatrix([window.innerWidth / 30, window.innerHeight / 30])
    } 
    
    const localData: any = JSON.parse(myLocalStorage.getItem("AKDK_DS_FORM") || "{}")

    if (localData.title && localData.description) {
      setStorageState(localData)
    }
    console.log(localData.title, localData.description)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log(storageState)
    if (storageState) {
      navigate("/editor", { state: { title: storageState.title, description: storageState.description } })
    }
  }, [storageState])

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/editor", { state: { title, description } })
  }

  const handleThemeChange = () => {
    setDark(!dark)
  }

  return (
    <>
      <header style={{
        backgroundColor: dark ? "#1C1D1E" : "#fff",
        transition: "background-color 0.5s ease"
      }} className={styles.header}
        onClick={handleThemeChange}>
        <div style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          gridTemplateRows: `repeat(${matrix[1]}, 1fr)`,
        }} className={styles.gridContainer}>
          {Array.from({ length: matrix[1] }).map((_, i) => (
            <div key={i} className={styles.nodeContainer}>
              {Array.from({ length: matrix[0] }).map((_, j) => (
                <div key={j} style={{
                  backgroundColor: dark ? "#1C1D1E" : "#FFFFFF",
                  borderColor: dark ? "#FFFFFF05" : "#1C1D1E07",
                  transitionDelay: `${(dark ? i * matrix[0] * 0.0002 : j * 0.005)}s`
                }} className={styles.node}></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.headerElements}>
          <div className={styles.images} style={{ position: "relative" }}>
            <img style={{ position: "absolute", opacity: dark ? 1 : 0, transition: "opacity 0.5s ease" }} src={LOGO_DARK} alt="" />
            <img style={{ position: "relative", opacity: dark ? 0 : 1, transition: "opacity 0.5s ease" }} src={LOGO_LIGHT} alt="" />
          </div>
          <div onClick={e => e.stopPropagation()} style={{
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