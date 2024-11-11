import React from 'react';

const About = () => {
  return (
    <>
      <div className="about-container">
        <section className="about-section">
          <p>
            Welcome to our Budget Tracker web application, a user-friendly platform designed to help you manage your finances effectively. With a clean and modern <strong>white and blue user interface</strong>, our application simplifies the process of tracking your income and expenses, ensuring you have a clear overview of your financial health.
          </p>
        </section>
        <section className="mission-section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to empower individuals to take control of their finances through an intuitive and accessible budgeting tool. We believe that everyone should have the ability to manage their money efficiently, regardless of their financial background.
          </p>
        </section>
        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <h3>Het Jasani</h3>
            <p>A skilled front-end developer with a keen eye for design, Het focuses on creating an engaging user experience.</p>
          </div>
          <div className="team-member">
            <h3>Devashree Kale</h3>
            <p>As a back-end developer, Devashree is responsible for the application's robust functionality.</p>
          </div>
          <div className="team-member">
            <h3>Lakshita Chaudhary</h3>
            <p>Lakshita brings her experience in user interface design to the team, ensuring that our application is aesthetically pleasing.</p>
          </div>
          <div className="team-member">
            <h3>Bhumi Asati</h3>
            <p>A full-stack developer with a passion for problem-solving, Bhumi integrates the front-end and back-end components of our application.</p>
          </div>
        </section>
        <section className="features-section">
          <h3>Our Features</h3>
          <ul className="features-list">
            <li>Transaction Management: Easily add and categorize your income and expenses.</li>
            <li>Real-Time Updates: View your current balance and financial status at a glance.</li>
            <li>User-Friendly Interface: Navigate effortlessly through our sleek design.</li>
            <li>Data Security: Your financial information is protected with advanced security measures.</li>
          </ul>
        </section>
        <section className="join-section">
          <h2>Join Us</h2>
          <p>
            We invite you to explore our Budget Tracker web application and take the first step towards better financial management. Whether you're looking to save for a goal or simply keep track of your spending, we are here to help you every step of the way!
          </p>
        </section>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .about-container {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          color: #343a40;
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        
        .about-header {
          text-align: center;
          color: #007bff;
          font-size: 40px;
        }
        
        .about-section,
        .mission-section,
        .team-section,
        .features-section,
        .join-section {
          margin-bottom: 20px;
        }
        
        .team-member {
          margin-bottom: 15px;
        }
        
        .features-list {
          list-style-type: none;
          padding-left: 0;
        }
        
        .features-list li {
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
        }

        .features-list li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: #007bff;
        }

        h3{
            font-weight: bold;
        }

        h2{
            font-weight: bold;
            font-size: 20px;
        }

      `}</style>
    </>
  );
};

export default About;