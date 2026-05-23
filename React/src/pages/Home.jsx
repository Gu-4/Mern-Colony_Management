import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="page-wrapper">

            {/* <div className="preloader" /> */}

            { /* Back-to-top start */}
            <div className="back-to-top-wrapper">
                <button id="back_to_top" type="button" className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <i className="fa-solid fa-caret-up" />
                </button>
            </div>
            { /* Back-to-top start */}

            { /* start banner-section */}
            <section className="banner-section-three">
                <div className="outer-box">
                    <div className="bg-image">
                        <img src="/assets/images/banner/banner3-1.png" alt="Colony Management" />
                    </div>

                    <div className="icon-box">
                        <div className="icon">
                            <img src="/assets/images/icons/wcu2-1.png" alt="Community Icon" />
                        </div>

                        <span>
                            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <path
                                        id="circlePath"
                                        d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                                    />
                                </defs>

                                <text letterSpacing={6} textAnchor="middle">
                                    <textPath href="#circlePath" startOffset="50%">
                                        Residex - Colony Management •
                                    </textPath>
                                </text>
                            </svg>
                        </span>
                    </div>

                    <div className="row">

                        {/* CONTENT */}
                        <div className="content-column col-lg-6">
                            <div className="inner-column" style={{ paddingTop: "200px" }}>

                                <div className="title-style wow fadeInUp" data-wow-delay="200ms">
                                </div>

                                <div className="h1 banner-title wow fadeInUp" data-wow-delay="400ms">
                                    Manage your colony smarter, safer, and more efficiently
                                </div>

                                <div className="text wow fadeInUp" data-wow-delay="600ms">
                                    Our Colony Management System helps residents and administrators handle complaints,
                                    security, maintenance, and visitor management in one unified platform.
                                    Build a connected and transparent community experience.
                                </div>

                                <Link
                                    className="theme-btn btn-style-two wow fadeInUp"
                                    data-wow-delay="600ms"
                                    to="/gallery"
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-arrow-right" />
                                        <i className="fa-solid fa-arrow-right" />
                                    </span>
                                    <span className="btn-title">Explore Community</span>
                                </Link>

                            </div>
                        </div>

                        {/* IMAGE SIDE */}
                        <div className="image-column col-lg-6">
                            <div className="inner-column wow fadeInUp" data-wow-delay="400ms">

                                <div className="image">
                                    <img src="/assets/images/banner/banner3-1.jpg" alt="Colony Dashboard" />
                                </div>

                                <div className="feature-block">
                                    <div className="inner-block">

                                        <div className="icon">
                                            <i className="flaticon-set-building-1" />
                                        </div>

                                        <div className="h4 title">
                                            Smart Security & Management
                                        </div>

                                        <div className="text">
                                            Track visitors, manage complaints, and monitor society operations in real time.
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            { /* end banner-section-h1 */}

            { /* start about-section-three */}
            <section className="about-section pt-0">
                <div className="shape-1"><img src="/assets/images/icons/shape-1.png" alt="" /></div>

                <div className="auto-container">
                    <div className="row">

                        { /* Image Column */}
                        <div className="image-column col-xl-5 col-md-10">
                            <div className="inner-column wow fadeInUp" data-wow-delay="200ms">

                                <div className="images-box one">
                                    <div className="image"><img className="small-img" src="/assets/images/resource/about1-3.png" alt="Colony Management" /></div>
                                </div>

                                <div className="images-box two">
                                    <div className="image"><img src="/assets/images/delivery.png" alt="Community Services" /></div>
                                </div>

                                <div className="info-box bounce-y">
                                    <div className="h5">Smart Management System</div>
                                    <div className="image"><img src="/assets/images/resource/about1-4.png" alt="Team" /></div>
                                </div>

                            </div>
                        </div>

                        { /* Content Column */}
                        <div className="content-column col-xl-7 col-lg-10">
                            <div className="inner-column wow fadeInUp" data-wow-delay="400ms">

                                <div className="sec-title">
                                    <div className="h6 sub-title">About Our Colony Management System</div>

                                    <div className="h2 title char-animation">
                                        Smart & Efficient Residential Colony Management for Better Living
                                    </div>

                                    <div className="text">
                                        Our Colony Management System is designed to simplify daily society operations including maintenance, security, complaints, and resident services. We ensure a safe, organized, and well-managed living environment for all residents.
                                    </div>
                                </div>

                                { /* Block 1 */}
                                <div className="about-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-pencil-and-ruler" />
                                        </div>
                                        <div className="content">
                                            <div className="h5 title">Maintenance Management</div>
                                            <div className="text">
                                                Track and manage maintenance requests, repairs, and facility upkeep efficiently in one place.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                { /* Block 2 */}
                                <div className="about-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-architect" />
                                        </div>
                                        <div className="content">
                                            <div className="h5 title">Security & Community Safety</div>
                                            <div className="text">
                                                Improve security with visitor tracking, gate management, and emergency communication tools.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                { /* Bottom */}
                                <div className="bottom-box">

                                    <Link className="theme-btn btn-style-two" to="/about">
                                        <span className="icon">
                                            <i className="fa-solid fa-arrow-right" />
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="btn-title">Read More</span>
                                    </Link>

                                    <div className="info-box">
                                        <div className="icon"><i className="fa-solid fa-phone" /></div>
                                        <div className="info">
                                            <span>Helpdesk Support</span>
                                            <Link to="tel:+910000000000">+91 00000 00000</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            { /* end about-section-three */}

            {/* start why-choose-us-section-two */}
            <section className="why-choose-us-section-two">
                <div className="bg-shape">
                    <img src="/assets/images/icons/shape-15.png" alt="" />
                </div>

                <div className="auto-container">

                    <div className="sec-title light text-center">
                        <div className="h6 sub-title">Why Choose Us</div>
                        <div className="h2 title char-animation">
                            Smarter & Safer Colony Management System
                        </div>
                    </div>

                    <div className="row">

                        {/* Image Column */}
                        <div className="image-column col-xl-6">
                            <div className="inner-column">

                                <div className="image wow reveal-top tm-gsap-img-parallax overflow-hidden">
                                    <img src="/assets/images/resource/section3.png" alt="Colony Management" />
                                </div>

                                <div className="icon-box">
                                    <div className="icon">
                                        <img src="/assets/images/icons/wcu2-1.png" alt="Security Icon" />
                                    </div>

                                    <span>
                                        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <path
                                                    id="circlePath"
                                                    d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                                                />
                                            </defs>
                                            <text letterSpacing={6} textAnchor="middle">
                                                <textPath to="#circlePath" startOffset="50%">
                                                    Secure • Transparent • Smart Community System
                                                </textPath>
                                            </text>
                                        </svg>
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="content-column col-xl-6">
                            <div className="inner-column">

                                {/* Block 1 */}
                                <div className="why-choose-us-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-residential" />
                                        </div>
                                        <div className="content">
                                            <div className="h4 title">Enhanced Security System</div>
                                            <div className="text">
                                                Visitor tracking, gate pass management, and real-time entry logs for complete safety.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Block 2 */}
                                <div className="why-choose-us-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-agreement" />
                                        </div>
                                        <div className="content">
                                            <div className="h4 title">Transparent Management</div>
                                            <div className="text">
                                                Clear maintenance billing, expense tracking, and society fund management.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Block 3 */}
                                <div className="why-choose-us-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-property-1" />
                                        </div>
                                        <div className="content">
                                            <div className="h4 title">Fast Complaint Resolution</div>
                                            <div className="text">
                                                Residents can raise issues and track real-time resolution status easily.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Block 4 */}
                                <div className="why-choose-us-block">
                                    <div className="inner-block">
                                        <div className="icon">
                                            <i className="flaticon-set-architecture" />
                                        </div>
                                        <div className="content">
                                            <div className="h4 title">Smart Community Living</div>
                                            <div className="text">
                                                Notices, events, and communication tools to connect all residents efficiently.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* end why-choose-us-section-two */}

            { /* Services Section */}
            <section className="services-section-three">
                <div className="shape-1"><img src="/assets/images/icons/shape-1.png" alt="" /></div>

                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="h6 sub-title">Community Living</div>
                        <div className="h2 title char-animation">Smart Society Services</div>
                    </div>
                    <div className="row row-cols-xl-5 row-cols-md-2 row-cols-sm-1 row-cols-1 gx-4">

                        { /* Feature Block */}
                        <div className="column col wow fadeInUp" data-wow-delay="00ms">
                            <div className="service-block-three">
                                <div className="inner-block">
                                    <div className="icon"><i className="fa-solid fa-screwdriver-wrench" /></div>
                                    <div className="h4 title">
                                        <Link to="">Maintenance<br />Requests</Link>
                                    </div>
                                    <div className="image">
                                        <img src="/assets/images/resource/service1-4.png" alt="Maintenance" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* Feature Block */}
                        <div className="column col wow fadeInUp" data-wow-delay="00ms">
                            <div className="service-block-three">
                                <div className="inner-block">
                                    <div className="icon"><i className="fa-solid fa-person-walking-luggage" /></div>
                                    <div className="h4 title">
                                        <Link to="">Visitor Entry<br />Management</Link>
                                    </div>
                                    <div className="image">
                                        <img src="/assets/images/resource/service1-5.png" alt="Visitor" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* Feature Block */}
                        <div className="column col wow fadeInUp" data-wow-delay="00ms">
                            <div className="service-block-three">
                                <div className="inner-block">
                                    <div className="icon"><i className="fa-solid fa-credit-card" /></div>
                                    <div className="h4 title">
                                        <Link to="">Online Payments<br />& Billing</Link>
                                    </div>
                                    <div className="image">
                                        <img src="/assets/images/resource/service1-6.png" alt="Payments" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* Feature Block */}
                        <div className="column col wow fadeInUp" data-wow-delay="00ms">
                            <div className="service-block-three">
                                <div className="inner-block">
                                    <div className="icon"><i className="fa-solid fa-bullhorn" /></div>
                                    <div className="h4 title">
                                        <Link to="">Notice Board<br />& Alerts</Link>
                                    </div>
                                    <div className="image">
                                        <img src="/assets/images/resource/service1-7.png" alt="Notices" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* Feature Block */}
                        <div className="column col wow fadeInUp" data-wow-delay="00ms">
                            <div className="service-block-three">
                                <div className="inner-block">
                                    <div className="icon"><i className="fa-solid fa-lock" />    </div>
                                    <div className="h4 title">
                                        <Link to="">Security &<br />Gate Pass</Link>
                                    </div>
                                    <div className="image">
                                        <img src="/assets/images/resource/service1-8.png" alt="Security" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            { /* End Services Section */}

            { /* facilities Section */}
            <section className="services-section">
                <div className="shape-1"><img src="/assets/images/icons/shape-14.png" alt="" /></div>

                <div className="auto-container">

                    <div className="sec-title text-center">
                        <div className="h6 sub-title">Community Living</div>
                        <div className="h2 title char-animation">Colony Facilities</div>
                    </div>

                    <div className="row gx-3">

                        { /* Facility 1 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="service-block wow fadeInUp" data-wow-delay="200ms">
                                <div className="inner-block">

                                    <div className="image">
                                        <img src="/assets/images/security.jpeg" alt="Security System" />
                                        <img src="/assets/images/security.jpeg" alt="" />
                                        <div className="icon"><i className="fa-solid fa-video" /></div>
                                    </div>

                                    <div className="content">
                                        <div className="h4 title">
                                            <Link to="#">24/7 Security &<br />CCTV Surveillance</Link>
                                        </div>
                                        <div className="btn-service-style" to="#">
                                                Round-the-clock security with CCTV monitoring ensures a safe and secure environment for all residents.
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        { /* Facility 2 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="service-block wow fadeInUp" data-wow-delay="400ms">
                                <div className="inner-block">

                                    <div className="image">
                                        <img src="/assets/images/Park.jpeg" alt="Park Area" />
                                        <img src="/assets/images/Park.jpeg" alt="" />
                                        <div className="icon"><i className="fa-solid fa-tree" /></div>
                                    </div>

                                    <div className="content">
                                        <div className="h4 title">
                                            <Link to="#">Green Park &<br />Open Spaces</Link>
                                        </div>
                                        <div className="btn-service-style" to="#">
                                            Well-maintained parks and open spaces for relaxation, walking, and community activities.
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        { /* Facility 3 */}
                        <div className="col-xl-4 col-md-6">
                            <div className="service-block wow fadeInUp" data-wow-delay="600ms">
                                <div className="inner-block">

                                    <div className="image">
                                        <img src="/assets/images/clubhouse.jpeg" alt="Clubhouse" />
                                        <img src="/assets/images/clubhouse.jpeg" alt="" />
                                        <div className="icon"><i className="fa-solid fa-people-group" /></div>
                                    </div>

                                    <div className="content">
                                        <div className="h4 title">
                                            <Link to="#">Clubhouse &<br />Community Hall</Link>
                                        </div>
                                        <div className="btn-service-style" to="#">
                                            A shared space for meetings, events, and social gatherings within the community.
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            { /* End facilities Section */}

            { /* start working-section */}
            <section className="working-section">
                <div className="shape-1 bounce-x">
                    <img src="/assets/images/icons/shape-21.png" alt="" />
                </div>

                <div className="auto-container">

                    <div className="sec-title text-center">
                        <div className="h6 sub-title">How It Works</div>
                        <div className="h2 title char-animation">
                            Simple Steps to Manage Your Colony Easily
                        </div>
                    </div>

                    <div className="row gx-4">

                        {/* Step 1 */}
                        <div className="working-block col-xl-3 col-md-6">
                            <div className="inner-block wow fadeInUp" data-wow-delay="200ms">

                                <div className="step-box">
                                    <div className="count">Step 01</div>
                                    <i className="fa-solid fa-arrow-right" />
                                </div>

                                <div className="image">
                                    <img src="/assets/images/resource/work.png" alt="Register" />
                                </div>

                                <div className="h4 title">
                                    Register /<br />Login Account
                                </div>

                                <div className="text">
                                    Residents or admin sign in to access colony management features.
                                </div>

                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="working-block col-xl-3 col-md-6">
                            <div className="inner-block wow fadeInUp" data-wow-delay="400ms">

                                <div className="step-box">
                                    <div className="count">Step 02</div>
                                    <i className="fa-solid fa-arrow-right" />
                                </div>

                                <div className="image">
                                    <img src="/assets/images/resource/work1.png" alt="Submit Request" />
                                </div>

                                <div className="h4 title">
                                    Submit Requests /<br />Complaints
                                </div>

                                <div className="text">
                                    Raise maintenance issues, complaints, or service requests online.
                                </div>

                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="working-block col-xl-3 col-md-6">
                            <div className="inner-block wow fadeInUp" data-wow-delay="600ms">

                                <div className="step-box">
                                    <div className="count">Step 03</div>
                                    <i className="fa-solid fa-arrow-right" />
                                </div>

                                <div className="image">
                                    <img src="/assets/images/resource/work2.png" alt="Tracking" />
                                </div>

                                <div className="h4 title">
                                    Track Status &<br />Updates
                                </div>

                                <div className="text">
                                    Monitor real-time progress of your complaints and approvals.
                                </div>

                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="working-block col-xl-3 col-md-6">
                            <div className="inner-block wow fadeInUp" data-wow-delay="800ms">

                                <div className="step-box">
                                    <div className="count">Step 04</div>
                                    <i className="fa-solid fa-arrow-right" />
                                </div>

                                <div className="image">
                                    <img src="/assets/images/resource/work3.png" alt="Community Living" />
                                </div>

                                <div className="h4 title">
                                    Enjoy Smart &<br />Safe Living
                                </div>

                                <div className="text">
                                    Experience smooth, transparent, and well-managed community living.
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            { /* end working-section */}

            { /* start conatct-section-three */}
            <section className="conatct-section-three">
                <div className="outer-box">

                    <div className="shape-1">
                        <img src="/assets/images/icons/shape-28.png" alt="" />
                    </div>

                    <div className="auto-container">
                        <div className="row">

                            {/* Content Column */}
                            <div className="content-column col-lg-6">
                                <div className="inner-column">

                                    <div className="sec-title">
                                        <div className="h6 sub-title">Contact Support</div>
                                        <div className="h2 title char-animation">
                                            Get Help from Colony Management Team
                                        </div>
                                    </div>

                                    <div className="text">
                                        Have an issue or request? Reach out to the colony administration for maintenance,
                                        complaints, or general assistance.
                                    </div>

                                    <div className="image-box">

                                        <div className="image">
                                            <img src="/assets/images/resource/contact3-1.jpg" alt="Support" />
                                        </div>

                                        <div className="info-box">

                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa-solid fa-location-dot" />
                                                </div>
                                                <span>Society Office, Main Gate  -EliteEnclave</span>
                                            </div>

                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa-regular fa-envelope" />
                                                </div>
                                                <span>
                                                    support@residex.com | +91 12345 67890
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Form Column */}
                            <div className="form-column col-lg-6">
                                <div className="inner-column">

                                    <div className="form-box">
                                        <div className="inner-box">

                                            <form action="#">

                                                <div className="row gx-3">

                                                    <div className="col-sm-6 wow fadeInUp animated" data-wow-delay=".2s">
                                                        <div className="form-clt">
                                                            <label>Full Name <span className="text-danger">*</span></label>
                                                            <input type="text" name="name" placeholder="Enter your name" required />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 wow fadeInUp animated" data-wow-delay=".4s">
                                                        <div className="form-clt">
                                                            <label>Email Address <span className="text-danger">*</span></label>
                                                            <input type="email" name="email" placeholder="Enter your email" />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 wow fadeInUp animated" data-wow-delay=".6s">
                                                        <div className="form-clt">
                                                            <label>Phone Number <span className="text-danger">*</span></label>
                                                            <input type="tel" name="phone" placeholder="Enter your number" />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 wow fadeInUp animated" data-wow-delay=".6s">
                                                        <div className="form-clt">
                                                            <label>Request Type <span className="text-danger">*</span></label>
                                                            <input type="text" name="request" placeholder="Maintenance / Complaint / Other" />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 wow fadeInUp animated" data-wow-delay=".2s">
                                                        <div className="form-clt">
                                                            <label>Message</label>
                                                            <textarea name="message" placeholder="Describe your issue..." />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 wow fadeInUp animated" data-wow-delay=".2s">
                                                        <button className="theme-btn btn-style-three" type="submit">
                                                            <span className="btn-title">Submit Request</span>
                                                        </button>
                                                    </div>

                                                </div>

                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            { /* end conatct-section-two */}
        </div >
    );
}

export default Home;