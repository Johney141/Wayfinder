import { useNavigate } from "react-router-dom"
import './LandingPage.css'
import ImageGallery from "./ImageGallery";


function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
        <nav className="nav-bar">
            <h1 id="org-title">Wayfinder</h1>
            <div className='navbar-buttons'>
            <button className="login"
                onClick={() => navigate('login')}
            >Login</button>
            <button className="get-started"
                onClick={() => navigate('signup')}
            >Get Started</button>
            </div>
        </nav>
        <main>
            <h2 className="title-section">Your Go-To Knowledge Hub for Policies and Procedure</h2>
            <ImageGallery />
        </main>
        </>
    )
}

export default LandingPage