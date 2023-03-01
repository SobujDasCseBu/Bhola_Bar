import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Tittle from "./components/Navbar/Tittle";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import NotExists from "./pages/NotExists";
import Login from "./pages/Login/Login";
import AboutUs from "./pages/about/AboutUs";
import News from "./pages/News/News";
import NewsDetails from "./pages/News/NewsDetails";
import Events from "./pages/Events/Events";
import Contact from "./pages/contact/Contact";
import UserDetails from "./components/userDetials/userDetails";
import Profile from "./pages/profile/Profile";

import "./common.css";

import Constitution from "./pages/about/Constitution";
import History from "./pages/about/History";
import MissionAndVision from "./pages/about/MissionAndVision";
import Activities from "./pages/about/Activities";
import OfficeStaff from "./pages/about/OfficeStaff";
import Search from "./pages/Search";
import Images from "./pages/gallery/Images";
import NoticePage from "./pages/notice/Notice";
//import CecMessage from "./pages/election/CecMessage";
import EcPresentCo from "./pages/committee/EcPresent";
import SubCommittee from "./pages/committee/SubCommittee";
import ExExecutiveCommittee from "./pages/committee/ExExecutiveCommittee";
import Library from "./pages/Library";
import Videos from "./pages/gallery/Videos";
import CECMessageNew from "./pages/election/CECMessageNew";
import ElectionCommission from "./pages/election/ElectionCommission";
import ElectionNotice from "./pages/election/ElectionNotice";
import ExCEC from "./pages/election/ExCEC";
import VoterList from "./pages/election/VoterList";
import ActiveMember from "./pages/member/ActiveMember";
import DeadMember from "./pages/member/DeadMember";
import TransferredMember from "./pages/member/TransferredMember";
import RetiredMember from "./pages/member/RetiredMember";
import Defaulter from "./pages/member/Defaulter";
import SearchingMemberList from "./pages/membersearch/SearchingMemberList";
import Dashboard from "./pages/dashboard/Dashboard";
import SubCommitteeEdit from "./pages/dashboard/SubCommitteeEdit";
import Members from "./pages/dashboard/Members";
import Committee from "./pages/committee/Committee";
import AdminEdit from "./pages/dashboard/AdminEdit";
import AddNewCommittee from './components/AddNewCommittee';
import GalleryEdit from "./pages/dashboard/GalleryEdit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UpdateCommittee from "./components/UpdateCommittee";
import HomeSliderEdit from "./pages/dashboard/HomeSliderEdit";

const MainLayout = ({ title, setTitle }) => (
  <>
    <Tittle />
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile-details" exact element={<Profile />} />

          <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />

          <Route path="/about" exact element={<AboutUs />} />
          <Route path="/constitution" exact element={<Constitution />} />
          <Route path="/history" exact element={<History />} />
          <Route path="/mission" exact element={<MissionAndVision />} />
          <Route path="/activities" exact element={<Activities />} />
          <Route path="/office-staff" exact element={<OfficeStaff />} />

          <Route path="/sub-committee" exact element={<SubCommittee />} />
          <Route
            path="/ex-executive-committee"
            exact
            element={<ExExecutiveCommittee />}
          />

          <Route
            path="/search"
            exact
            element={<Search headerTitle="Search results show..." />}
          />

          <Route path="/active-member" exact element={<ActiveMember />} />
          <Route path="/dead-member" exact element={<DeadMember />} />
          <Route
            path="/transferred-member"
            exact
            element={<TransferredMember />}
          />
          <Route path="/retired-member" exact element={<RetiredMember />} />
          <Route path="/defaulter" exact element={<Defaulter />} />

          <Route path="/user-details" exact element={<UserDetails />} />

          <Route path="/library" element={<Library />} />
          <Route path="/news/:newsId" element={<NewsDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/court" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/ec-2022-2023" element={<EcPresentCo />} />

          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/chief-election-commissioner"
            element={<CECMessageNew />}
          />
          <Route path="/election-commission" element={<ElectionCommission />} />
          <Route path="/election-notice" element={<ElectionNotice />} />
          <Route path="/ex-cec" element={<ExCEC />} />
          <Route path="/voter-list" element={<VoterList />} />
          <Route path="/search-member-list" element={<SearchingMemberList />} />

          <Route path="/admin/home-slider" element={<HomeSliderEdit />} />
          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/edit-gallery" element={<GalleryEdit />} />
          <Route path="/admin/validate-admin" element={<AdminEdit />} />
          <Route path="/admin/sub-committee" element={<SubCommitteeEdit />} />
          <Route path="/dashboard/committee" element={<Committee/>} />
          <Route path="/dashboard/add-new-committee" element={<AddNewCommittee />} />
          <Route path="/dashboard/updateCommittee/:id" element={<UpdateCommittee/>} />
        </Route>
        <Route path="*" element={<NotExists />} />
      </Routes>
    </Router>
  );
}

export default App;
