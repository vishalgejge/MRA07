import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaChevronDown } from "react-icons/fa";

import "../../components/faqsSections/faq.css";

const FaqsSection = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="main-title-container">
      <h2 className="">Frequently Asked Questions</h2>


      <div className="main-box">
        <div className="accordion">
          {faqs.map((item, i) => (
            <div className="faq-item">
              <div className="title" onClick={() => toggle(i)}>
                <h2>{item.question}</h2>
                <span>{selected === i ? '-' : '+'}</span>
              </div>
              <div className={selected === i ? 'show' : 'faq-content'}>{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

const faqs = [
  {
    question:
      "What are the documents required for E-Registration of rent agreement?",
    answer:
      "The documents required for e-registration are Owner’s Adhar and Pan card, tenant’s Adhar card and Pan card. Along with these documents, two witnesses and their Adhar card are essential for the registration. A biometric verification of all the members is necessary. For the property that is to be given on rent, Index 2 or MSEB bill or property tax bill is necessary.",
  },
  {
    question: "What is E-Registration of rent agreement? Is it Valid?",
    answer:
      "Online registration of the rental agreement is possible in a few states in India, and Maharashtra is one of them. The agreement is the same as the offline rental agreement and is valid in the eyes of the law. This is a legal document and completely valid.",
  },
  {
    question:
      "Do the landlord and tenant need to be in the same place to execute this?",
    answer:
      "No, this is not essential if the property is in Maharashtra. Even when the tenant and the landlord are in different cities or states, the executives can get the biometric verification done for the client. Even in situations where a power of attorney is in force, e-rental agreement can be executed.",
  },
  {
    question: "Is an E-Registered rental agreement valid as an Address Proof?",
    answer:
      "Yes, e-rental agreement is a valid address proof. It has the same validity and importance as a regular registered rental agreement and can be used for various purposes like address proof for passport, bank account opening, school admissions, etc.",
  },
  {
    question:
      "How many days will it take for the registration of the rent agreement?",
    answer:
      "Once all the necessary documents are submitted it takes 24 to 48 working hours for the e-rental agreement to be generated.",
  },
  {
    question: "How do I renew the agreement at the end of the year?",
    answer:
      "Yes, you can renew the rent agreement at the end of the year. Just like any traditional rental agreement, the stamp duty and registration fee are applicable during renewal. You can even register long term rental agreements like for 24 to 60 months.",
  },
];

export default FaqsSection;
