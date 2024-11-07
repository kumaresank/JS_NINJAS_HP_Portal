import React from 'react';
import "./Home.css"
import Card from '../../components/card/Card';

const cards = [
  {
    title: "COVID-19 Updates",
    content: "Stay informed about the latest COVID-19 guidelines and vaccination information.",
    btnLabel: "Learn More"
  },
  {
    title: "Heart Health",
    content: "Discover tips and information for maintaining a healthy heart and cardiovascular system.",
    btnLabel: "Learn More"
  },
  {
    title: "Mental Wellness",
    content: "Explore resources and support options for maintaining good mental health.",
    btnLabel: "Learn More"
  },
  {
    title: "Nutrition & Diet",
    content: "Learn about balanced nutrition and healthy eating habits for overall wellbeing.",
    btnLabel: "Learn More"
  },
]

function Home() {
  return <>
    <div>
      <header>Bayer Healthcare</header>
      <nav><ul>
        <li>Home</li>
        <li>Health Topics</li>
        <li>Resources</li>
        <li>About Us</li>
        <li>Contact</li>
        <li>Login</li>
      </ul></nav>
      <div class="hero">
        <h1>Your Health, Our Priority</h1>
        <div>Explore the latest health information and resources from Bayer Healthcare</div>
      </div>
    </div>
    <div className="container">
      <div style={{width: "80%", display: "flex", flexDirection:"column", justifyContent:'center'}}>
        <h2 style={{paddingLeft: 24, marginBottom: -8}}>Featured Health Topics</h2>
        <div className="" card-container>
          {cards.map(card => <Card {...card} />)}
        </div>
      </div>
    </div>
  </>
}

export default Home;
