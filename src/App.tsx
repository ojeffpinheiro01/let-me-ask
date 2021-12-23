import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom';

import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/adm/rooms/:id" component={AdminRoom} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>

      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;