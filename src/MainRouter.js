import React, { useContext } from 'react'
import { Route, Routes, withRouter, NavLink } from 'react-router-dom'
import Home from './components/home/Home';
import SubmitPaper from './components/submission/SubmitPaper';
import InstructionsForAuthors from './components/simple/InstructionForAuthors';

// import Home from './components/Home'
// import TitleCard from './components/TitleCard';
import { UserContext } from './providers/UserProvider';
import EditorialBoard from './components/simple/EditorialBoard';
import FeedbackPage from './components/feedback/Feedback';
import Archives from './components/archives/AllArchives';
import AllSubmissions from './components/submission/AllSubmissions';

// import SubmitPaper from './components/submitPaper/SubmitPaper';
// import Submissions from './components/submitPaper/Submissions';
// import SubmissionFiles from './components/submitPaper/SubmissionFiles';
// import { auth } from './database'
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import { signOut } from 'firebase/auth';
// import UserSubmissions from './components/submitPaper/UserSubmissions';
function MainRouter() {
    const { user, isAuthenticated } = useContext(UserContext);
    return (
        <div>
            {/* <TitleCard /> */}
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/submit-paper" exact element={<SubmitPaper />} />
                <Route path="/my-profile" exact element={<SubmitPaper />} />
                <Route path="/instructions" exact element={<InstructionsForAuthors />} />
                <Route path="/editorial" exact element={<EditorialBoard />} />
                <Route path="/feedback" exact element={<FeedbackPage />} />
                <Route path="/archives" exact element={<Archives />} />
                <Route path="/submissions" exact element={<AllSubmissions />} />
                {/* <Route path="/signup" exact component={Signup} />
                <Route path="/submissions" exact component={Submissions} />
                <Route path="/submissions/:id" exact component={SubmissionFiles} />
                <Route path="/my-submissions" exact component={UserSubmissions} /> */}
            </Routes>
        </div>
    )
}

export default MainRouter
