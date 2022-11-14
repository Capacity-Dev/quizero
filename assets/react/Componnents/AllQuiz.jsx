import React, { Component } from "react";
import axios from "axios";
import '../css/AllQuiz.css';
import { Link } from "react-router-dom";
class AllQuiz extends Component{
    constructor() {
        super();
        
        this.state = { allquiz: [], loading: true}
    }
    componentDidMount() {
        this.getQuiz();
    }

    getQuiz() {
        axios.get(`http://localhost:8000/api/quiz`).then(res => {
            const allquiz =JSON.parse(res.data);
            this.setState({ allquiz, loading: false })
        })
    }
    deleteQuiz(id){
        this.state.loading=true
        axios.delete(`http://localhost:8000/api/quiz/${id}`).then(res => {
            const allquiz=this.state.allquiz.filter(quiz=>quiz.id != id)
            this.setState({ allquiz, loading: false })
        })
    }
    render() {
        
        const loading = this.state.loading;
        return (
            <div>
                <section >
                    
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center">Liste des Quiz disponible</h2>
                        </div>

                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>

                        ) : (
                            
                            <div className={'row d-flex'}>
                               
                                {this.state.allquiz.map(quiz =>
                                    <div className="col-md-10 offset-md-1 card" key={quiz.id}>
                                        <div className="card-body">
                                            <h4>{quiz.question}</h4>
                                        </div>
                                        <div className="container">
                                                <Link to={'/quiz/'+quiz.id} className="btn btn-primary">Repondre</Link>
                                                <Link to={'/edit/?id='+quiz.id} className="btn btn-warning">Modifier</Link>
                                                <button onClick={()=>{this.deleteQuiz(quiz.id)}}className="btn btn-danger">Supprimer</button>
                                        </div>
                                    </div>)}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}
export default AllQuiz