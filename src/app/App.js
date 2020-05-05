import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            _id: '',
            title: '',
            description: '',
            data: []
        };

        this.addTask = this.addTask.bind(this);
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    fecthTasks() {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({data});
        });
    }

    addTask(e) {
        e.preventDefault();
        
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json' 
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Updated'});
                this.setState({title: '', description: '', _id: ''});
                this.fecthTasks();
            })
            .catch(err => console.log(err));
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json' 
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Saved'});
                this.setState({title: '', description: ''});
                this.fecthTasks();
            })
            .catch(err => console.log(err));
        }
    }

    edit(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title, 
                description: data.description, 
                _id: data._id
            });
        });
    }

    deleteTasks(id) {
        if(confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.fecthTasks();
            });
        }
    }

    componentDidMount() {
        this.fecthTasks();
    }

    handleChange(e) {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">MERN STACK </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a> <span className="new badge" data-badge-caption="Tasks">{this.state.data.length}</span></a></li>
                        </ul>
                        
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                         <div className="row">
                                             <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="Task Title" onChange={this.handleChange} value={this.state.title} required />
                                             </div>
                                         </div>
                                         <div className="row">
                                             <div className="input-field col s12">
                                                 <textarea name="description" placeholder="Task Description" required
                                                 className="materialize-textarea" onChange={this.handleChange} value={this.state.description}></textarea>
                                             </div>
                                         </div>
                                         <button className="btn light-blue darken-4" type="submit">
                                             Send
                                         </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7 offset-s1">
                            <table className="responsive-table striped highlight">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((a) => (
                                        <tr key={a._id}>
                                            <td>{a.title}</td>
                                            <td>{a.description}</td>
                                            <td style={{width: '150px'}}> 
                                                <a className="waves-effect waves-light blue btn-small" onClick={() => this.edit(a._id)}>
                                                    <i className="material-icons">edit</i>
                                                </a>   &nbsp;
                                                <a className="waves-effect waves-light red btn-small"  onClick={() => this.deleteTasks(a._id)}>
                                                    <i className="material-icons">delete_sweep</i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;