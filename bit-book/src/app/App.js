import React, { Component } from 'react';
import './App.css';
import { Header } from './partials/Header';
import { Footer } from './partials/Footer';
import Feed from './feed/Feed';
import MyProfilePage from './myProfile/MyProfilePage';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Fragment } from 'react';
import PeoplePage from '../People/PeoplePage'
import FeedText from './feed/FeedText';
import FeedImages from './feed/FeedImages';
import FeedVideos from './feed/FeedVideos';
import SingleFeedItem from './singleFeedItem/SingleFeedItem';
import WelcomePage from './welcome/WelcomePage';
import { WelcomeHeader } from './welcome/WelcomeHeader';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }
  }

  logInLogOut = () => {
    let logInState = this.state.isLoggedIn;
    this.setState({
      isLoggedIn: !logInState
    })
  }

  render() {
    let loggedIn = localStorage.getItem("loggedIn");
    return (
      <div id="bit-book">
        {(this.state.isLoggedIn) ? (
          <Fragment>
            <Header logInLogOut={this.logInLogOut} />
            <div id="page-content">
              <Switch>
                <Route path="/home" component={Feed} />
                <Route path='/people' component={PeoplePage} />
                <Route path='/profile' component={MyProfilePage} />
                <Route path="/text" component={FeedText} />
                <Route path="/images" component={FeedImages} />
                <Route path="/videos" component={FeedVideos} />
                <Route path={"/post/:type/:id"} component={SingleFeedItem} />
                <Redirect from='/posts' to='/home' />
                <Redirect from='/' to='/home' />
              </Switch>
            </div>
          </Fragment>

        ) : (
            <Fragment>
              <WelcomeHeader />
              <Switch>
                <Route path='/' render={() => <WelcomePage logIn={this.logInLogOut} />} />

              </Switch>
            </Fragment>
          )}
        <Footer />
      </div >
    );
  }
}

export default App;