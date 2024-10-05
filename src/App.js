import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import LoginSignup from "./components/pages/Login-Signup";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddBook from "./components/users/AddBook";
import EditBook from "./components/users/EditBook";
import Book from "./components/users/User";
import EditAuthors from "./components/users/EditAuthors";
import Authors from "./components/users/Authors";
import AddAuthor from "./components/users/AddAuthor";



function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/taleas" component={()=> (<h1> new studnent</h1>)} />
          <Route exact path="/contact" component={Contact} />
          {/*<Route exact path="/profile" component={ProfilePage}/>*/}
          <Route exact path="/book/add" component={AddBook} />
          <Route exact path="/author/add" component={AddAuthor} />
          <Route exact path="/users/edit/:id" component={EditBook} />
          <Route exact path="/author/edit/:id" component={EditAuthors}/>
          <Route exact path="/authors/:id" component={Authors}/>
          <Route exact path="/users/:id" component={Book} />
          <Route exact path="/Login-Signup" component={LoginSignup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
