import Home from "../pages/Home/home";
import SignIn from "../pages/Auth/signIn";
import AboutUs from "../pages/AboutUs/aboutUs";
import ContactUs from "../pages/ContactUs/contactUs";

interface Route {
  path: string;
  component: React.ComponentType;
  protected?: boolean; // Optional: Define if the route requires authentication
  label: string;
}

const routes: Route[] = [
  { path: "/", component: Home, label: "Home" },
  { path: "/signin", component: SignIn, label: "Sign In" },
  { path: "/aboutus", component: AboutUs, protected: true, label: "About Us" },
  {
    path: "/contactus",
    component: ContactUs,
    protected: true,
    label: "Contact Us",
  },
];

export default routes;
