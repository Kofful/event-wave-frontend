import GlobalProviders from './GlobalProviders';
import Router from './router/Router';

function App() {
  return (
    <GlobalProviders>
      <Router />
    </GlobalProviders>
  );
}

export default App;
