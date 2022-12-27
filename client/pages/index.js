import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get("/api/users/currentuser");

    return data;
};

export default LandingPage;
