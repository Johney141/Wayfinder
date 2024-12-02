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
        <main className="landing-body">
            <h2 className="title-section">Your Go-To Knowledge Hub for Policies and Procedure</h2>
            <ImageGallery />
            <p className="landing-text">Empower your team with instant access to the knowledge they need. Our centralized platform is designed to simplify how your business shares procedures, policies, and insights. Whether you're onboarding new employees or keeping seasoned professionals up-to-date, our intuitive search and organized content structure make finding information effortless.</p>
            <button className="get-started body-button"
                onClick={() => navigate('signup')}
            >Get Started</button>
        </main>
        </>
    )
}

export default LandingPage