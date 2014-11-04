/** @jsx React.DOM */
/* global React */

/*
- React is a JavaScript library for creating user interfaces.
- React is all about building reusable components. 
- "*React* to data changes"
    - It uses a fast, internal mock DOM to perform diffs and computes the most efficient DOM mutation for you.
 */

var MessageBox = React.createClass({
  render: function() {
    var messageComponents = [];

    this.props.messages.forEach(function(message) {
      messageComponents.push(<Message username={message.username} message={message.message} key={message.id}/>);
    });
       /* 
      JSX is transformed into native Javascript. If we didn't use JSX, it would like this:
        - React.createElement('ul', { id: 'messages' }, messageComponents); 
     */
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

// The component to represent user input.
var MessageInput = React.createClass({
    getInitialState: function() {
        return {message: ''};
    },
    
    onKeyUp: function () {
        this.setState({message: 'rawrboom'});
    },
    
    onSubmit: function() {
        this.props.onSubmit(this.state.message);
    },
    
    render: function () {
        return (
            <div id="input">
                <input id="message" type="text" placeholder="Type a message" onKeyUp={this.onKeyUp}></input>
                <button id="submit" onClick={this.onSubmit}>Go</button>
            </div>
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

var LoginBox = React.createClass({
    onSubmit: function () {
        this.props.onSubmit(this.refs.username.getDOMNode().value.trim());
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="username"/>
                <button onClick={this.onSubmit}>Go</button>
            </div>
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

var App = React.createClass({
    getInitialState: function() {
        return {
            users: [],

            messages: [
              { username: 'Mike', message: 'Hello mate', id: 1 },
              { username: 'Vito', message: 'Wassup'    , id: 2 }
            ],

            username: null
        };
    },

    handleMessageSubmit: function(message) {
        this.setState({
            messages: this.state.messages.concat({
                username: 'Really Change This Later.',
                message : message,
                id      : this.state.messages.length + 1
            })
        });
    },

    handleUsernameSubmit: function (username) {
        this.setState({
            username: username,
            users: this.state.users.concat({username: username})
        });
    },

    render: function() {
        var view;
        if (this.state.username) {
            view = (
                <div>
                    <div id="content">
                        <MessageBox messages={this.state.messages} />
                        <UsernameBox users={this.state.users} />
                    </div>
                    <MessageInput onSubmit={this.handleMessageSubmit} />
                </div>
            );
        }
        else {
            view = (
                <LoginBox onSubmit={this.handleUsernameSubmit}/>
            );
        }
        return view;
    }
});

/* Render HTML tags through use of lowercase names */
React.render((
    <App />
), document.getElementById('wrapper'));