import './Translator.css';
import { useState } from "react";
const Translator = () => {
 
  const [inputText, setInputText] = useState('');
  const [outputLang, setOutputLang] = useState('ar');
  const [outputText, setOutputText] = useState('');
  const [isTranslated, setIsTranslated] = useState();

  const translate = async() => {
   const data= await `${process.env.REACT_APP_API_KEY}`;
    console.log(outputLang);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': data,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: `[{"Text":"${inputText}"}]`
    };

    fetch(`${'baseurl'}${outputLang}${'parameters'}`, options)
      .then(response => {
        if (response.status !== 200) {
          setIsTranslated(false);
          console.log(response);
          return;
        }
        setIsTranslated(true);
        response.json()
          .then(response => {
            console.log(response);
            const translatedText = response[0].translations[0].text;
            setOutputText(translatedText);
            console.log(translatedText);
          })
      })
      .catch(err => {
        setIsTranslated(false);
        console.error(err)
      });
  }

  const clearInput = () => {
    setInputText('');
    setOutputText('');
    setIsTranslated();
  }


  return (
    <section className="translator">

    <h1>TRANSLATOR APPLICATION</h1>

        <div className="translator-container input-lang">
          <form className="input-form">
            <textarea
              className="text-box"
              placeholder="Enter text (any language)"
              onChange={e => setInputText(e.target.value)}
              value={inputText}
            >
            </textarea>
              <p className="text-box">
              <div className="top-row selector box">
            <select
              name="languages"
              id="languages"
              className="form-select form-select-sm"
              onChange={e => setOutputLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ta">Tamil</option>
              <option value="hi">Hindi</option>
              <option value="ml">Malayalam</option>
            </select>
          </div>
            {
              isTranslated === false ?
                <span className="output-placeholder translation-error">Translation failed</span>
                :
                outputText === "" ?
                  <span className="output-placeholder">Select a language</span>
                  :
                  outputText
            }
          </p>
          </form>
        </div>
        <div className='clear'>
           {
              inputText !== "" &&
             <button onClick={clearInput}>Clear</button>
            }
        </div>
          <div className="top-row">
            <button className='button'
              onClick={translate}
            >Translate</button>
          </div>

    </section>
  );
}

export default Translator;