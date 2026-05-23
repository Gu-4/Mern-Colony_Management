import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function About() {
  const [activeTab, setActiveTab] = useState("grocery");
  return (
    <div className="page-wrapper">

      { /* Back-to-top start */}
      {/* <div className="back-to-top-wrapper">
        <button id="back_to_top" type="button" className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="fa-solid fa-caret-up" />
        </button>
      </div> */}

      {/* ================= PAGE TITLE ================= */}
      <section className="page-title" style={{ backgroundImage: "url(/assets/images/background/Colony.png)" }}>
        <div className="auto-container">
          <div className="title-outer text-center">
            <div className="h1 title">About Us</div>
            <ul className="page-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </section>
      {/* ===============About Colony Intro Section========== */}
      <section className="about-section p-5 m-1">
        <div className="shape-1">
          <img src="/assets/images/icons/shape-2.png" alt="" />
        </div>

        <div className="auto-container">
          <div className="row">

            {/* Content Column */}
            <div className="content-column col-xl-12">
              <div className="inner-column wow fadeInUp">

                <div className="sec-title text-center">
                  <div className="h6 sub-title">About Our Colony</div>

                  <div className="h2 title char-animation">
                    A Modern & Secure Residential Community
                  </div>

                  <div className="text">
                    This is a residential colony designed to offer its residents a harmonious blend of modern living,
                    comfort, and community. Nestled in a prime location, <b>EliteEnclave</b> is home to hundreds of families
                    who enjoy world-class amenities, round-the-clock security, and a vibrant community lifestyle.
                    Our colony is more than just a place to live — it is a place to belong.
                  </div>
                </div>

                {/* Image Grid */}
                <div className="row g-4 mt-4">

                  <div className="col-lg-4 col-md-6">
                    <div className="image-box">
                      <img
                        src="/assets/images/View.jpeg"
                        className="img-fluid w-100 about-gallery-img"
                        alt="Colony View"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="image-box">
                      <img
                        src="/assets/images/gate.jpeg"
                        className="img-fluid w-100 about-gallery-img"
                        alt="Colony Entrance"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="image-box">
                      <img
                        src="/assets/images/Park.jpeg"
                        className="img-fluid w-100 about-gallery-img"
                        alt="Park Area"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section pt-100 pb-70">
        <div className="auto-container">

          <div className="sec-title text-center">
            <div className="h6 sub-title">Who We Are</div>
            <div className="h2 title">Smart Colony Management Platform</div>
          </div>

          <div className="text text-center" style={{ maxWidth: 900, margin: "auto" }}>
            We are building a digital ecosystem that connects residents, security staff, and management
            in one place. From complaints to visitor tracking, everything is automated and transparent.
          </div>

        </div>
      </section>
      <section className="funfact-section pb-70">
        <div className="auto-container">
          <div className="row text-center">

            <div className="col-md-3 col-6">
              <h2>500+</h2>
              <p>Active Residents</p>
            </div>

            <div className="col-md-3 col-6">
              <h2>24/7</h2>
              <p>Security Monitoring</p>
            </div>

            <div className="col-md-3 col-6">
              <h2>100%</h2>
              <p>Transparent Billing</p>
            </div>

            <div className="col-md-3 col-6">
              <h2>Fast</h2>
              <p>Complaint Resolution</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FACILITIES SECTION ================= */}
      <section className="services-section colony-facilities">
        <div className="shape-1">
          <img src="/assets/images/icons/shape-14.png" alt="" />
        </div>

        <div className="auto-container">

          <div className="sec-title text-center">
            <div className="h6 sub-title">Community Facilities</div>
            <div className="h2 title">Life Inside Elite Colony</div>
          </div>

          <div className="row g-4">

            {/* CARD 1 */}
            <div className="col-lg-4 col-md-6 d-flex equal-card">
              <div className="facility-card w-100">

                <div className="facility-image">
                  <img
                    src="/assets/images/swimming.jpeg"
                    alt="Swimming Pool"
                    className="about-gallery-img"
                  />
                </div>

                <div className="facility-content">
                  <div className="icon">
                    <i className="flaticon-set-swimming-pool" />
                  </div>

                  <h4>Swimming Pool</h4>

                  <p>
                    A well-maintained swimming pool designed for relaxation, fitness, and family recreation.
                  </p>
                </div>

              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-lg-4 col-md-6 d-flex equal-card">
              <div className="facility-card w-100">

                <div className="facility-image">
                  <img src="/assets/images/child_park.jpeg" alt="Park" className="about-gallery-img" />
                </div>

                <div className="facility-content">
                  <div className="icon"><i className="flaticon-set-location" /></div>
                  <h4>Children Parks</h4>
                  <p> A safe and beautifully landscaped play area designed for children,
                    featuring open spaces, greenery, and walking paths for families.</p>
                </div>

              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-lg-4 col-md-6 d-flex equal-card">
              <div className="facility-card w-100">

                <div className="facility-image">
                  <img
                    src="/assets/images/gym.jpeg"
                    alt="Gym"
                    className="about-gallery-img"
                  />
                </div>

                <div className="facility-content">
                  <div className="icon">
                    <i className="flaticon-set-dumbbell" />
                  </div>

                  <h4>Gym</h4>

                  <p>
                    A fully equipped fitness center designed to support a healthy and active lifestyle for residents.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section >

      {/* ================= VIDEO SECTION ================= */}
      < section className="video-section" >
        <div className="outer-box mt-0">
          <div className="bg-image">
            <img src="/assets/images/resource/video1-1.jpg" alt="" />
          </div>

          <div className="video-box wow fadeInUp">
            <a className="play-now-one play-now" href="#">
              <i className="fa-solid fa-play"></i>
            </a>
            <div className="h2 title">
              Smart Colony <br /> Living Experience
            </div>
          </div>
        </div>
      </section >

      {/* ================= MISSION VISION ================= */}
      < section className="services-section-three" >
        <div className="auto-container">

          <div className="sec-title text-center">
            <div className="h6 sub-title">Our Purpose</div>
            <div className="h2 title">Mission, Vision & Values</div>
          </div>

          <div className="row row-cols-xl-3 gx-4">

            <div className="column col d-flex wow fadeInUp">
              <div className="service-block-three sb">
                <div className="inner-block">
                  <div className="icon"><i className="fa-solid fa-crosshairs"></i></div>
                  <div className="h4 title">Mission</div>
                  <div className="text">To provide a safe, clean, and well-managed residential environment where every resident feels valued, heard, and connected — through transparent governance, modern facilities, and a spirit of community.</div>
                </div>
              </div>
            </div>

            <div className="column col wow fadeInUp">
              <div className="service-block-three sb">
                <div className="inner-block">
                  <div className="icon"><i className="fa-solid fa-lightbulb"></i></div>
                  <div className="h4 title">Vision</div>
                  <div className="text">To be the most trusted and admired residential colony — setting the benchmark for premium community living through innovation, integrity, and inclusive management.</div>
                </div>
              </div>
            </div>

            <div className="column col wow fadeInUp">
              <div className="service-block-three sb">
                <div className="inner-block">
                  <div className="icon"><i className="flaticon-set-building" /></div>
                  <div className="h4 title">Establishment</div>
                  <div className="text">EliteEnclave was established with a vision to create a self-sufficient and premium-like residential community. Over the years, we have grown from a small housing society into a thriving colony of 450+ families - all united by a shared commitment to excellence and community living.</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section >

      {/* ================= Near Us========================== */}
      {/* Location Highlights Section */}
      <section className="services-section-three bg-color-op-5">
        <div className="shape-1">
          <img src="/assets/images/icons/shape-1.png" alt="" />
        </div>

        <div className="auto-container">

          {/* Title */}
          <div className="sec-title text-center">
            <div className="h6 sub-title">Location Highlights</div>
            <div className="h2 title char-animation">
              Everything You Need, All Around EliteEnclave
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-nav mb-4 border-bottom pb-4 d-flex gap-4 justify-content-center flex-wrap">

            {["grocery", "dining", "transport", "education", "healthcare"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? "tab-btn--active" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}

          </div>

          {/* Content */}
          <div className="row g-4 ms-2 ps-4">

            {/* GROCERY */}
            {activeTab === "grocery" && (
              <>
                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-cart-shopping" /></div>
                      <div className="h4 title">EliteEnclave Market</div>
                      <div className="text">5 min walk - Daily essentials inside colony</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-store" /></div>
                      <div className="h4 title">Nearby Supermarket</div>
                      <div className="text">10 min drive - All grocery needs available</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-basket-shopping" /></div>
                      <div className="h4 title">Local Vendors</div>
                      <div className="text">Fresh vegetables & daily supplies nearby</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* DINING */}
            {activeTab === "dining" && (
              <>
                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-utensils" /></div>
                      <div className="h4 title">Community Café</div>
                      <div className="text">Inside colony - snacks & coffee</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-pizza-slice" /></div>
                      <div className="h4 title">Family Restaurants</div>
                      <div className="text">5–10 min drive - multiple dining options</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-mug-hot" /></div>
                      <div className="h4 title">Food Court Zone</div>
                      <div className="text">Weekend hangout & street food hub nearby</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TRANSPORT */}
            {activeTab === "transport" && (
              <>
                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-bus" /></div>
                      <div className="h4 title">Public Transport</div>
                      <div className="text">Bus stop just outside colony gate</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-car" /></div>
                      <div className="h4 title">Taxi & Auto Access</div>
                      <div className="text">24/7 availability at main gate</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-road" /></div>
                      <div className="h4 title">Highway Connectivity</div>
                      <div className="text">Direct link to city highway within 5 min</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* EDUCATION */}
            {activeTab === "education" && (
              <>
                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-school" /></div>
                      <div className="h4 title">Elite Public School</div>
                      <div className="text">Top-rated school within 1 km radius</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-book-open" /></div>
                      <div className="h4 title">Coaching Centers</div>
                      <div className="text">Competitive exam institutes nearby</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-book" /></div>
                      <div className="h4 title">Library & Study Hub</div>
                      <div className="text">Peaceful learning environment close by</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* HEALTHCARE */}
            {activeTab === "healthcare" && (
              <>
                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-hospital" /></div>
                      <div className="h4 title">City Hospital</div>
                      <div className="text">Emergency care within 10 minutes</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-truck-medical" /></div>
                      <div className="h4 title">24/7 Ambulance</div>
                      <div className="text">Instant medical response inside colony</div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 d-flex equal-card">
                  <div className="service-block-three">
                    <div className="inner-block">
                      <div className="icon"><i className="fa-solid fa-pills" /></div>
                      <div className="h4 title">Pharmacy</div>
                      <div className="text">Medicine store inside colony complex</div>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

    </div >
  );
}

export default About;