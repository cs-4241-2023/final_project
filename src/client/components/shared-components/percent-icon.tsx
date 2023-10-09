// A component the percent icon svg that takes in a value (0 to 1)

import { FC } from "react";
import styled from "styled-components";
import { COLOR_THEME } from "../../themes";

const RedArc = styled.circle.attrs({
    stroke: "#e21b3c",
    strokeDdasharray: "219.9114857512855",
    cx: "43.75",
    cy: "43.75",
    r: "35",
    fill: "transparent",
    strokeWidth: "7"
})``

const BackgroundCircle = styled.circle.attrs({
    stroke: COLOR_THEME.BACKGROUND,
    strokeLinecap: "round",
    strokeDasharray: "219.9114857512855",
    cx: "43.75",
    cy: "43.75",
    r: "35",
    fill: "transparent",
    strokeWidth: "16.5"
})``;

const GreenArc = styled.circle.attrs({
    stroke: "#26890c",
    strokeLinecap: "round",
    strokeDasharray: "219.9114857512855",
    cx: "43.75",
    cy: "43.75",
    r: "35",
    fill: "transparent",
    strokeWidth: "11"
})``;

interface PercentComponentProps {
    percent: number; // between 0 and 1
}

const PercentIcon: FC<PercentComponentProps> = ({percent}) => {

    const CIRCUMFERENCE = 219.9114857512855;
    const offset = CIRCUMFERENCE * (1 - percent / 100.0);

    return (<svg width="87.5" height="87.5" viewBox="0 0 87.5 87.5">
        <g transform="rotate(-90 43.75 43.75)">
            <RedArc />
            <BackgroundCircle style={{strokeDashoffset: offset}} />
            <GreenArc style={{strokeDashoffset: offset}} />
        </g>
    </svg>)

}

export default PercentIcon;