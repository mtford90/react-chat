/* global React */
/** @jsx React.DOM */

var MessageBox = React.createClass({
  render: function() {
    var messages = [];

    this.props.messages.forEach(function(message) {
      messages.push(<Message username={message.username} message={message.message} />);
    });

    return (
      <ul id="messages">
      </ul>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <li>
        <span class="username">{username}</span>
        <span class="message">{message}</span>
      </li>
    );
  }
});

var UsernameBox = React.createClass({
  render: function() {
    return (
      <ul id="usernames">
      </ul>
    );
  }
});

var Username = React.createClass({
  render: function() {
    return (
      <li><span class="username">{username}</span></li>
    );
  }
});

var TextField = React.createClass({
  render: function() {
    return (
      <div id="input">
        <input id="message" type="text" placeholder='Type a message'></input>
        <button id="submit">Go</button>
      </div>
    );
  }
});

var MESSAGES = [
  {username: 'Mike', message: 'Hello mate'},
  {username: 'Vito', message: 'Wassup'}
];

React.renderComponent(<MessageBox messages={MESSAGES} />, document.body);
