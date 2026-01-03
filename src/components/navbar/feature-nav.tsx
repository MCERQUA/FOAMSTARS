import { BsBuilding, BsGeoAlt, BsImage, BsStarHalf, BsTools, BsPatchCheck, BsFolderSymlink } from 'react-icons/bs'

export default function FeatureNav() {
  return (
        <section
            className="py-3 sticky-xxl-top sticky-xl-top sticky-lg-top d-none d-lg-block d-xl-block d-xxl-block"
            style={{
                background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                borderBottom: '1px solid rgba(255, 184, 0, 0.2)'
            }}
        >
            <nav id="scrollphyNav" className="featuresScrollphy">
                <ul className="nav nav-pills px-4 d-flex align-items-center justify-content-center gap-2 gap-xl-4">
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#descriptions"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsBuilding className="me-2" style={{ color: '#FFB800' }}/>Overview
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#services"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsTools className="me-2" style={{ color: '#FFB800' }}/>Services
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#portfolio"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsFolderSymlink className="me-2" style={{ color: '#FFB800' }}/>Portfolio
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#certifications"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsPatchCheck className="me-2" style={{ color: '#FFB800' }}/>Credentials
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#Galleries"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsImage className="me-2" style={{ color: '#FFB800' }}/>Gallery
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#maps"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsGeoAlt className="me-2" style={{ color: '#FFB800' }}/>Location
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link d-flex align-items-center px-3 py-2 rounded-pill"
                        href="#reviews"
                        style={{
                            color: 'rgba(255,255,255,0.7)',
                            background: 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#FFB800'
                            e.currentTarget.style.background = 'rgba(255, 184, 0, 0.1)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        <BsStarHalf className="me-2" style={{ color: '#FFB800' }}/>Reviews
                    </a>
                </li>
                </ul>
            </nav>
        </section>
  )
}
