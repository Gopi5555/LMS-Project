import HomeNavbar from "../Components/HomeNavbar";
import Footer from "../Components/Footer";
import CourseDashBoard from "./CourseDashBoard";

function CoursesPage() {
  return (
    <>
      <HomeNavbar />
      <h2 style={{ textAlign: "center" }}>All Courses</h2>
      <CourseDashBoard />
      <Footer />
    </>
  );
}

export default CoursesPage;