import React from "react";
import "../styles/_aboutUs.scss";
import trends from "../assets/images/about-trands.png";
import care from "../assets/images/about-care.png";

function AboutUs() {
  return (
    <div className="container-about">
      <h1 className="about-h1">About</h1>
      <p className="about-subtitle">Who we are and why we do what we do!</p>
      <p className="about-text">
        We are a jewelry shop driven by a deep passion for craftsmanship and a
        commitment to helping you celebrate life moments. Beyond creating
        beautiful adornments, we aspire to be a part of your journey, crafting
        jewelry that tells your unique story and connects you with the world.
        Our mission is to make every piece meaningful, reflecting your style and
        celebrating love and milestones.
      </p>
      <h1 className="about__trends">Top trends</h1>
      <img className="about__trends-image" src={trends} alt="About-Trends" />
      <p className="about__trends-text">
        Discover the latest and most exquisite jewelry trends at our shop. Our
        team of designers and gemologists are constantly exploring global
        inspirations to offer you a diverse range of styles. From timeless
        classics to avant-garde designs, we ensure our collections are always
        fresh and stylish, without compromising on quality.
      </p>
      <p className="about__trends-list">
        {" "}
        - Explore our sustainable jewelry collection, reflecting eco-friendly
        luxury trends.
      </p>
      <p className="about__trends-list">
        {" "}
        - Create bespoke, personalized jewelry to express your unique style.
      </p>
      <h1 className="about__care">Produced with care</h1>
      <img className="about__care-image" src={care} alt="About-Care" />
      <p className="about__care-text">
        Quality and craftsmanship are the cornerstones of our jewelry. We
        meticulously select gemstones for their beauty, metals for their
        durability, and employ skilled artisans who blend traditional techniques
        with modern precision. We are committed to creating pieces that not only
        dazzle but endure, and we do so responsibly, with ethical sourcing and
        sustainable practices, ensuring that every purchase reflects our
        dedication to both your satisfaction and the environment.
      </p>
    </div>
  );
}
export default AboutUs;
