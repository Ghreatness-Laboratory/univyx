import "./App.css";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div>
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
