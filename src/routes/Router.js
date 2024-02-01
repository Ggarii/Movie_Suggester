import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovie from "../pages/ViewMovie";
import AddMovies from "../pages/AddMovies";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact/>
        <Route path="/view_movie/:id" component={ViewMovie} exact/>
        <Route path="/add" component={AddMovies} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/profile" component={Profile} exact/>

      </Switch>
    </BrowserRouter>
  );
};

export default Router;
