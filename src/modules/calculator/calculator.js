
import "./calculator.css"
import { useState, useEffect } from "react";
import Buttons from "../../components/actionsButtons"
const Calculator = () =>{

    const [screenText, setScreenText] = useState("");
    const [screenResult, setScreenResult] = useState("0");
    const screen = { screenText, setScreenText, screenResult, setScreenResult }
    let numbers = [];
    const myRegEx = '/[^0-9*.-/+]/g';
    const specialCharacters =  ["+","-","/","*","."]
    let regex = new RegExp(`[${specialCharacters.join('')}]`, 'g');

    useEffect(() => {
        const keyUp= (e) => e.key==="Enter" ? actions.calculate(true) :  setScreenText (actions.review(e.key))
        actions.calculate();

        document.addEventListener('keyup', keyUp);
        return () => {
          document.removeEventListener('keyup', keyUp);
        };
    }, [screenText]);
      
    const actions = {
        review: (key) =>{
            if(key===" ")
                return screenText

            let validatorArray =  screenText!=='' ? [...screenText.matchAll(regex)] : []
            let frase = screenText;
            let valid = true;

            if(specialCharacters.includes(key) || key==='.' || !isNaN(key)){
                const last =  screenText.charAt(screenText.length-1)

                if(key==="." && validatorArray.length > 0)
                    valid = !validatorArray[validatorArray.length-1].includes('.')
                else if(last==="0" && !isNaN(key))
                    valid = false

                if(valid)
                    if( specialCharacters.includes(key)  && specialCharacters.includes(last))  
                        frase = (screenText.slice(0, -1)) + key
                    else if ((specialCharacters.includes(key) && screenText==="" ) || (key ==='.'  && screenText===""))
                        frase = (screenText)
                    else
                        frase = (screenText + key)
                     
                return (frase).replace(myRegEx,"")

            }else if(key==="Backspace")
                return screenText.slice(0, -1)
            
            return screenText    
        },
        calculate: (change = false) => {
            if(screenText !== ""){
                const last =  screenText.charAt(screenText.length-1)
                if( specialCharacters.includes(last) === false ){
                    if(change)
                        setScreenText(String(eval(screenText)))
                    setScreenResult(String(eval(screenText)))
                }
            }else
                setScreenResult("0")
        }
    }

    for (let index = 1; index < 10; index++) {
        numbers.push(<Buttons name={index} set={screen}  color=""  value={index} case="number"/>) 
    }
    numbers.push(<Buttons name={"."} set={screen}  color=""  value="." case="operations"/>)
    numbers.push(<Buttons name={"0"} set={screen}  color=""  value="0" case="number"/>)

                 
    return (
        <div >
            <div class="container">
                <h1>Calculator</h1>
                    <div class="screen_container">
                        <textarea readOnly placeholder="Press a number..." class="screen_area" value={screenText}></textarea>
                        <div class="screen_result">
                            <span class="screen_result_span">=</span><span>{screenResult}</span>
                        </div>
                    </div>
                    <div class="buttons_container">
                        <div class="numbers_container">
                            {numbers}
                        </div>
                        <div class="actions_container">
                            <Buttons name="C" set={screen}  color="red" value="c" case="c"/>
                            <Buttons name="⌫" set={screen}  color="red" value="backspace" case="backspace"/>
                            <Buttons name="+" set={screen}  color="" value="+" case="operations"/>
                            <Buttons name="-" set={screen}  color="" value="-" case="operations"/>
                            <Buttons name="*" set={screen}  color="" value="*" case="operations"/>
                            <Buttons name="/" set={screen}  color="" value="/" case="operations"/>
                            <Buttons name="=" set={screen}  color="green" value="equal" case="equal"/>
                        
                        </div>
                    </div>

            </div>
        </div>
    )


}

export default Calculator;