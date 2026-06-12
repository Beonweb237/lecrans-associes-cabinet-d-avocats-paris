import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Expertises from './pages/Expertises'
import ExpertiseDetail from './pages/ExpertiseDetail'
import Equipe from './pages/Equipe'
import AvocatProfile from './pages/AvocatProfile'
import Publications from './pages/Publications'
import Actualites from './pages/Actualites'
import Carrieres from './pages/Carrieres'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertises" element={<Expertises />} />
        <Route path="/expertises/:slug" element={<ExpertiseDetail />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/equipe/:slug" element={<AvocatProfile />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/carrieres" element={<Carrieres />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
