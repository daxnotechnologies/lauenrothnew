import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import ProtectedRoute from './Context/ProtectedRoute';

import BlogPage from './pages/BlogPage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import AddCategory from './pages/Courses/AddCategory';
import Companies from './pages/Company/Companies';
import CompanyUsers from './pages/Company/Users/Users';
import CompanyUserSettings from './pages/Company/Users/Settings';
import CompanyContent from './pages/Company/Content/Content';
import Settings from './pages/Company/Settings';
import Chat from './pages/Chat';
import Courses from './pages/Courses/Courses';
import ViewCourse from './pages/Courses/ViewCourse';
import AddAdmin from './pages/AddAdmin';
import ThankyouPage from './pages/AuthPages/ThankyouPage';
import ContactPage from './pages/AuthPages/ContactPage';
import HomePage from './pages/HomePage';
import SetRolePermissions from './pages/SetRolePermissions';
import Account from './pages/AccountSettings/Account';
import EditAccount from './pages/AccountSettings/EditAccount';
import AddCourse from './pages/Courses/AddCourse';
import ViewPost from './pages/Company/Content/Posts/ViewPost';
import AddPost from './pages/Company/Content/Posts/AddPost';
import AddMessages from './pages/Company/Content/Messages/AddMessages';
import ViewMessage from './pages/Company/Content/Messages/ViewMessage';
import Billings from './pages/Billing/Billings';
import AddPlan from './pages/Plans.js/AddPlan';
import Plans from './pages/Plans.js/Plans';
import AddSurvey from './pages/Company/Content/Survey/AddSurvey';
import AddCompany from './pages/Company/AddCompany';
import AddUser from './pages/Company/Users/AddUser';
import Feedbacks from './pages/Feedbacks/Feedbacks';
import ViewSurvey from './pages/Company/Content/Survey/ViewSurvey';
import SurveyForm from './pages/Company/Content/Survey/SurveyForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LogoutRoute from './pages/LogoutRoute';
import TermsAndConditions from './pages/TermsAndConditions';
import Imprint from './pages/Imprint';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <HomePage /> },
        { path: 'company/addcompany', element: <AddCompany /> },
        { path: 'company/editcompany/:id?', element: <AddCompany /> },
        { path: 'addadmin', element: <AddAdmin /> },
        { path: 'category', element: <AddCategory /> },
        { path: 'company/companies', element: <Companies /> },
        { path: 'company/company_settings/:id?', element: <Settings /> },
        { path: 'company/comapny_users/:id', element: <CompanyUsers /> },
        { path: 'company/comapny_user_settings/:id', element: <CompanyUserSettings /> },
        { path: 'company/comapny_content/:id', element: <CompanyContent /> },
        { path: 'company/add_company_user/:companyId/:id?', element: <AddUser /> },
        { path: 'company/edit_company_user/:id?', element: <AddUser /> },
        { path: 'company/view_post/:id?', element: <ViewPost /> },
        { path: 'company/edit_post/:companyid/:id', element: <AddPost /> },
        { path: 'company/add_post/:companyid', element: <AddPost /> },
        { path: 'company/add_message/:companyid/:id?', element: <AddMessages /> },
        { path: 'company/view_message/:companyid/:id?', element: <ViewMessage /> },
        { path: 'company/add_survey/:id?', element: <AddSurvey /> },
        { path: 'company/view_survey/:id?', element: <ViewSurvey /> },
        { path: 'company/submit_survey/:id?', element: <SurveyForm /> },
        { path: 'courses', element: <Courses /> },
        { path: 'courses/addcateroy/:id?', element: <AddCategory /> },
        { path: 'courses/view_courses/:id', element: <ViewCourse /> },
        { path: 'courses/add_course/:id?', element: <AddCourse /> },
        { path: 'courses/addcourses/:DocId?', element: <AddCourse /> },

        { path: 'plans', element: <Plans /> },
        { path: 'plans/add_plan/:id?', element: <AddPlan /> },

        // { path: 'role_permissions', element: <SetRolePermissions /> },
        // { path: 'chat', element: <Chat /> },
        // { path: 'feedbacks', element: <Feedbacks /> },
        { path: 'billings', element: <Billings /> },
        { path: 'app/settings', element: <Account /> },

        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'logout', element: <LogoutRoute /> },

    {
      path: 'privacy',
      element: <PrivacyPolicy />,
    },
    {
      path: 'terms',
      element: <TermsAndConditions />,
    },
    {
      path: 'imprint',
      element: <Imprint />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'thank-you',
      element: <ThankyouPage />,
    },
    {
      path: 'contact',
      element: <ContactPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
