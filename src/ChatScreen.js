import React, { Component } from "react";
import './ChatScreen.css';
import data from "./data.json";
import { getMessages } from "./backend";
import { sendMessage } from "./backend";
//let topicData = getTopics(); хз где надо
//let t=null;

function Message(props) {//отображение одного сообщения вроде как работает
    return (
        <div className="MessageBlock">
            <div className="UserId">{props.name}</div>

            <div className="Text">{props.text}</div>

            <div className="Date">{props.date}</div>
        </div>
    )
}

/*
function Messenger(props){
    for(let topic of data.topics) {
        if (topic.id === props.topicId) {
            t = topic
            alert (1)
            break
        } 
    }
    return(
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
class ChatScreen extends Component {
    state = {
        messageslist: null,
        newMessage: '',
    }
    saveNewMessage = (event) => {
        this.setState({ newMessage: event.target.value });
    }
    componentDidMount() {
        this.loadMessages();
    }

    scrollPageDown() {
        setTimeout(() => document.documentElement.scrollTop = 1000000, 500);//скролл вниз
    }

    onclick = async () => {
        if (await sendMessage(this.props.token, this.props.topicId, this.state.newMessage)) {
            this.setState({ newMessage: '' });
            this.loadMessages();
            this.scrollPageDown()
        }
    }

    loadMessages = async () => {
        let messages = await getMessages(this.props.token, this.props.topicId);
        this.setState({ messageslist: messages });
    }

    render() {
        return (
            <div>
                <div className="MassengerTitle">
                    <button id="BackButton"
                        onClick={this.props.onBack}>Назад
                        </button>
                </div>
                <div className="Conteiner">
                    {this.state.messageslist !== null && this.state.messageslist.map(messages =>
                        <Message
                            name={messages.user.firstName + ' ' + messages.user.lastName}
                            text={messages.text}
                            date={messages.date}
                        />)}
                    <div className="SendMessage">
                        {this.state.messageslist !== null &&
                            <input id="MessageContainer"
                                type="text"
                                value={this.state.newMessage}
                                onChange={this.saveNewMessage}
                            />}

                        <button id="SendMessageButton"
                            onClick={this.onclick} disabled={!this.state.newMessage}>Отправить
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default ChatScreen;