import "./Home.css"
import { Link } from "react-router-dom"

export default function Home ()
{
    return (
        <div className="main-home">
            <div className="btn-box">
                <Link to="/map">
                Fetch by location
                </Link>
                <Link to="/address">
                Get location Manually
                </Link>
            </div>
        </div>
    )
}