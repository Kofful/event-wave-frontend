import GlobalProviders from './GlobalProviders';
import Router from './Router';

function App() {
  return (
    <GlobalProviders>
      <Router />
    </GlobalProviders>
  );
}

export default App;
