import React from "react";
import homeImage from "../images/homeImage.jpg";
import bgImage from "../images/bg2.png";
import "../../components/rentalAgreementSection/rental.css";

const RentalAgreementSection = () => {
  return (
    <section className="main-section">
      <homeImage className="bg-img" />

      <div className="section-content">
        {/* Left Column */}
        <div className="left-content">
          <h4 className=" title">
            E-Registration of Rental Agreement makes life easy
          </h4>
          <p className="">
            Traditional registration of rental agreements is a time-consuming
            process. It is even more tiresome if the owner and tenant are living
            in different cities.
          </p>
          <p className="">
            Property brokers and middlemen charge a premium, adding to costs
            borne by the owner.
          </p>
          <p className="">
            Owners hesitated to register, making themselves vulnerable to
            frauds.
          </p>
          <p className="">
            E-Registration service by Maharashtra Rental agreement makes
            registration easy with just a few clicks.
          </p>
          <ul className="content-list">
            <li>No visits to registrar office</li>
            <li>Low costs</li>
            <li>Quick initiation</li>
            <li>Minimum documentation. Only Aadhar card required.</li>
          </ul>
          <h4 className="title title2 mt-3">What’s in it for the customers</h4>
          <ul className="content-list">
            <li>Only registered and verified vendors</li>
            <li>Connect with multiple vendors</li>
            <li>Opt for a one-stop solution or request a token and password</li>
            <li>Cost-effective and transparent</li>
          </ul>
          <h4 className="title title2 mt-3">What’s in it for the vendors</h4>
          <ul className="content-list">
            <li>
              Registered vendors get visibility in the areas that they operate,
              reducing client acquisition time frame and costs
            </li>
            <li>
              Can register for multiple pincodes and service a wider audience
              network.
            </li>
            <li>
              Get data based insights to improve their business and retain past
              clients
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="right-content">
          <div className="right-container ">
            <h4 className="heading">
              We Are A Self-Service Platform That Acts As An Intermediary
              Between End Customers And E-Rental Agreement Registration Agents.
              The Idea Is To Reduce The Cost Burden On The End Customer And
              Simplify Online Rental Agreement Registration.
            </h4>
            <p className="right-info">
              We have worked as an online registration service provider with
              over 5 years of experience. After understanding the pain-points of
              the customers and vendors, we came up with the idea of a
              self-service portal for e-registration of the rental agreement.
            </p>
            <p className="">
              We have a team of 5 professional advisors and have been working in
              Pune since 2002. We have a huge network of trusted and reliable
              partners across India.
            </p>
          </div>
          <div className="right-footer">
            <a href="tel:+91 7385116583" target="_blank">
              <h4 className="">+91 738 511 6583</h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalAgreementSection;
