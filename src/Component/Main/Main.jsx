import React, { useState } from 'react';

import painting from '../../Assets/painting.jpg';
import photography from '../../Assets/photography.jpg';
import rangoli from '../../Assets/rangoli.jpg';
import collage from '../../Assets/collage.jpg';
import skit from '../../Assets/skit.jpg';
import fashion from '../../Assets/fashion_show.jpg';
import mime from '../../Assets/mime.jpg';
import dumb from '../../Assets/dumb_charades.jpg';
import solo_singing from '../../Assets/solo_singing.jpg';
import group_singing from '../../Assets/group_singing.jpeg';
import group_dance from '../../Assets/group_dance.jpg';
import stand_up from '../../Assets/stand_up.jpg';
import mad_ads from '../../Assets/mad_ads.jpg';
import gyan_thantra from '../../Assets/gyan_thantra.jpg';
import product_launch from '../../Assets/product_launch.jpg';


//race
import './main.css'

const Main = () => {
  const [expandedEventId, setExpandedEventId] = useState(null);

  const handleToggleDetails = (id) => {
    setExpandedEventId(prevId => (prevId === id ? null : id));
  };

  const eventData = [
    {
      id: 1,
      image: painting,
      title: "Painting",
      shortDescription: 'Theme: "MAHA SHIVRATRI"',
      fullDescription: [
        "Participants must bring their own materials.",
        "Only A-1 size canvas/sheet allowed.",
        "No pre-made artwork or stencils.",
        "Duration: 2 hours.",
        "Judged on creativity, technique, and theme relevance."
      ]
    },
    {
      id: 2,
      image: photography,
      title: "Photography",
      shortDescription: 'Theme: "Nature"',
      fullDescription: [
        "Photograph Specifications: Photographs must be in digital format",
        "Only DSLR cameras are permitted",
        "Duration: 2 hours.",
        "Location:VTU Campus, Mysore.",
        "Judging Criteria: Photographs will be evaluated based on composition,creativity,relevence to the theme, and technical skill."
      ]
    },
    {
      id: 3,
      image: rangoli,
      title: "Rangoli",
      shortDescription: 'Theme: "Festive Vibes"',
      fullDescription: [
        "Bring your own colors and materials.",
        "Team of up to 2 participants.",
        "No pre-drawn outlines.",
        "Judging on neatness, design, and color usage."
      ]
    },
    {
      id: 4,
      image: collage,
      title: "Collage",
      shortDescription: 'Theme: "Technology & Tradition"',
      fullDescription: [
        "Team event – 2 members max.",
        "Use only paper cutouts – no digital elements.",
        "Materials like scissors and glue must be brought by participants.",
        "Time limit: 1 hour."
      ]
    },
  
    {
      id: 5,
      image: skit,
      title: "Skit",
      shortDescription: "Minimum 5, maximum 8 participants",
      fullDescription: [
        "Time limit: 10 minutes including setup.",
        "Any social or comedic theme allowed.",
        "Props allowed; no fire or sharp objects.",
        "Judging: performance, creativity, and message."
      ]
    },
    {
      id: 6,
      image: fashion,
      title: "Fashion Show",
      shortDescription: "1 team per college (12–15 members)",
      fullDescription: [
        "Theme is open-ended.",
        "Judging based on creativity, confidence, attire, and stage presence."
      ]
    },
    {
      id: 7,
      image: mime,
      title: "Mime",
      shortDescription: "Team size: 6 to 8 members",
      fullDescription: [
        "No spoken words allowed.",
        "Props and background music allowed.",
        "Theme should be socially relevant."
      ]
    },
    {
      id: 8,
      image: dumb,
      title: "Dumb Charades",
      shortDescription: "Team of 2 participants",
      fullDescription: [
        "One participant acts, the other guesses.",
        "Time-bound rounds with increasing difficulty.",
        "Judging based on number of correct guesses."
      ]
    },
    {
      id: 9,
      image: solo_singing,
      title: "Solo Singing",
      shortDescription: "Max duration: 3 minutes",
      fullDescription: [
        "Any language allowed.",
        "No background music provided.",
        "Judging based on melody, rhythm, and voice clarity."
      ]
    },
    {
      id: 10,
      image: group_singing,
      title: "Group Singing",
      shortDescription: "Team of 3–6 members",
      fullDescription: [
        "Instrumental accompaniment allowed.",
        "Harmonization is encouraged.",
        "Judging based on coordination and musicality."
      ]
    },
    {
      id: 11,
      image: group_dance,
      title: "Group Dance",
      shortDescription: "Team of 6–10 members",
      fullDescription: [
        "Time limit: 5–7 minutes.",
        "Props allowed, but must be managed by team.",
        "Judging on synchronization, expression, and creativity."
      ]
    },
    {
      id: 13,
      image: stand_up,
      title: "Stand-up Comedy",
      shortDescription: "Solo performance",
      fullDescription: [
        "Original content required.",
        "No offensive or discriminatory language allowed.",
        "Judging based on content, delivery, and timing."
      ]
    },
    {
      id: 14,
      image: mad_ads,
      title: "Mad Ads",
      shortDescription: "Team of 3–5 members",
      fullDescription: [
        "Prepare an ad for a fictional or existing product.",
        "Judging based on humor, originality, and presentation."
      ]
    },
    {
      id: 15,
      image: gyan_thantra,
      title: "Gyan Thantra",
      shortDescription: "Tech quiz event",
      fullDescription: [
        "Written prelims followed by buzzer round.",
        "Topics include CS, tech trends, and logical reasoning."
      ]
    },
    {
      id: 16,
      image: product_launch,
      title: "Product Launch",
      shortDescription: "Team-based idea pitching event",
      fullDescription: [
        "Pitch a new product with demo or prototype (optional).",
        "Include target audience, USP, and go-to-market strategy.",
        "Judging based on innovation, clarity, and presentation."
      ]
    }
  ];
  

  

  return (
    <section className="events">
      <div className="container">
        <h1 className="heading">EVENTS</h1>
        <p>
          At the heart of Technological advancement and academic brilliance stands Visvesvaraya Technological University (VTU),
          a University dedicated to shaping the future of Engineering, Technology, Management and innovation.
        </p>

        
        <div className="image-gallery">
          {eventData.map(event => (
            <div className="image-item" key={event.id}>
              <img src={event.image} alt={event.title} />
              <h2 className="heading2">{event.title}</h2>
              <p>{event.shortDescription}</p>

              <button className="btn" onClick={() => handleToggleDetails(event.id)}>
                {expandedEventId === event.id ? 'Hide details' : 'Read more'}
              </button>

               {expandedEventId === event.id && (
                <div className="details-horizontal">
                  <ul className="details-list">
                    {event.fullDescription.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
