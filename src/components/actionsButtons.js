import "./styles/actionsButtons.css"

const ActionsButtons = (props) => {

    const  { screenText, setScreenText, screenResult, setScreenResult } = props.set
    const specialCharacters =  ["+","-","/","*","."]
    let regex = new RegExp(`[${specialCharacters.join('')}]`, 'g');

    const actions = {
        backspace: () =>setScreenText(screenText.slice(0, -1)),
        c: () => setScreenText("") & setScreenResult("0"),
        exe : (e) => actions[e.target.name](e.target.value),
        number : (key) => {
            let valid = true
            let frase = screenText;

            const last =  screenText.charAt(screenText.length-1)
            if(last==="" && key==="0"  )
                valid = false
            else if(isNaN(last) && key==="0" && last!==".")
                valid = false

            if(valid)
                frase = (screenText + String(key))

            setScreenText( frase)
        },
        operations: (key) => {
            let frase = screenText;
            const last =  screenText.charAt(screenText.length-1)
            let validatorArray =  screenText!=='' ? [...screenText.matchAll(regex)] : []
            let valid = true;

            if(key==="." && validatorArray.length > 0)
                valid = !validatorArray[validatorArray.length-1].includes('.')
            else if(last==="" && key==="0"  )
                valid = false
            else if(isNaN(last) && key==="0" && last!==".")
                valid = false

            if(valid)
                if(specialCharacters.includes(key) && screenText==="" )
                    frase = (screenText)
                else if(( specialCharacters.includes(key)  && specialCharacters.includes(last) && key !== "."))
                    frase = (screenText.slice(0, -1)) + key
                else
                    frase = (screenText + key)
            
            setScreenText(frase)
        },
        equal : () => {
            const last =  screenText.charAt(screenText.length-1)
            if( specialCharacters.includes(last) === false && screenText !== ""){
                setScreenText(String(eval(screenText)))
            }
        }
    }

    return(<button class="item" value={props.value} onClick={actions.exe} style={{backgroundColor:  props.color}}  name={props.case}>{props.name}</button>)
}


export default ActionsButtons;