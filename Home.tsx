/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicesIndia from './pages/ServicesIndia';
import ServicesInternational from './pages/ServicesInternational';
import ServiceDetail from './pages/ServiceDetail';
import Capabilities from './pages/Capabilities';
import CapabilityDetail from './pages/CapabilityDetail';
import About from './pages/About';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/india" element={<ServicesIndia />} />
          <Route path="services/international" element={<ServicesInternational />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="capabilities/:slug" element={<CapabilityDetail />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:id" element={<CaseStudyDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portal" element={<Portal />} />
          <Route path="admin" element={<Admin />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<div className="min-h-[60vh] flex items-center justify-center"><h1 className="text-2xl font-serif text-primary">404 - Page Not Found</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}
