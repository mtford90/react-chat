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
            <div className={this.props.className}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">Messages</h1>
                    </div>
                    <div className="panel-body messages">
                        <ul className="list-unstyled">
                            {messageComponents}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

var Message = React.createClass({
    render: function() {
        return (
            <li>
                {/* Interestingly, we need do className="xyz" instead of class="xyz"...
                Also we need to wrap comments within JSX in a JS block :S */}
                <b className="username">{this.props.username}:</b> <span className="message">{this.props.message}</span>
            </li>
        );
    }
});

// The component to represent user input.
var MessageInput = React.createClass({

    onSubmit: function(e) {
        e.preventDefault();

        var input = this.refs.message.getDOMNode()
        this.props.onSubmit(input.value.trim());

        input.value = '';
    },

    render: function () {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="username" placeholder="Type a message" ref="message" autoFocus="true"/>
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-default">Go</button>
                        </span>
                    </div>
                </div>
            </form>
        );
    }
});

var UsernameBox = React.createClass({
    render: function() {
        var userComponents = [];

        this.props.users.forEach(function(u) {
            userComponents.push(<Username username={u}/>);
        });

        return (
            <div className={this.props.className}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">Users</h2>
                    </div>
                    <ul id="users" className="list-group">
                        {userComponents}
                    </ul>
                </div>
            </div>
        );
    }
});

var LoginBox = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        this.props.onSubmit(this.refs.username.getDOMNode().value.trim());
    },
    render: function () {
        return (
            <form className="form-inline" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="username" placeholder="name" autoFocus="true"/>
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-default">Go</button>
                        </span>
                    </div>
                </div>
            </form>
        );
    }
});

var Username = React.createClass({
    render: function() {
        return (
            <li className="list-group-item">
                <span className="username">{this.props.username}</span>
            </li>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            users: [],
            messages: [],
            username: null,
            socket: io()
        };
    },

    componentDidMount: function() {
        this.state.socket
            .on('message', function(data) {
                this.setState({
                    messages: this.state.messages.concat(data)
                });
            }.bind(this))
            .on('new user', function(data) {
                this.setState({
                    users: data.users
                });
            }.bind(this));
    },

    handleMessageSubmit: function(message) {
        this.state.socket.emit('message', {message: message, username: this.state.username});
    },

    handleUsernameSubmit: function (username) {
        this.state.socket.emit('join', {
            username: username
        });
        this.setState({
            username: username
        });
    },

    render: function() {
        var view;
        if (this.state.username) {
            view = (
                <div id="content" className="row">
                    <div className="col-xs-9">
                        <MessageBox messages={this.state.messages} />
                        <MessageInput onSubmit={this.handleMessageSubmit} />
                    </div>
                    <UsernameBox className="col-xs-3" users={this.state.users} currentUser={this.state.username} />
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
