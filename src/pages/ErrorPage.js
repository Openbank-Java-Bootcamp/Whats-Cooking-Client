import catchef from "../assets/catchef.jpg"

function ErrorPage() {

    return (
        <div className="error-page">
            <h1>This page does not exist.</h1>
            <img src={catchef} />
        </div>
    );
}

export default ErrorPage;