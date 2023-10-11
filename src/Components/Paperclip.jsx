import { useEffect, useState, useRef } from "react";
import "./Paperclip.css";

function Paperclip(props) {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [askForFunFact, setAskForFunFact] = useState(false);
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
    "Grace Hopper popularized machine-independent programming languages.",
    "the abacus is considered the earliest known computing device.",
    "Charles Babbage's Difference Engine is regarded as the first automatic calculator.",
    "Alan Turing's work on code-breaking during WWII had a profound impact on computer science.",
    "Linux was first created as an alternative to Windows XP.",
    "the first computer game was created in 1961, called 'Spacewar!'.",
    "the first email was sent by Ray Tomlinson in 1971.",
    "the first computer password was developed at MIT in 1961.",
    "the first Google Doodle was a Burning Man stick figure in 1998.",
    "the first YouTube video was uploaded on April 23, 2005.",
    "the first computer hard disk drive was invented by IBM in 1956.",
    "the first computer mouse was patented in 1970.",
    "the programming language 'Python' was named after the comedy series 'Monty Python'.",
    "the '@' symbol was used to signify that the user was 'at' some other host rather than being local.",
    "Facebook was initially called 'Thefacebook' when it was launched in 2004.",
    "the first webcam was used at the University of Cambridge to monitor a coffee pot.",
    "the first computer programmer in America was a woman named Grace Hopper.",
    "the first search engine was called 'Archie'.",
    "the first Wikipedia edit was made on January 15, 2001.",
    "the first tweet was sent on March 21, 2006, by Jack Dorsey.",
    "the first version of Windows was released in 1985.",
    "the first Apple computer was built in a garage.",
    "the first computer to defeat a world champion chess player was IBM's Deep Blue.",
    "the first social media site was Six Degrees, launched in 1997.",
    "the first portable computer weighed 24 pounds and was called the Osborne 1.",
    "the first computer company was the Electronic Controls Company, founded in 1949.",
    "the first antivirus software was created in 1987.",
    "the first 1GB hard disk drive was announced in 1980 and had a price tag of $40,000.",
  ];

  useEffect(() => {
    setSpeechText("Would you like to hear a fun fact? (click here)");

    const showTimer = setTimeout(() => {
      setShowSpeechBubble(true);
      setAskForFunFact(true);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (askForFunFact) {
      const speechBubble = document.querySelector(".speechBubble");

      const handleClick = () => {
        const audio = new Audio("/public/assets/pageFlip.mp3");

        audio.addEventListener("ended", () => {
          const randomIndex = Math.floor(Math.random() * funFacts.length);
          setSpeechText(`Did you know ${funFacts[randomIndex]}`);
          setAskForFunFact(false);
          speechBubble.style.cursor = "pointer";
        });

        audio.play();
      };

      if (speechBubble) {
        speechBubble.addEventListener("click", handleClick);
      }
    }
  }, [askForFunFact]);

  useEffect(() => {
    if (showSpeechBubble && paperclipRef.current) {
      const rect = paperclipRef.current.getBoundingClientRect();
      const speechBubble = document.querySelector(".speechBubble");
      if (speechBubble) {
        speechBubble.style.left = `${rect.left + 95}px`;
        speechBubble.style.top = `${rect.top - 60}px`;
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
