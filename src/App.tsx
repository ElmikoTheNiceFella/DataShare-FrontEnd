import './App.scss'
import UDST_LOGO from './assets/UDST_LOGO.svg'
import { PersonalInfo } from './components'

function App() {

  return (
    <>
      <form action="#">
        {/* Logo + Form Title */}
        <header id='head'>
          <img src={UDST_LOGO} alt="" />
          <h1>UDST Clubs Registration</h1>
        </header>
        {/* Form Container */}
        <main id='container'>
          {/* Personal Information */}
          <PersonalInfo />
        </main>
      </form>
    </>
  )
}

export default App
