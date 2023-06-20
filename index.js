function App() {

    const [power, setPower] = React.useState(true);
    const [bank, setBank] = React.useState(true);
    const [volume, setVolume] = React.useState(50);
    const [display, setDisplay] = React.useState("");
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        function hide() {
            setDisplay("")
        }
        let x = setTimeout(hide, 1000)
        return () => {
            clearTimeout(x)
        }
    }, [volume])

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress)
        return () => { document.removeEventListener("keydown", handleKeyPress) }

    }, [power, bank])


    function handleVolume(event) {
        if (power) {
            setVolume(parseInt(event.target.value))
            const audios = document.querySelectorAll("audio")
            audios.forEach(a => a.volume = volume / 100)
            setDisplay(volume)
        }

    }

    function handleBank() {
        if (power) {
            setBank(prev => !prev)
            if (!bank) {
                setDisplay("Heater kit")
            } else {
                setDisplay("Smooth piano kit")
            }
        }

    }

    function handlePlay(event) {
        if (power) {
            const song = document.getElementById(event.target.textContent)
            song.currentTime = 0;
            song.play()
            setDisplay(event.target.id)
        }

    }

    function handleKeyPress(event) {
        if (power) {
            const songKey = event.key.toUpperCase()
            const song = document.getElementById(songKey)
            song.currentTime = 0;
            song.play()
            const refs1 = {
                "Q": "Heater-1",
                "W": "Heater-2",
                "E": "Heater-3",
                "A": "Heater-4",
                "S": "Clap",
                "D": "Open-HH",
                "Z": "Kick-n'-Hat",
                "X": "Kick",
                "C": "Closed-HH",
            }
            const refs2 = {
                "Q": "Chord-1",
                "W": "Chord-2",
                "E": "Chord-3",
                "A": "Shaker",
                "S": "Open-HH",
                "D": "Closed-HH",
                "Z": "Punchy-Kick",
                "X": "Side-Stick",
                "C": "Snare",
            }
            setDisplay(bank ? refs1[songKey] : refs2[songKey])


        }


    }


    return (
        <div id="drum-machine">
            <div className="logo"><p className="fcc">FCC</p><i className="fa-brands fa-free-code-camp fa-lg"></i></div>
            <div className="control-area">
                <div className="pads">
                    <div onClick={handlePlay} style={active ? { "transform": "scale(0.97)" } : {}} className="drum-pad" id={bank ? "Heater-1" : "Chord-1"}>Q
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"} id="Q"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Heater-2" : "Chord-2"}>W
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"} id="W"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Heater-3" : "Chord-3"}>E
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"} id="E"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Heater-4" : "Shaker"}>A
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"} id="A"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Clap" : "Open-HH"}>S
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"} id="S"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Open-HH" : "Closed-HH"}>D
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"} id="D"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Kick-n'-Hat" : "Punchy-Kick"}>Z
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"} id="Z"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Kick" : "Side-Stick"}>X
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"} id="X"></audio>
                    </div>
                    <div style={active ? { "transform": "scale(0.97)" } : {}} onClick={handlePlay} className="drum-pad" id={bank ? "Closed-HH" : "Snare"}>C
                        <audio className="clip" src={bank ? "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"} id="C"></audio>
                    </div>
                </div>
                <div className="controls">
                    <div className="power-switch">
                        <p className="power-title">Power</p>
                        <div onClick={() => setPower(prev => !prev)} className="power-container" style={power ?
                            { "justifyContent": "flex-start" } : { "justifyContent": "flex-end" }}>
                            <div className="power-button">{power ? "ON" : "OFF"}</div>
                        </div>

                    </div>
                    <div id="display">{display}</div>
                    <div className="volume-inp">
                        <p className="volume-title">Volume</p>
                        <input step="1" min="0" max="100" value={volume} type="range" onChange={handleVolume} className="vol-range" />
                    </div>

                    <div className="bank-switch">
                        <p className="bank-title">Bank</p>
                        <div onClick={handleBank} className="bank-container" style={bank ?
                            { "justifyContent": "flex-start" } : { "justifyContent": "flex-end" }}>
                            <div className="bank-button">O</div>
                        </div>

                    </div>
                </div>
            </div>


        </div >

    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)