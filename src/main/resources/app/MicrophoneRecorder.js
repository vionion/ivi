import React from 'react';
import Recorder from 'recorderjs';
import styles from './MicrophoneRecorder.css'

const STATUS = {
    WAITING: "WAITING",
    RECORDING: "RECORDING",
    PROCESSING: "PROCESSING",
};

const BAD_INPUT = "We couldn't recognize your intent. Please, try again!";
const GOOD_INPUT = "Deal! Going to the floor #";

export class MicrophoneRecorder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: STATUS.WAITING,
            recorder: null,
            response: null
        };

        let audio_context;
        let that = this;

        function startUserMedia(stream) {
            let input = audio_context.createMediaStreamSource(stream);
            console.log('Media stream created.');
            that.setState({
                recorder: new Recorder(input)
            });
            console.log('Recorder initialised.');
        }

        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            audio_context = new AudioContext;
            console.log('Audio context set up.');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
            console.log(e);
            alert('No web audio support in this browser!');
        }

        navigator.getUserMedia({audio: true}, startUserMedia, function (e) {
            console.log('No live audio input: ' + e);
        });
    }

    startRecording = () => {
        this.changeStatus(STATUS.RECORDING);
        this.state.recorder.record();
        console.log('Recording...');
    };

    stopRecording = () => {
        this.changeStatus(STATUS.PROCESSING);

        this.state.recorder.stop();
        console.log('Stopped recording.');

        const self = this;
        this.state.recorder.exportWAV(function (blob) {
            let request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    let floor = JSON.parse(request.responseText)[0].floor;
                    self.setState({
                        status: STATUS.WAITING,
                        response: floor === -100 ? BAD_INPUT : (GOOD_INPUT + (floor === 0 ? 'K' : floor))
                    });
                    if (floor !== -100) {
                        self.props.onChange(floor);
                    }
                }
            };
            request.open("POST", "https://mirror-chat.mybluemix.net/api/uploadAudio", true);
            request.send(blob);
        });

        this.state.recorder.clear();
    };

    changeStatus = (status) => {
        this.setState({
            status: status
        });
    };

    render() {
        return (
            <div>
                <div className={styles.center}>
                    {(!this.state.response && this.state.status === STATUS.WAITING) &&
                    <p>Press the button and tell your destination</p>}
                    {this.state.status === STATUS.RECORDING &&
                    <p>Press the button again when you are done</p>}
                    {this.state.status === STATUS.PROCESSING &&
                    <p>Wait... We are analysing your input</p>}
                    {(this.state.response && this.state.status === STATUS.WAITING) &&
                    <p className={this.state.response === BAD_INPUT ? styles.error : styles.success}>{this.state.response}</p>}
                </div>
                <div className={styles.center}>
                    {this.state.status === STATUS.WAITING &&
                    <button className={styles.buttonStart} onClick={this.startRecording} type="button">Start
                        recording</button>}
                    {this.state.status === STATUS.RECORDING &&
                    <button className={styles.buttonStop} onClick={this.stopRecording} type="button">Stop
                        recording</button>}
                    {this.state.status === STATUS.PROCESSING &&
                    <button className={styles.buttonStop} onClick={this.stopRecording} type="button" disabled>
                        Processing...</button>}
                </div>
            </div>
        );
    }
}
