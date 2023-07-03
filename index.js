function App() {
    const [breakTime, setBreakTime] = React.useState(5)
    const [sessionTime, setSessionTime] = React.useState(25)
    const [play, setPlay] = React.useState(false)
    const [leftTime, setLeftTime] = React.useState(25 * 60)
    const [brstart, setBrstart] = React.useState(false)
    const [countdown, setCountdown] = React.useState(false)

    React.useEffect(() => {
        let timerId

        if (play) {
            timerId = setInterval(() => {
                setLeftTime(prev => prev - 1)
            }, 1000);

            return () => {
                clearInterval(timerId)
            }
        }

    }, [play])


    React.useEffect(() => {
        if (leftTime == 0) {
            let aud = document.getElementById("beep")
            aud.play()
            if (brstart) {
                setBrstart(false)
                setLeftTime(sessionTime * 60)

            } else {
                setBrstart(true)
                setLeftTime(breakTime * 60)
            }
        }

    }, [leftTime])



    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    function incBr() {
        if (breakTime < 60) {
            setBreakTime(prev => prev + 1)
        };
    };

    function decBr() {
        if (breakTime > 1) {
            setBreakTime(prev => prev - 1)
        };
    };



    function incSe() {
        if (sessionTime < 60) {
            setSessionTime(prev => prev + 1)
        };
    };

    function decSe() {
        if (sessionTime > 1) {
            setSessionTime(prev => prev - 1)
        };
    };


    function handlePlay() {
        if (!countdown) {
            setLeftTime(sessionTime * 60)
            setCountdown(true)
        } else {
            setLeftTime(prev => prev)
        }
        setPlay(!play);
    };

    function handleReset() {
        setLeftTime(25 * 60);
        setBreakTime(5);
        setSessionTime(25);
        setPlay(false)
        setCountdown(false)
        let file = document.getElementById("beep")
        file.pause()
        file.currentTime = 0;

    }

    return (
        <div className="container">
            <div className="clock">
                <div className="title">25 + 5 Clock</div>
                <div className="controls">
                    <div className="break-section">
                        <div id="break-label">Break Length</div>
                        <div className="break-adj">
                            <div onClick={decBr} id="break-decrement"><i className="fas fa-arrow-alt-circle-down fa-lg"></i></div>
                            <div id="break-length">{breakTime}</div>
                            <div onClick={incBr} id="break-increment"><i className="fas fa-arrow-alt-circle-up fa-lg"></i></div>
                        </div>
                    </div>
                    <div className="session-section">
                        <div id="session-label">Session Length</div>
                        <div className="session-adj">
                            <div onClick={decSe} id="session-decrement"><i className="fas fa-arrow-alt-circle-down fa-lg"></i></div>
                            <div id="session-length">{sessionTime}</div>
                            <div onClick={incSe} id="session-increment"><i className="fas fa-arrow-alt-circle-up fa-lg"></i></div>
                        </div>
                    </div>
                </div>
                <div className="timer">
                    <div id="timer-label">{brstart ? "Break" : "Session"}</div>
                    <div id="time-left">{formatTime(leftTime)}</div>
                </div>
                <div className="start-reset">
                    <div onClick={handlePlay} id="start_stop">
                        {play ? <i className="fas fa-pause fa-lg"></i> : <i className="fas fa-play fa-lg"></i>}
                    </div>
                    <div onClick={handleReset} id="reset">
                        <i className="fas fa-redo fa-lg"></i>
                    </div>
                    <audio preload="auto" id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                </div>
                <footer>
                    <p id="footer-title">Designed and Coded by</p>
                    <p id="author">dvsadovskyi</p>
                </footer>
            </div>
        </div>

    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)