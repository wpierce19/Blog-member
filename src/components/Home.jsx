import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="container-pico">
                <section>
                    <h2>Welcome to your (Insert website name here) Dashboard!</h2>
                    <p>
                        Insert a couple sentences about what dashboard is about
                    </p>
                </section>
            </section>
            <section>
                <h3>Key Features</h3>
                <ul>
                    <li>
                        Insert feature
                    </li>
                    <li>
                        Insert feature
                    </li>
                    <li>
                        Insert Feature
                    </li>
                    <li>
                        Ensure user that their content is safe
                    </li>
                </ul>
            </section>
            <section>
                <h3>Sign Up Today!</h3>
                <p>
                    Insert a motivation on why they should signup
                </p>
                <Link role="button" to="/sign-up">
                    Become a Member &nbsp;&#10140;
                </Link>
            </section>
        </>
    );
};

export default Home;