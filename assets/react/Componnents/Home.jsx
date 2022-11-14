import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import AllQuiz from "./AllQuiz.jsx";
import EditQuiz from "./EditQuiz.jsx";
import Quiz from "./Quiz.jsx";
class Home extends Component{
    render(){
        
        return <Router>
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Quizer</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/manage">Gerer les Quiz</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-quiz">Creer um Quiz</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
                <Routes>
                    <Route exact path="/" element={<Quiz/>}/>
                    <Route exact name='add' path="/add-quiz" element={<EditQuiz action="create"/>}/>
                    <Route exact path="/edit" element={<EditQuiz action="update"/>}/>
                    <Route exact path="/manage" element={<AllQuiz/>}/>
                </Routes>
            </div>
    </Router>
    }
}
export default Home