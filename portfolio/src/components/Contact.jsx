import React, { useRef } from "react";
import "../styles/main.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "react-three-fiber";

const Contact = () => {
  return (
    <section id="Contact">
      <h1 className="Contacttitle box">Contact Me</h1>
      <div id="ContactModell">

      </div>
      <div className="contactform">
        <form
          className="contact1-form validate-form"
          data-dashlane-rid="ce256bf20c33bbc3"
          data-form-type="contact"
          id="Contactform"
        >
          <span className="contact1-form-title">Get in touch</span>
          <div
            className="wrap-input1 validate-input alert-validate"
            data-validate="Name is required"
          >
            <input
              className="input1"
              type="text"
              name="name"
              placeholder="Name"
              data-dashlane-rid="d66dd58bd2bcf550"
              data-kwimpalastatus="alive"
              data-kwimpalaid="1687851370095-0"
              data-form-type="name"
            />
            <span className="shadow-input1"></span>
            <span
              id="1687851370095-0"
              data-dashlanecreated="true"
              style={{ color: "initial", font: "initial" /* ... */ }}
            ></span>
          </div>
          <div
            class="wrap-input1 validate-input alert-validate"
            data-validate="Subject is required"
          >
            <input
              class="input1"
              type="text"
              name="subject"
              placeholder="Subject"
              data-dashlane-rid="3e551c5c86a51d60"
              data-form-type="other"
            />
            <span class="shadow-input1"></span>
          </div>
          <div
            class="wrap-input1 validate-input alert-validate"
            data-validate="Message is required"
          >
            <textarea
              class="input1"
              name="message"
              placeholder="Message"
              data-dashlane-rid="50a984f39bb34511"
              data-form-type="other"
            ></textarea>
            <span class="shadow-input1"></span>
          </div>
          <div class="container-contact1-form-btn">
            <button
              class="contact1-form-btn"
              data-dashlane-rid="ceccac826ff48031"
              data-dashlane-label="true"
              data-form-type="other"
            >
              <span>
                Send Email
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
