import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddBook from "./components/users/AddBook";
import EditBook from "./components/users/EditBook";
import Book from "./components/users/User";
import EditAuthors from "./components/users/EditAuthors";
import Authors from "./components/users/Authors";
import AddAuthor from "./components/users/AddAuthor";

import { Amplify } from "aws-amplify";
import {Authenticator, ThemeProvider, useAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  return (
      <ThemeProvider>
        <Router>
          <Authenticator.Provider>
            <AppContent />
          </Authenticator.Provider>
        </Router>
        </ThemeProvider>
  );
}

function AppContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user, context.signOut]);

  return (
      <div className="App">
        <Navbar signOut={signOut} user={user} />
        <Switch>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Authenticator />}
          </Route>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/book/add" component={AddBook} />
          <Route exact path="/author/add" component={AddAuthor} />
          <Route exact path="/users/edit/:id" component={EditBook} />
          <Route exact path="/author/edit/:id" component={EditAuthors} />
          <Route exact path="/authors/:id" component={Authors} />
          <Route exact path="/users/:id" component={Book} />
          <Route component={NotFound} />
        </Switch>
      </div>
  );
}

export default App;
