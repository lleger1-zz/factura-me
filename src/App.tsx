import { AppRouter } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
