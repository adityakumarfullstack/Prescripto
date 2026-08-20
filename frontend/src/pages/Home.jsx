import Banner from "../components/banner/Banner"
import Hero from "../components/hero/Hero"
import Speciality from "../components/speciality/Speciality"
import TopDoctors from "../components/topDoctors/TopDoctors"

const Home = () => {
    return (
        <main>
            <section className="hero-section">
                <div className="container">
                    <Hero />
                </div>
            </section>
            <section className="speciality-section" id="speciality-section">
                <div className="container">
                    <Speciality />
                </div>
            </section>
            <section className="top-doctors-section">
                <div className="container">
                    <TopDoctors />
                </div>
            </section>
            <section className="banner-section">
                <div className="container">
                    <Banner />
                </div>
            </section>
        </main>
    )
}

export default Home