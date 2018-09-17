import React, { Component } from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            _id         : '',
            title       : '',
            description : '',
            txtButton   : 'Send',
            tasks       :[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.addTask      = this.addTask.bind(this);
        this.fetchTasks   = this.fetchTasks.bind(this);
        this.deleteTask   = this.deleteTask.bind(this);
        this.editTask     = this.editTask.bind(this);
        this.clearState   = this.clearState.bind(this);
    }

    addTask(e){
        if ( this.state._id )
        {
            fetch(`/api/tasks/${this.state._id}`, { //ruta del controller
                method : 'PUT', //metodo put para actualizar datos
                body   : JSON.stringify(this.state), //convertir un objeto a string
                headers : { //tippo de datos que se van a enviar
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
                .then(res => res.json()) //entonces cuando haga la peticion va optener una respuesta convirtiendo los datos a formato json
                .then(data => { //hacemos algo con los datos convertidos en json
                    M.toast({html : data.status}); //alerta de materialize con valor del status del controlador
                    this.clearState();
                    this.fetchTasks();
                });
        }
        else{
            fetch('/api/tasks', { //ruta del controller
                method : 'POST', //metodo post para enviar los datos
                body   : JSON.stringify(this.state), //convertir un objeto a string
                headers : { //tippo de datos que se van a enviar
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
                .then(res => res.json()) //entonces cuando haga la peticion va optener una respuesta convirtiendo los datos a formato json
                .then(data => { //hacemos algo con los datos convertidos en json
                    M.toast({html : data.status}); //alerta de materialize con valor del status del controlador
                    this.clearState();
                    this.fetchTasks();
                });
        }

        e.preventDefault();
    }

    componentDidMount(){ //metodo de react para cuando apenas carge la aplicacion carge el componente o lo monte
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tasks : data
                });
            });
    }

    handleChange(e){ //evento para setetar el estado cada vez que los input cambien de estado
        const {name , value} = e.target; //se crean las variables almacenando el name y value de cada input
        this.setState({
            [name] : value //se edita el estado en especifico relacionado con el name
        });
    }

    deleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method : 'DELETE', //metodo delete para eliminar datos
            body   : JSON.stringify(this.state), //convertir un objeto a string
            headers : { //tippo de datos que se van a enviar
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({html : data.status});
                this.fetchTasks();
            });
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    _id         : data._id,
                    title       : data.title,
                    description : data.description,
                    txtButton   : 'Edit',
                })
            });
    }

    clearState(){ //evento para setear al valor inicial el state
        this.setState({
            _id         : '',
            title       : '',
            description : '',
            txtButton   : 'Send'
        });
    }

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" autoComplete="off" onChange={this.handleChange} value={this.state.title} placeholder="Task Title" name="title"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field s12">
                                                <textarea onChange={this.handleChange} value={this.state.description} className="materialize-textarea" placeholder="Description" name="description"></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4">{this.state.txtButton}</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td className="row">
                                                        <button onClick={ () => this.deleteTask(task._id) } className="btn light-blue darken-4"><i className="material-icons">delete</i></button>
                                                        <button onClick={ () => this.editTask(task._id) } className="btn light-blue darken-4" style={{margin : '5px'}}><i className="material-icons">edit</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
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
