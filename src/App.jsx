// Flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Start from './Start';
import Register from './Register';

const App = () => {

    return(
          <Switch>
            <Route exact path='/' component={Start} />
            <Route path='/register' component={Register} />
          </Switch>)

}

export default App;
