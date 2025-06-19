import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx"
import Login from "./containers/Login.tsx"
import Signup from "./containers/Signup.tsx"
import NewNote from "./containers/NewNote.tsx"
import Notes from "./containers/Notes.tsx"

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />;
            <Route path="/signup" element={<Signup />} />
            {/* /notes/new has be be before /notes/:id 
            bc /notes/new will get matched by /notes/:id */}
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="/notes/:id" element={<Notes />} />
        </Routes>
    )
}