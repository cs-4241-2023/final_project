import { useEffect, useState, useRef } from "react";
import "./Paperclip.css";

function Paperclip(props) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const paperclipRef = useRef(null);

  const funFacts = [
    "the first computer programmer was Ada Lovelace in the 19th century.",
    "the world's first computer mouse was made of wood.",
    "a 'byte' can represent 256 different values.",
    "the first computer bug was an actual insect found in a computer.",
    "the term 'debugging' originated from removing a moth from a computer.",
    "the QWERTY keyboard layout was designed to prevent typewriter jams.",
    "the first computer virus was created in 1983.",
    "the world's first computer, the ENIAC, weighed 27 tons.",
    "the concept of virtual reality dates back to the 1960s.",
    "Google's first storage was made from LEGO bricks.",
    "Alan Turing is considered the father of theoretical computer science.",
    "the most powerful supercomputers can perform quadrillions of calculations per second.",
    "the first domain name ever registered was 'symbolics.com'.",
    "the average human brain can store around 2.5 petabytes of information.",
    "the first known computer virus for MS-DOS was named 'Brain'.",
    "Amazon Web Services (AWS) was launched in 2006.",
    "CAPTCHA stands for 'Completely Automated Public Turing test to tell computers and humans apart'.",
    "the World Wide Web was invented by Sir Tim Berners-Lee in 1989.",
    "JavaScript was developed in just 10 days by Brendan Eich.",
    "the first photo ever uploaded to the internet was of a band.",
  ];

  useEffect(() => {
    setSpeechText("Hello!");

    const showTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 13000); // 3000 (initial delay) + 10000 (10 seconds)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (showSpeechBubble) {
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        setSpeechText("Did you know " + funFacts[randomIndex]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showSpeechBubble]);

  useEffect(() => {
    if (showSpeechBubble && paperclipRef.current) {
      const rect = paperclipRef.current.getBoundingClientRect();
      const speechBubble = document.querySelector(".speechBubble");
      if (speechBubble) {
        speechBubble.style.left = `${rect.left + 100}px`;
        speechBubble.style.top = `${rect.top - 40}px`;
      }
    }
  }, [showSpeechBubble]);

  return (
    <>
      <img
        ref={paperclipRef}
        src="/public/assets/Paperclip.png"
        width={150}
        className="bounceIn"
      />
      {showSpeechBubble && <div className="speechBubble">{speechText}</div>}
    </>
  );
}

export default Paperclip;
