import { InvoiceProvider } from "./context/InvoiceProvider";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <InvoiceProvider>
        <AppRouter />
      </InvoiceProvider>
    </>
  );
}

export default App;
