import localStyles from '../../styles/modules/country.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import * as countriesOBJ from '../../../flagData.json';
import { useState, useEffect } from 'react';

export const CountryEdit = ({ back, sectionID, handleSubmit }: TextEditProps) => {

  const countries = JSON.parse(JSON.stringify(countriesOBJ))

  const countriesKeysInit = Object.keys(countries).slice(0, Object.keys(countries).length - 1);
  
  const [defaultCountry, setDefaultCountry] = useState("MA")
  
  const [close, setClose] = useState(true)

  const [countriesKeys, setCountriesKeys] = useState(countriesKeysInit)

  const [countryName, setCountryName] = useState("")

  useEffect(() => {
    setCountriesKeys((_) => {
      return countriesKeysInit.filter(name => {
        let prop = JSON.stringify(countries[name]).toLowerCase()
        return prop.includes(countryName.toLowerCase())
      })
    })
  }, [countryName])

  return (
    <form onSubmit={handleSubmit(["Add Country", sectionID, defaultCountry])}>
      <div className={localStyles.header}>
        <h2>Country Component</h2>
        <button type='button' onClick={() => back("Back")}><FontAwesomeIcon icon={faArrowLeft} />Back</button>
      </div>
      <div className={localStyles.inputsContainer}>
        <input name='inputTitle' placeholder='Input Title' type="text" />
        <div onClick={() => setClose(t => !t)} className={localStyles.country}>
          <img src={`https://flagsapi.com/${defaultCountry}/flat/64.png`} />
          {/* Apparently this throws an error (cant use object in jsx) */}
          {/* when using countries[country] directly so I had to */}
          {/* write this madness + length checking */}
          <span>{JSON.stringify(countries[defaultCountry])
            .substring(1, countries[defaultCountry].length < 20 ?
              countries[defaultCountry].length + 1 : 20)}
            {(countries[defaultCountry].length > 20 && "...")}</span>
          <div></div>
        </div>
        <div style={{
          display: close ? "none" : "flex"
        }} className={localStyles.search}>
          <div>
            <div>
              <input type="text" value={countryName} onChange={e => setCountryName(e.target.value)} name="find-country" id="find-country-ac" />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            {countriesKeys.map((country, i) => (
              <div onClick={() => {
                setDefaultCountry(country)
                setClose(true)
              }} className={localStyles.searchCountry} key={i}>
                <img src={`https://flagsapi.com/${country}/flat/64.png`} />
                {/* I had to repeat the madness here as well */}
                <span>{JSON.stringify(countries[country])
                      .substring(1, countries[country].length < 20 ? 
                        countries[country].length + 1 : 20)}
                        {(countries[country].length > 20 && "...")}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
      <input id='required' name='isRequired' type="checkbox" />
      <label className={localStyles.isRequired} htmlFor='required'>
        Required
      </label>
      <button type='submit' className={localStyles.addComponent}><FontAwesomeIcon icon={faPlus} />Add Component</button>
    </form>
  )
}