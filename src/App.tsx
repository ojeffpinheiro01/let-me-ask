import { createContext, useState } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom';

export const AppContext = createContext({} as any);

function App() {
  const [value, setValue] = useState('ttt')
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ value, setValue }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AppContext.Provider>

    </BrowserRouter>
  );
}

export default App;