import "./App.css";
import AuthModal from "./components/auth/AuthModal";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import PublicRouter from "./routes/PublicRoutes";

function App() {
  return (
    <div>
      <>
        <Navbar />
        <PublicRouter/>
        <Footer />
      </>
      <AuthModal />
    </div>
  );
}

export default App;
