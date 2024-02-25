import './App.scss'
import Default from './templates/Default/Default';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  const { state } = location;

  const { title, description } = state

  const template = "Default";

  return (
    <>
      {template == "Default" && <Default title={title} description={description} />}
    </>
  )
}

export default App
