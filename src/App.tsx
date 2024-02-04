import './App.scss'
import Default from './templates/Default/Default';

function App() {

  const template = "Default";

  return (
    <>
      {template == "Default" && <Default />}
    </>
  )
}

export default App
