import { Link } from "react-router-dom";

function Contact() {
    return (
        <div className="page-wrapper">

            { /* Back-to-top */}
            <div className="back-to-top-wrapper">
                <button id="back_to_top" type="button" className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <i className="fa-solid fa-caret-up" />
                </button>
            </div>

            { /* Page Title */}
            <section className="page-title" style={{ backgroundImage: "url(/assets/images/background/Colony.png)" }}>
                <div className="auto-container">
                    <div className="title-outer text-center">
                        <div className="h1 title">Contact Us</div>
                        <ul className="page-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>
            </section>

            { /* Contact Section */}
            <section className="contact-details">
                <div className="container pt-110 pb-70">
                    <div className="row">

                        { /* FORM */}
                        <div className="col-xl-7 col-lg-6">
                            <div className="sec-title black">
                                <div className="h2">Send Your Request</div>
                            </div>

                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" placeholder="Your Name" />
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="email" placeholder="Your Email" />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" placeholder="Flat / House No." />
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" placeholder="Phone Number" />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <textarea className="form-control" rows={6} placeholder="Write your complaint / request" />
                                </div>

                                <div className="mt-4">
                                    <button className="theme-btn btn-style-five">
                                        <span className="btn-title">Submit Request</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        { /* CONTACT INFO */}
                        <div className="col-xl-5 col-lg-6">
                            <div className="contact-details__right">
                                <div className="sec-title black">
                                    <div className="h2">Colony Helpdesk</div>
                                    <div className="text">
                                        Reach out to the colony management office for support, complaints, or general inquiries.
                                    </div>
                                </div>

                                <ul className="contact-details__info">

                                    <li>
                                        <div className="icon"><i className="fa fa-phone" /></div>
                                        <div className="text">
                                            <div className="h6">Call Support</div>
                                            <Link to="tel:+911234567890">+91 12345 67890</Link>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="icon"><i className="fa fa-envelope" /></div>
                                        <div className="text">
                                            <div className="h6">Email</div>
                                            <Link to="#">support@eliteenclave.com</Link>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="icon"><i className="fa fa-map-marker" /></div>
                                        <div className="text">
                                            <div className="h6">Visit Office</div>
                                            <span>Elite Enclave, Main Gate Office, Punjab</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            { /* Map */}
            <section className="map-section">
                <iframe className="map w-100" src="https://maps.google.com/maps?q=punjab%20india&z=14&output=embed">
                </iframe>
            </section>

        </div>
    )
}
export default Contact;