import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import StudentsView from "./component/student/StudentsView";
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AddStudent from "./component/student/AddStudent";
import EditStudent from "./component/student/EditStudent";
import StudentPofile from "./component/student/StudentPofile";
import { ValidationProvider } from "./component/validation/ValidationContext";
import DeleteStudent from "./component/student/DeleteStudent";
import UpdateStudent from "./component/student/UpdateStudent";
import Footer from "./component/common/Footer";

function App() {
	return (
		<main className="container mt-5">
			<Router>
				<ValidationProvider>
				<NavBar />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}></Route>
					<Route
						exact
						path="/view-students"
						element={<StudentsView />}></Route>
					<Route
						exact
						path="/add-students"
						element={<AddStudent />}></Route>
					<Route
						exact
						path="/edit-student/:id"
						element={<EditStudent />}></Route>
						 <Route
              exact
              path="/update-student"
              element={<UpdateStudent />}
            ></Route>
					<Route
						exact
						path="/student-profile/:id"
						element={<StudentPofile />}></Route>
						            <Route exact path="/delete-student" element={<DeleteStudent />} /> {/* Add the route for deleting a student */}

				</Routes>
               <Footer/>
				</ValidationProvider>
			</Router>
		</main>
	);
}

export default App;
