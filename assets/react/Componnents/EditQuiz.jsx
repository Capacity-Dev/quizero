import React, { Component } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import buildGET from "../libs/get"; '../libs/get'
class EditQuiz extends Component{
    constructor(props) {
        super(props);
        this.state = {
                question:'',
                first_answer:'',
                second_answer:'',
                third_answer:'',
                true_answer:0,
            loading:false
        };
        this.id=0
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount() {
        let get=buildGET()
        console.log(get)
        let id=get['id']
        this.id=id
        this.props.action=='update'?this.getQuiz(id):false
    }
      handleChange(event) {
        const name=event.target.name
        this.setState({[name]:event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        let data=this.state
        data.loading=undefined
        if(this.props.action=='update'){

            axios.put(`http://localhost:8000/api/quiz/${this.id}`,data).then(res => {
                window.location.replace('/');
            })
        }else{

            axios.post(`http://localhost:8000/api/quiz`,data).then(res => {
                window.location.replace('/');
            })
        }
      }
      getQuiz(id){
        axios.get(`http://localhost:8000/api/quiz/${id}`).then(res => {
            console.log(res.data)
            const data =res.data;
            this.setState(data)
        })
      }
    render() {
        
        const loading = this.state.loading;
        return (
            <div>
                <section className="row-section">
                    <div className="container">

                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>

                        ) : (
                            <div className={'row justify-content-center'}>
                                <div className="card col-lg-6">
                                    <div className="card-header">
                                        <h2 className="text-center">Creer un quiz</h2>
                                    </div>
                                    <div className="card-body">

                                        <form action="#" onSubmit={this.handleSubmit} className="" method="post">
                                            <div className="mb-3">
                                                <label htmlFor="question">
                                                    La question
                                                </label>
                                                <input type="text" className="form-control" value={this.state.question} onChange={this.handleChange} name="question" id="question" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="firstAnswer">
                                                    La premiere reponse
                                                </label>
                                                <input type="text" className="form-control" value={this.state.first_answer} onChange={this.handleChange} name="first_answer" id="firstAnswer" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="secondAnswer">
                                                La deuxieme reponse
                                                </label>
                                                <input type="text" className="form-control" value={this.state.second_answer} onChange={this.handleChange} name="second_answer" id="secondAnswer" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="thirdAnswer">
                                                La troixieme reponse
                                                </label>
                                                <input type="text" className="form-control" value={this.state.third_answer} onChange={this.handleChange} name="third_answer" id="thirdAnswer" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="trueAnswer">
                                                La vraie reponse
                                                </label>
                                                <input type="number" className="form-control" value={this.state.true_answer} onChange={this.handleChange} name="true_answer" id="trueAnswer" required/>
                                            </div>
                                            <div className="mb-3">
                                                <input type="submit" value="Creer le quiz" className="btn btn-success" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}
export default EditQuiz