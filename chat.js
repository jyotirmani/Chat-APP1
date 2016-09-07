import React from "react";
import ReactDOM from "react-dom";

var ChatApp = React.createClass({
	getInitialState:function(){
		return{
			messages: [],
			socket: window.io("http://localhost:8080")
		}
	},
	componentDidMount:function(){
		var self = this;
		this.state.socket.on("receive-message",function(msg){
			var messages = self.state.messages;
				messages.push(msg);
			self.setState({messages: messages});
			console.log(self.state.messages);
		});
	},
	submitMessage: function(){
		var message = document.getElementById("message").value;
		this.state.socket.emit("new-message", message);

	},
	render: function(){
		var messages = this.state.messages.map(function(msg){
			return <li>{msg}</li>
		});
	
		return(
			<div>
				<ul>
					{messages}
				< /ul>
				<input type = "text" id = "message" /><button onClick = {() => this.submitMessage()}>submit</button>
			</ div>
			)
	}
});

ReactDOM.render(<ChatApp />,document.getElementById("chat"));