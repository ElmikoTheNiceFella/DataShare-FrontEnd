import './App.scss'
import Default from './templates/Default/Default';
import { demoDesc } from '../demoData'

function App() {

  const template = "Default";

  return (
    <>
      {template == "Default" && <Default title="Festival of Cultures" description={demoDesc} />}
    </>
  )
}

export default App
