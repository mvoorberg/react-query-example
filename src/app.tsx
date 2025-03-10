import { AppProvider } from './providers/app-provider';

function App() {
  console.log('App render');
  return (
    <main className="container p-4 mx-auto mt-8 lg:w-screen-lg">
      <AppProvider />
    </main>
  );
}

export default App;
