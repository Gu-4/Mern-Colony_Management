import { Link } from "react-router-dom";
import { useState } from "react";
function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <section className="bg-light" id="colony-gallery">

            {/* TITLE */}
            {/* ================= PAGE TITLE ================= */}
            <section className="page-title w-100" style={{ backgroundImage: "url(/assets/images/background/Colony.png)" }}>
                <div className="auto-container">
                    <div className="title-outer text-center">
                        <div className="h1 title">Gallery</div>
                        <p className="text-white">
                            Moments, facilities, and life inside your society
                        </p>
                        <ul className="page-breadcrumb">
                            <li><Link to="/">Home</Link></li>
                            <li>Gallery</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* FILTERS */}
            <div className="gallery-filter d-flex flex-wrap justify-content-center gap-2 mb-4">
                <a href="#events" className=" filter-btn active">Events & Celebrations</a>
                <a href="#infra" className=" filter-btn active">Infrastructure</a>
                <a href="#residents" className="filter-btn active">Resident Shots</a>
                <a href="#maintenance" className="filter-btn active">Maintenance</a>
                <a href="#facilities" className=" filter-btn active">Amenities & Facilities</a>
            </div>
            <div className="px-3">
                <section id="events" className="py-5">
                    <div className="container">
                        <h3 className="mb-2">Events & Celebrations</h3>
                        <hr />

                        {/* FESTIVALS */}
                        <div className="mb-5">
                            <h5 className="mb-3"><i className="fa-solid fa-star me-2 text-warning"></i> Festivals</h5>

                            <div className="row g-4">

                                <div className="col-md-6">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/diwali.jpeg" className="card-img-top"
                                            style={{ height: "220px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-burst text-warning" /> Diwali Celebration</h5>
                                            <p>Festival of lights celebrated with decorations, diyas, and community gatherings.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/lohri.png" className="card-img-top"
                                            style={{ height: "220px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-fire text-danger me-2" /> Lohri Celebration</h5>
                                            <p>Traditional bonfire celebration with music, dance, and cultural joy.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* NATIONAL EVENTS */}
                        <div className="mb-5">
                            <h5 className="mb-3"> <i className="fa-solid fa-flag me-2 text-danger" /> National Events</h5>

                            <div className="row g-4">

                                <div className="col-md-6">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/independence.png" className="card-img-top"
                                            style={{ height: "220px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-flag text-success me-2" /> Independence Day</h5>
                                            <p>Flag hoisting, cultural programs, and patriotic celebrations.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/republic.jpeg" className="card-img-top"
                                            style={{ height: "220px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-landmark text-primary me-2" /> Republic Day</h5>
                                            <p>Celebration of constitution with flag hoisting and cultural events.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ANNUAL EVENTS */}
                        <div>
                            <h5 className="mb-3"><i className="fa-solid fa-calendar-days me-2 text-primary" /> Annual Events</h5>

                            <div className="row g-4">

                                <div className="col-md-4">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/sports.png" className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-running text-success me-2" /> Sports Day</h5>
                                            <p>Annual sports competitions promoting fitness and teamwork.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/nye.jpeg" className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-champagne-glasses text-warning me-2" /> New Year Party</h5>
                                            <p>Music, dance, and fireworks celebration for new beginnings.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card shadow-sm">
                                        <img src="/assets/images/gallery/anniversary.jpeg" className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5><i className="fa-solid fa-calendar-days text-info me-2" /> Colony Anniversary</h5>
                                            <p>Annual celebration marking community growth and unity.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                <section id="infra" className="py-5">
                    <div className="container">
                        <h3 className="mb-2">Infrastructure</h3>
                        <hr />

                        {/* ROW 1 */}
                        <div className="row g-4 mb-4">

                            {/* Image + Text */}
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-center p-2 shadow-sm rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/infrastructure1.jpeg",
                                            title: "Main Entrance",
                                            desc: "Secure gated entrance with surveillance and controlled access."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/infrastructure1.jpeg"
                                        style={{ width: "70%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div>
                                        <h5>Main Entrance</h5>
                                        <p className="mb-0 small">
                                            Secure gated entrance ensuring safety and controlled access.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Image + Text */}
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-center p-2 shadow-sm rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/infrastructure2.jpeg",
                                            title: "Parking",
                                            desc: "Well-organized parking system for residents."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/infrastructure2.jpeg"
                                        style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div>
                                        <h5>Parking</h5>
                                        <p className="mb-0 small">
                                            Structured parking space for smooth vehicle movement.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* ROW 2 */}
                        <div className="row g-4">

                            {/* Text + Image */}
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-center flex-row-reverse p-2 shadow-sm rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/infrastructure3.jpeg",
                                            title: "Garden",
                                            desc: "Green landscaped garden for relaxation."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/infrastructure3.jpeg"
                                        style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div className="text-end">
                                        <h5>Garden</h5>
                                        <p className="mb-0 small">
                                            Beautiful green space for relaxation and walking.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Text + Image */}
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-center flex-row-reverse p-2 shadow-sm rounded"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/infrastructure4.jpeg",
                                            title: "Apartments",
                                            desc: "Modern residential infrastructure with planned layout."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/infrastructure4.jpeg"
                                        style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <div className="text-end">
                                        <h5>Apartments</h5>
                                        <p className="mb-0 small">
                                            Well-planned residential buildings with modern design.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section id="residents" className="py-5">
                    <div className="container">
                        <h3 className="mb-2">Residents & Moments</h3>
                        <hr />

                        <div className="row g-4">

                            {/* LEFT COLUMN */}
                            <div className="col-md-4">

                                {/* Tall image */}
                                <div className="mb-4 position-relative">
                                    <img
                                        src="/assets/images/gallery/daily.png"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/daily.png",
                                                title: "Daily Life Moments",
                                                desc: "Residents walking and chatting in the colony."
                                            })
                                        }
                                    />
                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Daily Life Moments</small>
                                    </div>
                                </div>

                                {/* Small image */}
                                <div className="position-relative">
                                    <img
                                        src="/assets/images/gallery/balcony.jpeg"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/balcony.jpeg",
                                                title: "Balcony Living",
                                                desc: "Peaceful balcony lifestyle moments."
                                            })
                                        }
                                    />
                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Balcony Living</small>
                                    </div>
                                </div>

                            </div>

                            {/* MIDDLE COLUMN */}
                            <div className="col-md-4">

                                {/* Medium image */}
                                <div className="mb-4 position-relative">
                                    <img
                                        src="/assets/images/gallery/family.png"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "240px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/family.png",
                                                title: "Family Time",
                                                desc: "Families spending quality time together."
                                            })
                                        }
                                    />
                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Family Time</small>
                                    </div>
                                </div>

                                {/* Tall image */}
                                <div className="position-relative">
                                    <img
                                        src="/assets/images/gallery/gardenlife.png"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "330px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/gardenlife.png",
                                                title: "Garden Life",
                                                desc: "Residents enjoying greenery and relaxation."
                                            })
                                        }
                                    />
                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Garden Life</small>
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="col-md-4">

                                {/* Small image */}
                                <div className="mb-4 position-relative">
                                    <img
                                        src="/assets/images/gallery/res5.jpeg"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/res5.jpeg",
                                                title: "Kids Playtime",
                                                desc: "Children enjoying safe play areas."
                                            })
                                        }
                                    />
                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Kids Playtime</small>
                                    </div>
                                </div>

                                {/* Tall image */}
                                <div className="position-relative">
                                    <img
                                        src="/assets/images/gallery/community.jpeg"
                                        className="w-100 rounded shadow-sm"
                                        style={{ height: "340px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() =>
                                            setSelectedImage({
                                                src: "/assets/images/gallery/community.jpeg",
                                                title: "Community Bonding",
                                                desc: "Neighbors interacting and building community relationships."
                                            })
                                        }
                                    />

                                    <div
                                        className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "rgba(0,0,0,0.5)" }}
                                    >
                                        <small>Community Bonding</small>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section id="maintenance" className="py-5">
                    <div className="container">
                        <h3 className="mb-2">Maintenance</h3>
                        <hr />
                        <div className="row g-4">

                            {/* LEFT BIG CARD */}
                            <div className="col-lg-6">
                                <div
                                    className="position-relative rounded overflow-hidden shadow-sm"
                                    style={{ cursor: "pointer", height: "100%" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/maintenance1.jpeg",
                                            title: "Cleanliness",
                                            desc: "Regular cleaning and waste management services ensuring hygienic environment."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/maintenance1.jpeg"
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover", minHeight: "400px" }}
                                    />

                                    <div className="position-absolute bottom-0 w-100 p-3 text-white"
                                        style={{ background: "#fff" }}>
                                        <h4 className="mb-1">Cleanliness</h4>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE STACKED CARDS */}
                            <div className="col-lg-6">

                                {/* CARD 2 */}
                                <div
                                    className="position-relative rounded overflow-hidden shadow-sm mb-4"
                                    style={{ cursor: "pointer", height: "190px" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/maintenance2.jpeg",
                                            title: "Repairing",
                                            desc: "Timely repair and maintenance of infrastructure and utilities."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/maintenance2.jpeg"
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />

                                    <div className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "#fff" }}>
                                        <h5 className="mb-0">Repairing</h5>
                                    </div>
                                </div>

                                {/* CARD 3 */}
                                <div
                                    className="position-relative rounded overflow-hidden shadow-sm"
                                    style={{ cursor: "pointer", height: "190px" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/maintenance3.png",
                                            title: "Staff Work",
                                            desc: "Dedicated staff ensuring smooth daily operations and cleanliness."
                                        })
                                    }
                                >
                                    <img
                                        src="/assets/images/gallery/maintenance3.png"
                                        className="w-100 h-100"
                                        style={{ objectFit: "cover" }}
                                    />

                                    <div className="position-absolute bottom-0 w-100 p-2 text-white"
                                        style={{ background: "#fff" }}>
                                        <h5 className="mb-0">Staff Work</h5>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section id="facilities" className="py-5">
                    <div className="container">
                        <h3 className="mb-2">Amenities & Facilities</h3>
                        <hr />

                        {/* GYM */}
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <img
                                    src="/assets/images/gym.jpeg"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gym.jpeg",
                                            title: "Gym",
                                            desc: "A fully equipped fitness center for residents."
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <h4>Gym</h4>
                                <p>
                                    A fully equipped fitness center designed for residents to maintain a healthy and active lifestyle with modern machines and open space.
                                </p>
                            </div>
                        </div>

                        {/* SWIMMING POOL (reverse) */}
                        <div className="row align-items-center mb-5 flex-md-row-reverse">
                            <div className="col-md-6">
                                <img
                                    src="/assets/images/gallery/swimming.png"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/swimming.png",
                                            title: "Swimming Pool",
                                            desc: "A clean and safe swimming pool for relaxation."
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <h4>Swimming Pool</h4>
                                <p>
                                    A well-maintained swimming pool offering relaxation, fitness, and recreational activities for all age groups.
                                </p>
                            </div>
                        </div>

                        {/* CLUBHOUSE */}
                        <div className="row align-items-center mb-5">
                            <div className="col-md-6">
                                <img
                                    src="/assets/images/clubhouse.jpeg"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/clubhouse.jpeg",
                                            title: "Clubhouse",
                                            desc: "Community space for gatherings and recreation."
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <h4>Clubhouse</h4>
                                <p>
                                    A modern clubhouse for social gatherings, indoor games, and community events.
                                </p>
                            </div>
                        </div>

                        {/* PARK (reverse) */}
                        <div className="row align-items-center mb-5 flex-md-row-reverse">
                            <div className="col-md-6">
                                <img
                                    src="/assets/images/gallery/park.jpeg"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/park.jpeg",
                                            title: "Park",
                                            desc: "Green park for walking and relaxation."
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <h4>Park</h4>
                                <p>
                                    A beautifully landscaped park with walking paths, greenery, and open spaces for families.
                                </p>
                            </div>
                        </div>

                        {/* SECURITY */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <img
                                    src="/assets/images/gallery/security.jpeg"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "320px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() =>
                                        setSelectedImage({
                                            src: "/assets/images/gallery/security.jpeg",
                                            title: "Security Cabin",
                                            desc: "24/7 security monitoring system."
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <h4>Security Cabin</h4>
                                <p>
                                    Round-the-clock security system ensuring safety of all residents with monitoring and control systems.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

            </div >
            {selectedImage && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 9999 }}
                    onClick={() => setSelectedImage(null)}>
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div classname="modal-content border-0 p-3 text-white" style={{ backgroundColor: "rgba(0,0,0,0.85)", color: "#fff" }}>

                            <img
                                src={selectedImage.src}
                                className="img-fluid rounded mb-3"
                                onClick={(e) => e.stopPropagation()}
                            />

                            <h5 style={{ color: "#fff" }}>{selectedImage.title}</h5>
                            <p className="small text-light">
                                {selectedImage.desc}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </section >

    )
}
export default Gallery;