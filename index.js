function App() {
    const [currDis, setCurrDis] = React.useState(0)
    const [overDis, setOverDis] = React.useState("")
    const [result, setResult] = React.useState("");


    function handleClear() {
        setCurrDis(0)
        setOverDis("")
        setResult("");
    }

    function handleNumber(e) {


        if (currDis.length > 12) {
            setCurrDis(prev => prev)
        } else {
            if (currDis === "+" || currDis === "-" || currDis === "*" || currDis === "/" || currDis === 0 || currDis === "0" || result) {
                setResult("")
                setCurrDis(e.target.innerText)
                setOverDis(prev => prev + e.target.innerText)
            } else {
                setCurrDis(prev => prev + e.target.innerText)
                setOverDis(prev => prev + e.target.innerText)
            }
        }


    }


    function handleOper(e) {

        if (result) {
            setOverDis(result)
            setResult("")
        }

        let operand = e.target.innerText
        let lastOp = overDis.slice(-1)
        let lastTwo = overDis.slice(-2)
        console.log(lastTwo)

        if (currDis) {
            setCurrDis(operand)
            if (lastTwo === "/-" || lastTwo === "*-" || lastTwo === "--" || lastTwo === "+-") {
                if (operand === "-") {
                    setOverDis(prev => prev)
                } else {
                    setOverDis(prev => {
                        let buf = prev.slice(0, -2)
                        return buf + operand
                    })
                }
            } else {
                if (lastOp === "/" || lastOp === "*" || lastOp === "+" || lastOp === "-") {
                    if (operand === "-") {
                        setOverDis(prev => prev + "-")
                    } else {
                        setOverDis(prev => {
                            let buf = prev.slice(0, -1)
                            return buf + operand
                        })
                    }

                } else {
                    setOverDis(prev => prev + operand)
                }
            }


        }

    }

    function handleEquals() {
        if (overDis) {
            let result = eval(overDis)
            setResult(result)
            setOverDis("")
            setCurrDis(result)
        } else {
            setCurrDis(0)
        }
    }

    function handleDec() {
        if (currDis === "+" || currDis === "-" || currDis === "*" || currDis === "/") {
            setCurrDis(prev => prev)
            setOverDis(prev => prev)
        } else {
            if (currDis && !result) {
                if (currDis.includes(".")) {
                    setCurrDis(prev => prev)
                    setOverDis(prev => prev)
                } else {
                    setCurrDis(prev => prev + ".")
                    setOverDis(prev => prev + ".")
                }
            }

        }

    }

    return (
        <div className="container">
            <div className="calculator">
                <div className="display-container">
                    <div className="display-overal">{overDis}</div>
                    <div id="display">{currDis}</div>
                </div>
                <div className="buttons">
                    <div onClick={handleClear} id="clear">AC</div>
                    <div onClick={handleOper} id="divide">/</div>
                    <div onClick={handleOper} id="multiply">*</div>
                    <div onClick={handleNumber} id="seven">7</div>
                    <div onClick={handleNumber} id="eight">8</div>
                    <div onClick={handleNumber} id="nine">9</div>
                    <div onClick={handleOper} id="subtract">-</div>
                    <div onClick={handleNumber} id="four">4</div>
                    <div onClick={handleNumber} id="five">5</div>
                    <div onClick={handleNumber} id="six">6</div>
                    <div onClick={handleOper} id="add">+</div>
                    <div onClick={handleNumber} id="one">1</div>
                    <div onClick={handleNumber} id="two">2</div>
                    <div onClick={handleNumber} id="three">3</div>
                    <div onClick={handleEquals} id="equals">=</div>
                    <div onClick={handleNumber} id="zero">0</div>
                    <div onClick={handleDec} id="decimal">.</div>
                </div>
            </div>
            <footer>test</footer>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)