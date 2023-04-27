import React from 'react'
import './contact.css'


// const useProduct = () =>useContext(ProductContext)
// var NewComponent = React.createClass({
//     render: function() {

const Contactus = () => {
      return (
        <div>

          <div className="container">
            <section className="mb-4">
              <h2 className="h1-responsive font-weight-bold text-center my-4 text-success h2 mt-3">
                Contact us
              </h2>
              <p className="text-center w-responsive mx-auto mb-5">
                Do you have any questions? Please do not hesitate to contact us
                directly. Our team will come back to you within a matter of hours to
                help you.
              </p>
              <div className="row">
                <div className="col-md-6 ms-auto mr-auto mb-md-0 mb-5">
                  <form id="contact-form" name="contact-form" action="#" method="POST">
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="md-form mb-0">
                          <input type="text" id="name" name="name" className="form-control" />
                          <label htmlFor="name" className>Your name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="md-form mb-0">
                          <input type="text" id="email" name="email" className="form-control" />
                          <label htmlFor="email" className>Your email</label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div className="md-form mb-0">
                          <input type="text" id="subject" name="subject" className="form-control" />
                          <label htmlFor="subject" className>Subject</label>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div className="md-form">
                          <textarea type="text" id="message" name="message" rows={2} className="form-control md-textarea" defaultValue={""} />
                          <label htmlFor="message">Your message</label>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="text-center text-md-left col-2 mt-4">
                    <button className="styles_button__NRFkP " onclick="document.getElementById('contact-form').submit();">Send</button>
                  </div>
                  <div className="status" />
                </div>
                <div className="col-md-3 mr-auto text-center">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <i className="fas fa-map-marker-alt fa-2x" />
                      <p className="text-success">123 streat , abc state, india</p>
                    </li>
                    <li>
                      <i className="fas fa-phone mt-4 fa-2x" />
                      <p className="text-success">+91 9874563210</p>
                    </li>
                    <li>
                      <i className="fas fa-envelope mt-4 fa-2x" />
                      <p className="text-success">test@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

        </div>
      );
    }
export default Contactus;