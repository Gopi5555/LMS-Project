import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';

// Pages
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import CourseDashboard from './Pages/CourseDashBoard';
import AdminDashBoard from './Pages/AdminDashBoard';
import StudentDashboard from './Pages/StudentDashBoard';
import AddUsers from './Pages/AddUsers';
import UploadVideo from './Pages/UploadVideo';
import VideoPlayer from "./Pages/VideoPlayer";
import VideosList from './Pages/VideosList';
import AssignmentsPage from './Pages/AssignmentsPage';
import CreateAssignmentPage from './Pages/CreateAssignmentsPage';
import AboutPage from './Pages/AboutPage';
import UpdateUsers from './Pages/UpdateUsers';
import Students from './Pages/Student';
import AddCourse from './Pages/AddCourse';
import Course from './Pages/Course';
import UpdateCourse from './Pages/UpdateCourse';
import UploadNotes from './Pages/UploadNotes';
import ViewNotes from './Pages/ViewNotes';
import VideosLists from './Pages/VideosLists';
import CreateQuiz from './Pages/CreateQuiz';
import QuizList from './Pages/QuizList';
import AttemptQuizPage from './Pages/AttemptQuiz';
import Home from './Components/Home';
import Services from './Components/Services';
import FormSection from './Components/FormSection';
import Contact from './Components/Contact';
import Placement from './Components/Placement';
import CoursesPage from './Pages/CoursePage';
import CourseDashBoard from './Pages/CourseDashBoard';
import ServicesPage from './Pages/ServicesPage';

function App() {
  return (
    <Routes>

      {/* LOGIN (No Navbar) */}
      <Route path="/login" element={<LoginPage />} />

      <Route path='/' element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path='/formsection' element={<FormSection />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/placement' element={<Placement />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses" element={<CourseDashBoard />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />


      {/*  PUBLIC + DASHBOARD PAGES */}
      <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>} />
      <Route path="/videos" element={<Navbar><VideosList /></Navbar>} />
      <Route path="/video/:fileName" element={<Navbar><VideoPlayer /></Navbar>} />


      {/*  STUDENT */}
      <Route path="/student" element={<Navbar><StudentDashboard /></Navbar>} />
      <Route path="/assignments" element={<Navbar><AssignmentsPage /></Navbar>} />
      <Route path="/viewNotes" element={<Navbar><ViewNotes /></Navbar>} />

      {/*  ADMIN */}
      <Route path="/admin" element={<Navbar><AdminDashBoard /></Navbar>} />
      <Route path="/adduser" element={<Navbar><AddUsers /></Navbar>} />
      <Route path="/students" element={<Navbar><Students /></Navbar>} />
      <Route path="/addCourse" element={<Navbar><AddCourse /></Navbar>} />
      <Route path="/courseList" element={<Navbar><Course /></Navbar>} />
      <Route path="/updatecourse" element={<Navbar><UpdateCourse /></Navbar>} />
      <Route path="/uploadvideo" element={<Navbar><UploadVideo /></Navbar>} />
      <Route path="/createassignment" element={<Navbar><CreateAssignmentPage /></Navbar>} />
      <Route path="/addNotes" element={<Navbar><UploadNotes /></Navbar>} />
      <Route path="/updateuser" element={<Navbar><UpdateUsers /></Navbar>} />
      <Route path="/videosLists" element={<Navbar><VideosLists /></Navbar>} />
      <Route path="/createQuiz" element={<Navbar><CreateQuiz /></Navbar>} />
      <Route path="/quiz" element={<Navbar><QuizList /></Navbar>} />
      <Route path="/quiz/:id" element={<Navbar><AttemptQuizPage /></Navbar>} />


    </Routes>
  );
}

export default App;