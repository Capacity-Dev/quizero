import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Quiz extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentQuiz:{},
            answer:0,
            loading:false
        };
        this.allquiz={};
        this.current=0;
        this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount() {
        this.getQuiz()
    }
      handleChange(event) {
          this.setState({answer:event.target.value});
          this.setState({ loading: true })
          this.verifyQuiz();
      }
    
      verifyQuiz() {
        let data={
            answer:parseInt(this.state.answer)
        }
        axios.post(`http://localhost:8000/api/quiz/verify/${this.state.currentQuiz.id}`,data).then(res => {
            const response =res.data;
            console.log(response)
            if(response.success){
                this.current+=1
                this.showQuiz()
            }else{
                this.showQuiz()
            }
        })
      }
      getQuiz() {
        axios.get(`http://localhost:8000/api/quiz`).then(res => {
            const allquiz =JSON.parse(res.data);
            this.allquiz=allquiz
            this.showQuiz()
            
        })
    }
    showQuiz(){
        this.setState({currentQuiz:this.allquiz[this.current]});
        this.setState({ loading: false })
    }
    render() {
        
        const loading = this.state.loading;
        return this.allquiz.length==0?(<div className="alert alert-secondary">
            <h2>Pas de Quiz pour l'instant</h2>
            <p>Vous pouvez essayer de creer un Qui en cliquant sur
                <Link to="/add-quiz" className="btn btn-primary" >Creer un Quiz</Link>
            </p>
        </div>):(
            <div className="container">
                {loading ? (
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>

                ) : (
                    <div className={'container justify-content-center'}>
                        <div className="card">
                            <div className="card-header">
                                {this.state.currentQuiz.question}
                            </div>
                            <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <span>Choisissez votre reponse :</span>
                                </div>
                                
                                <div className="form-check">
                                    <input name="answer" className="form-check-input" value="0" id="firsR" type="radio" onChange={this.handleChange} />
                                    <label className="form-check-label" htmlFor="firstR">{this.state.currentQuiz.first_answer}</label>
                                </div>
                                <div className="form-check">
                                    <input name="answer" className="form-check-input" value="1" id="secondR" type="radio" onChange={this.handleChange} />
                                    <label className="form-check-label" htmlFor="secondR">{this.state.currentQuiz.second_answer}</label>
                                </div>
                                <div className="form-check">
                                    <input name="answer" className="form-check-input" id="thirdR" value="2" type="radio" onChange={this.handleChange} />
                                    <label className="form-check-label" htmlFor="thirdR">{this.state.currentQuiz.third_answer}</label>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default Quiz