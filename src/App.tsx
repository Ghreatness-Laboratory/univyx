import "./App.css";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div>
      <>
        <Navbar />
        <AppRouter />
        <Footer />
      </>
      <AuthModal />
    </div>
  );
}

export default App;
