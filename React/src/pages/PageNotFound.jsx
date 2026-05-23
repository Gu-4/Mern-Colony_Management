import { Link } from "react-router-dom";
function PageNotFound() {
    return (
        <div className="page-wrapper">

            { /* 404 Section */}
            <section className="">
                <div className="auto-container pb-70">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="error-page__inner">
                                <div className="error-page__title-box">
                                    <img src="/assets/images/resource/404.jpg" alt="" />
                                    <div className="h3 error-page__sub-title">Page not found!</div>
                                </div>
                                <p className="error-page__text">Sorry we can't find that page! The page you are looking <br /> for
                                    was never existed.</p>
                                {/* <form className="error-page__form">
                                    <div className="error-page__form-input">
                                        <input type="search" placeholder="Search here" />
                                        <button type="submit"><i className="lnr lnr-icon-magnifier" /></button>
                                    </div>
                                </form> */}
                                <Link to="/" className="theme-btn btn-style-five shop-now"><span className="btn-title">Back to Home</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            { /*End 404 Section */}


        </div>
    )
}
export default PageNotFound;