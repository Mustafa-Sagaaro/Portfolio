import React, { useRef } from "react";
import "../styles/main.css";

const Contact = () => {
  const tiltRef = useRef(null);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = tiltRef.current;

    const xRotation = (clientY - offsetTop - offsetHeight / 2) / 8;
    const yRotation = -(clientX - offsetLeft - offsetWidth / 2) / 8;

    tiltRef.current.style.transform = `perspective(300px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  };

  const handleMouseLeave = () => {
    tiltRef.current.style.transform = "perspective(300px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section id="Contact">
      <div className="container-contact1">
        <div
          className="contact1-pic js-tilt"
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="https://colorlib.com/etc/cf/ContactFrom_v1/images/img-01.png"
            alt="IMG"
          />
        </div>

        <form
          className="contact1-form validate-form"
          data-dashlane-rid="ce256bf20c33bbc3"
          data-form-type="contact"
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
