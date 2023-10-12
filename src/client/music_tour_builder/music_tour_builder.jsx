import React, { useState, useEffect } from "react"
import "bulma/css/bulma.min.css"

function musicTourBuilder() {
  //Important Note; Objects and arrays cannot be stored in state in React. Primitive values need to be picked out from the object and stored in state.

  const [musicTourName, setMusicTourName] = useState("")
  const [musicTourDuration, setMusicTourDuration] = useState(0)
  const [musicTourContinent, setMusicContinent] = useState("")
  const [musicTourTargetAudienceAgeRange, setMusicTourTargetAudienceAgeRange] =
    useState("")
  const [musicTourHeadliningArtist, setMusicTourHeadliningArtist] =
    useState("")
  const [musicTourDirectSupportArtist, setMusicTourDirectSupportArtist] =
    useState("")
  const [fieldModificationFeedback, setFieldModificationFeedback] =
    useState("")
  const [tourDurationUserInputFeedback, setTourDurationUserInputFeedback] =
    useState("")
  const [
    targetAudienceAgeRangeUserInputFeedback,
    setTargetAudienceAgeRangeUserInputFeedback,
  ] = useState("")

  useEffect(() => {
    async function getMusicTourName() {
      const response = await fetch("/getMusicTourName", {
        method: "GET",
      })

      const tourName = await response.text()
      setMusicTourName(tourName)
    }
    getMusicTourName()
  }, [])

  useEffect(() => {
    async function getMusicTourDuration() {
      const response = await fetch("/getMusicTourDuration", {
        method: "GET",
      })

      const tourDuration = await response.text()
      setMusicTourDuration(tourDuration)
    }
    getMusicTourDuration()
  }, []);

  useEffect(() => {
    async function getMusicTourContinent() {
      const response = await fetch("/getMusicTourContinent", {
        method: "GET",
      })

      const tourContinent = await response.text()
      setMusicContinent(tourContinent)
    }
    getMusicTourContinent()
  }, []);

  useEffect(() => {
    async function getMusicTourTargetAudienceAgeRange() {
      const response = await fetch("/getMusicTourTargetAudienceAgeRange", {
        method: "GET",
      })

      const targetAudienceAgeRange = await response.text()
      setMusicTourTargetAudienceAgeRange(targetAudienceAgeRange)
    }
    getMusicTourTargetAudienceAgeRange()
  }, [])

  useEffect(() => {
    async function getMusicTourHeadliningArtist() {
      const response = await fetch("/getMusicTourHeadliningArtist", {
        method: "GET",
      })

      const headliningArtist = await response.text()
      setMusicTourHeadliningArtist(headliningArtist)
    }
    getMusicTourHeadliningArtist()
  }, [])

  useEffect(() => {
    async function getMusicTourDirectSupportArtist() {
      const response = await fetch("/getMusicTourDirectSupportArtist", {
        method: "GET",
      })

      const directSupportArtist = await response.text()
      setMusicTourDirectSupportArtist(directSupportArtist)
    }
    getMusicTourDirectSupportArtist()
  }, []);

  useEffect(() => {
    const musicTourNameButton = document.getElementById("submitMusicTourName")
    musicTourNameButton.addEventListener("click", async function () {
      const tourName = document.getElementById("tourname").textContent
      setMusicTourName(tourName)

      const response = await fetch("/modifyTourName", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourname: tourName,
        }),
      });

      const modificationFeedback = await response.text()
      setFieldModificationFeedback(modificationFeedback)
    });
  });

  useEffect(() => {
    const tourDurationButton = document.getElementById("submitTourDuration")
    tourDurationButton.addEventListener("click", async function () {
      const tourDuration = document.getElementById("tourduration").textContent

      if (parseInt(tourDuration) < 0) {
        setTourDurationUserInputFeedback(
          "Entered tour duration needs to be greater than or equal to 0 days."
        )
      } else {
        setTourDurationUserInputFeedback("")
        setMusicTourDuration(tourDuration)

        const response = await fetch("/modifyTourDuration", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tourduration: tourDuration,
          }),
        })

        const modificationFeedback = await response.text()
        setFieldModificationFeedback(modificationFeedback)
      }
    });
  });

  useEffect(() => {
    const tourContinentButton = document.getElementById("submitTourContinent");
    tourContinentButton.addEventListener("click", async function () {
      const tourContinent =
        document.getElementById("tourcontinent").textContent
      setMusicContinent(tourContinent)

      const response = await fetch("/modifyTourContinent", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourcontinent: tourContinent,
        }),
      })

      const modificationFeedback = await response.text()
      setFieldModificationFeedback(modificationFeedback)
    });
  });

  useEffect(() => {
    const targetAudienceAgeRangeButton = document.getElementById(
      "submitTargetAudienceAgeRange"
    )
    targetAudienceAgeRangeButton.addEventListener("click", async function () {
      const targetAudienceAgeRange = document.getElementById(
        "targetaudienceagerange"
      ).textContent

      function getFirstIndexOfStringWhiteSpace(inputString) {
        //The indexOf() method returns the position of the first occurrence of a value in a string.
        return inputString.indexOf(" ")
      }

      function countOccurrencesOfNonConvertableCharacterInUserInputString(
        inputString
      ) {
        let nonConvertableCharacterCounter = 0;

        inputString.split("").forEach((c) => {
          if (isNaN(parseInt(c))) {
            nonConvertableCharacterCounter++
          }
        });

        return nonConvertableCharacterCounter
      }

      if (getFirstIndexOfStringWhiteSpace(targetAudienceAgeRange) >= 0) {
        setTargetAudienceAgeRangeUserInputFeedback(
          "Entered Target Audience Age Range cannot contain any whitespace."
        );
      } else if (!targetAudienceAgeRange.includes("-")) {
        setTargetAudienceAgeRangeUserInputFeedback(
          "Entered Target Audience Age Range needs to include a dash (-)."
        )
      } else {
        const ageStorageArray = targetAudienceAgeRange.split("-");

        if (
          ageStorageArray.length !== 2 ||
          countOccurrencesOfNonConvertableCharacterInUserInputString(
            ageStorageArray[0]
          ) > 0 ||
          countOccurrencesOfNonConvertableCharacterInUserInputString(
            ageStorageArray[1]
          ) > 0
        ) {
          setTargetAudienceAgeRangeUserInputFeedback(
            "Entered Target Audience Age Range can only contain exactly two integer ages in the specified entry format."
          );
        } else if (
          parseInt(ageStorageArray[0]) < 0 ||
          parseInt(ageStorageArray[0]) > 100 ||
          parseInt(ageStorageArray[1]) < 0 ||
          parseInt(ageStorageArray[1]) > 100
        ) {
          setTargetAudienceAgeRangeUserInputFeedback(
            "Entered target audience ages need to be between 0 and 100 inclusive."
          );
        } else if (
          parseInt(ageStorageArray[0]) > parseInt(ageStorageArray[1])
        ) {
          setTargetAudienceAgeRangeUserInputFeedback(
            "Entered target audience age on the left needs to be less than the entered target audience age on the right."
          )
        } else {
          setTargetAudienceAgeRangeUserInputFeedback("")
          setMusicTourTargetAudienceAgeRange(targetAudienceAgeRange)

          const response = await fetch("/modifyTargetAudienceAgeRange", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              targetaudienceagerange: targetAudienceAgeRange,
            }),
          })

          const modificationFeedback = await response.text()
          setFieldModificationFeedback(modificationFeedback)
        }
      }
    });
  });

  useEffect(() => {
    const headliningArtistButton = document.getElementById(
      "submitHeadliningArtist"
    );
    headliningArtistButton.addEventListener("click", async function () {
      const headliningArtist =
        document.getElementById("headliningartist").textContent
      setMusicTourHeadliningArtist(headliningArtist)

      const response = await fetch("/modifyHeadliningArtist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headliningartist: headliningArtist,
        }),
      })

      const modificationFeedback = await response.text()
      setFieldModificationFeedback(modificationFeedback)
    })
  })

  useEffect(() => {
    const directSupportArtistButton = document.getElementById(
      "submitDirectSupportArtist"
    )
    directSupportArtistButton.addEventListener("click", async function () {
      const directSupportArtist = document.getElementById(
        "directsupportingartist"
      ).textContent;
      setMusicTourDirectSupportArtist(directSupportArtist)

      const response = await fetch("/modifyDirectSupportArtist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directsupportartist: directSupportArtist,
        }),
      })

      const modificationFeedback = await response.text()
      setFieldModificationFeedback(modificationFeedback)
    })
  })

  return (
    <div>
      <h2 class="mt-3 has-text-centered is-family-secondary has-text-weight-bold is-size-3">Build a Fantasy Music Tour</h2>
      <div class="content">  
        <div class="card mt-3 ml-6 mr-6">
            <p class = "is-family-sans-serif pt-2 pb-2 pl-2 pr-2">The Fantasy Music Tour Text Editor below provides a high-level format
          for building a fantasy music tour. To complete a fantasy music tour,
          information must be entered for the Tour Name, Tour Duration, Tour
          Continent, Target Audience Age Range, Headlining Artist, and Direct
          Support Artist. To enter information for those fields, edit the text
          for each item in the Fantasy Music Tour Text Editor below. Then,
          submit the entered information to your account using the corresponding
          button.</p>
        </div>
        <strong>
          <p class="pt-2 pb-2 mt-3 ml-6 mr-6 is-family-sans-serif">Important details for entering information into the editor:</p>
        </strong>
        <div class="card mt-3 ml-6 mr-6">
          <ul>
            <li>
              <p class = "is-family-sans-serif pt-2 pb-2 pl-2 pr-2">
                For the Tour Duration field, enter a number using digits. The
                duration of a tour must be greater than or equal to 0 days.
              </p>
            </li>
            <li>
              <p class = "is-family-sans-serif pt-2 pb-2 pl-2 pr-2">
                For the Target Audience Age Range field, enter the age range in
                the following format: #...-#... where # is a number written in
                digits. 15-25 is an example of a valid age range entry. A given
                age also needs to be greater than or equal to 0 and less than or
                equal to 100.
              </p>
            </li>
            <li>
              <p class = "is-family-sans-serif pt-2 pb-2 pl-2 pr-2">
                A confirmation message will appear below the Fantasy Music Tour Text
                Editor when the edited field has been successfully saved to your
                account.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <h3 class="has-text-centered is-family-sans-serif has-text-weight-semibold is-size-5 mb-3">Fantasy Music Tour Text Editor</h3>
      <div class="columns is-mobile is-centered">
          <div class="column is-two-thirds">
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class="mb-2 is-family-monospace">Tour Name</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="tourname"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourName}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitMusicTourName"
                >
                  Submit Tour Name
                </button>
            </div>
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class = "mb-2 is-family-monospace">Tour Duration (Number of Days)</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="tourduration"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourDuration}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitTourDuration"
                >
                  Submit Tour Duration
                </button>
                <p class="is-family-monospace is-size-6 has-text-danger mt-2">
                  {tourDurationUserInputFeedback}
                </p>
            </div>
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class = "mb-2 is-family-monospace">Tour Continent</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="tourcontinent"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourContinent}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitTourContinent"
                >
                  Submit Tour Continent
                </button>
            </div>
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class = "mb-2 is-family-monospace">Target Audience Age Range (#-#)</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="targetaudienceagerange"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourTargetAudienceAgeRange}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitTargetAudienceAgeRange"
                >
                  Submit Target Audience Age Range
                </button>
                <p class="is-family-monospace is-size-6 has-text-danger mt-2">
                  {targetAudienceAgeRangeUserInputFeedback}
                </p>
            </div>
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class = "mb-2 is-family-monospace">Headlining Artist</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="headliningartist"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourHeadliningArtist}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitHeadliningArtist"
                >
                  Submit Headlining Artist
                </button>
            </div>
            <div class="box has-text-centered">
                <div class="field">
                  <strong>
                    <p class = "mb-2 is-family-monospace">Direct Supporting Artist</p>
                  </strong>
                  <p
                    class="input is-info is-rounded is-family-code"
                    id="directsupportingartist"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                  >
                    {musicTourDirectSupportArtist}
                  </p>
                </div>
                <button
                  class="button is-info is-outlined is-family-code"
                  id="submitDirectSupportArtist"
                >
                  Submit Direct Supporting Artist
                </button>
            </div>
          </div>
      </div>
      <p class="has-text-centered is-size-4 has-text-success">{fieldModificationFeedback}</p>
    </div>
  );
}

export default musicTourBuilder;
