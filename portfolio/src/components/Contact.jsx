import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Camping } from "./Camping";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
  
  useEffect(() => {
    AOS.init();
  }, []);
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_758mh8o', 'template_81jk7ik', form.current, 'cHpchfuF_moTrAoBL')
      .then((result) => {
        toast.success("The Mail was successfully sent. Thank you!");
        form.current.reset();
      }, (error) => {
          toast.error("There was an error. Your Mail couldn't be sent.");
      });
  };

  
  return (
    <section id="Contact">
      <h1 className="Contacttitle" data-aos="fade-down">
        Contact Me
      </h1>
      <div id="ContactModell">
        <Canvas
          id="contactcanvas"
          style={{ width: "100vw", height: "95vh", zIndex: "1" }}
        >
          <ambientLight />
          <pointLight position={[100, 100, 100]} />
          <CameraPosition />
          <Camping />
        </Canvas>
      </div>
      <div className="contactform">
        <form
          className="contact1-form validate-form"
          data-dashlane-rid="ce256bf20c33bbc3"
          data-form-type="contact"
          id="Contactform"
          ref={form}
          onSubmit={sendEmail}
        >
          <span className="contact1-form-title gettouch">Get in touch</span>
          <div
            className="wrap-input1 validate-input alert-validate"
            data-validate="Name is required"
          >
            <input
              className="input1"
              type="text"
              name="user_name"
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
              style={{ color: "initial", font: "initial" }}
            ></span>
          </div>
          <div
            className="wrap-input1 validate-input alert-validate"
            data-validate="Email is required"
          >
            <input
              className="input1"
              type="email"
              name="user_email"
              placeholder="Email"
              data-dashlane-rid="3e551c5c86a51d60"
              data-form-type="other"
            />
            <span className="shadow-input1"></span>
          </div>
          <div
            className="wrap-input1 validate-input alert-validate"
            data-validate="Subject is required"
          >
            <input
              className="input1"
              type="text"
              name="subject"
              placeholder="Subject"
              data-dashlane-rid="3e551c5c86a51d60"
              data-form-type="other"
            />
            <span className="shadow-input1"></span>
          </div>
          <div
            className="wrap-input1 validate-input alert-validate"
            data-validate="Message is required"
          >
            <textarea
              className="input1"
              name="message"
              placeholder="Message"
              data-dashlane-rid="50a984f39bb34511"
              data-form-type="other"
            ></textarea>
            <span className="shadow-input1"></span>
          </div>
          <div className="container-contact1-form-btn">
            <button
              className="contact1-form-btn"
              data-dashlane-rid="ceccac826ff48031"
              data-dashlane-label="true"
              data-form-type="other"
              style={{ zIndex: "1000" }}
            >
              <span>
                Send Email
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

const CameraPosition = () => {
  const { camera } = useThree();
  camera.position.set(5, 3, 10);
  return null;
};



export default Contact;
