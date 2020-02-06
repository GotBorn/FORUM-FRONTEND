import React, { Component } from "react";
import './MainScreen.css';
import { getTopics } from "./backend";
import ChatScreen from "./ChatScreen";
/*
function Messenger(props) {
    let t = null;
    for (let topic of []) {
        if (topic.id === props.topicId) {
            t = topic
            alert(1)
            break
        }
    }
    return (
        <div>
            <div className="TopicHeader">
                <div className="TopicTitle">{t.title} {props.date}</div>
                <div className="TopicDate">Дата: {t.date}</div>
            </div>
            <span><div className="TopicDescription">{t.description}</div></span>

        </div>
    )
}
*/
function Topic(props) {
    return (
        <div className="Block" onClick={props.onClick}>

            <div className="Title">{props.title}</div>

            <div className="Description">{props.description}</div>

            <div className="LastMessage">
                {props.lastMessage ? <div>{props.lastMessage.text}</div> : <div className="nomessage"> Нет сообщений. </div>}
            </div>

            <div className="Date">Дата: {convertDate(props.date)}</div>
        </div>
    )
}

function convertDate(date) {
    let first = date.substring(0, 10);
    let second = date.substring(11, 16);
    return (second + " " + first);
}

class MainScreen extends Component {
    state = {
        topiclist: null,
        topic: null,
        token: this.props.token,
    }
    async componentDidMount() {
       this.updateTopics();
    }

    async updateTopics(){
        let topics = await getTopics(this.props.token);
        this.setState({ topiclist: topics });
    }
    
    render() {
        return (
            <div className="Background">
                <header>
                    <div className="AppName">4rum</div>
                    <div className="Version">ver_0.1</div>
                    <button id="LogOutButton" onClick = {this.props.onLogout}>Log Out</button>
                </header>
                {this.state.topic === null && this.state.topiclist !== null && this.state.topiclist.map(topic =>
                    <Topic title={topic.title}
                        description={topic.description}
                        lastMessage={topic.lastMessage}
                        date={topic.date}
                        onClick={() => this.setState({ topic: topic.id})}
                    />)}
                {this.state.topic !== null && <ChatScreen onBack={ () => {this.updateTopics(); this.setState({ topic: null })} } topicId={this.state.topic} token={this.state.token} />}
            </div>
        )
    }
}


export default MainScreen;