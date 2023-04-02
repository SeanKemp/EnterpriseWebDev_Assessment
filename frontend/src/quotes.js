import { Link } from "react-router-dom";

export default function Quotes() {
    return (
        <div class="container formStyle">
            <div class="row">
                <h1>Quotes</h1>
                <p>To save a quote that has been generated and view saved quotes you must login or register an account before creating a quote.</p>
                <p>However you can still generate a quote without needing an account by following the below instructions.</p>
            </div>
            <div class="row">
                <label for="login">To create your own Quote please click the button below:</label><br/>
                <Link class="btn btn-md btn-primary" to='/createQuote'>Create Quote</Link>
                {/* <a role="button" href="createQuote" id="createQuote" class="btn btn-md btn-primary">Create Quote</a> */}
            </div>
        </div>
    );
}
  