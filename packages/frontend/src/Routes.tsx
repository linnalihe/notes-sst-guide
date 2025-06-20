import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx"
import Login from "./containers/Login.tsx"
import Signup from "./containers/Signup.tsx"
import NewNote from "./containers/NewNote.tsx"
import Notes from "./containers/Notes.tsx"
import Settings from "./containers/Settings.tsx"
import AuthRequiredRoute from "./components/AuthRequiredRoute.tsx";
import AuthExistsRedirect from "./components/AuthExistsRedirect.tsx";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthExistsRedirect><Login /></AuthExistsRedirect>} />
            <Route path="*" element={<NotFound />} />;
            <Route path="/signup" element={<AuthExistsRedirect><Signup /></AuthExistsRedirect>} />
            <Route path="/settings" element={<AuthRequiredRoute><Settings /></AuthRequiredRoute>} />
            {/* /notes/new has be be before /notes/:id 
            bc /notes/new will get matched by /notes/:id */}
            <Route path="/notes/new" element={<AuthRequiredRoute><NewNote /></AuthRequiredRoute>} />
            <Route path="/notes/:id" element={<AuthRequiredRoute><Notes /></AuthRequiredRoute>} />
        </Routes>
    )
}