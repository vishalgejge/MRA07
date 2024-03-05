import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";

import "../../pages/contactus/contact.css";

import {
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation (you can implement more complex validation logic)
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    }
    if (!formData.purpose) {
      errors.purpose = "Business purpose is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Handle form submission (you can send data to your server here)
    console.log("Form submitted:", formData);

    // Clear form data after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      purpose: "",
    });

    // Optionally, you can show a success message to the user
  };

  return (
    <Layout>
      <div className="contact-us">
        <div className="contact-title">
          <h2 className="">Contact Us</h2>
        </div>
        <div className="contact-sections ">
          <div className="contact-details ">
            <div className="location ">
              <TfiMapAlt className="icon" />
              <div className="info">
                <h5 className="heading">Address</h5>
                <p className="">
                  Office No 06, Yogiraj, next to Signate corner, Balewadi Phata,
                  Baner, Pune. 411045
                </p>
              </div>
            </div>
            <div className="email ">
              <MdOutlineEmail className="icon" />
              <div className="info">
                <h5 className="heading">Email</h5>
                <p className="">support@maharashtrarentagreement.com</p>
              </div>
            </div>
            <div className="call ">
              <MdOutlinePhoneInTalk className="icon" />
              <div className="info">
                <h5 className="heading">Phone Number</h5>
                <p className="">+91 738 511 6583</p>
              </div>
            </div>
            <div className="socials ">
              <div className="social-icons  ">
                <h5 className="heading">Social :</h5>
                <div className="">
                  <a href="https://www.facebook.com/profile.php?id=100084550695042&mibextid=LQQJ4d" target="_blank">
                    <FaFacebook className="social-icon" />
                  </ a>
                </div>
                <div className="">
                  <a href="https://www.linkedin.com/company/maharashtra-rent-agreement/" target="_blank">
                    <FaLinkedin className="social-icon" />
                  </ a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className=" ">
              <h3 className="main-title">
                Need Assistance? Please Complete The Contact Form
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className=""
                  />
                  {formErrors.name && (
                    <p className="text-black font-semibold text-sm">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className=""
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className=""
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
                <div className="form-control form-control2">
                  <input
                    type="text"
                    id="purpose"
                    name="purpose"
                    placeholder="Business Purpose"
                    value="Business Purpose" // Fixed value
                    disabled
                    className="business"
                  />
                  {formErrors.purpose && (
                    <p className="text-red-500 text-sm">{formErrors.purpose}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="form-btn bg-yellow-500 hover:bg-yellow-600"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
