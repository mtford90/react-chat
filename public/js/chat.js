/** @jsx React.DOM */
/* global React */

var MessageBox = React.createClass({
  render: function() {
    var messageComponents = [];

    this.props.messages.forEach(function(message) {
      messageComponents.push(<Message username={message.username} message={message.message} key={message.id}/>);
    });

    return (
      <ul id="messages">
      	{messageComponents}
      </ul>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <li>
        {/* Interestingly, we need do className="xyz" instead of class="xyz"...
            Also we need to wrap comments within JSX in a JS block :S */}
        <span className="username">{this.props.username}:</span>
        <span className="message">{this.props.message}</span>
      </li>
    );
  }
});

var UsernameBox = React.createClass({
  render: function() {
	var userComponents = [];

    this.props.users.forEach(function(u) {
      userComponents.push(<Username username={u.username} key={u.username}/>);
    });

    return (
      <ul id="users">
      	  {userComponents}
      </ul>
    );
  }
});

var Username = React.createClass({
  render: function() {
    return (
      <li><span className="username">{this.props.username}</span></li>
    );
  }
});

var USERS = [
	{username: 'Vito'},
	{username: 'Mike'}
];

var MESSAGES = [
  {username: 'Mike', message: 'Hello mate', id: 1},
  {username: 'Vito', message: 'Wassup', id: 2}
];

React.render((
	<div>
		<div id="content">
			<MessageBox messages={MESSAGES} />
			<UsernameBox users={USERS} />
		</div>
		<div id="input">
			<input id="message" type="text" placeholder='Type a message'></input>
			<button id="submit">Go</button>
		</div>
	</div>
), document.getElementById('wrapper'));