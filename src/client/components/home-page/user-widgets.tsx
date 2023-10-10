import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { UserInfo } from "../../../../models";
import PercentIcon from "../shared-components/percent-icon";
import { Method, fetchServer } from "../../scripts/fetch-server";

interface UserWidgetProps {
    userInfo: UserInfo;
}

const MainDivStyle = styled.div
`
font-family: ${FONT_THEME.MAIN_FONT};
color: white;
display: flex;
justify-content: space-between;
width: 75%;
`

const WidgetDivStyle = styled.div
`
background-color: ${COLOR_THEME.SECTION};
margin: 10px;
padding: 20px;
min-width: 30%;
`

const LoggedDaysStyle = styled.div
`
// padding: 10px;
display: flex;
justify-content: center;
// transform: translateY(-17px)
`

const PercentSuccessTextStyle = styled.div
`
// transform: translateY(-56px);
margin-left: 10px;
font-size: 40px;
`

const CalendarImgStyle = styled.img 
`
width: 35px;
height: 35px;
// margin-right: 10px;
`

const PercentWidgetStyle = styled.div
`
// margin-left: 60px;

`

const LoggedDaysTextStyle = styled.h3
`
margin-top: 30px;
`

const UserWidgetComponent: FC<UserWidgetProps> = ({ userInfo }) => {
    return (
        <MainDivStyle>
        <WidgetDivStyle className="rounded">
                <LoggedDaysStyle className="h3">
                    <div className="text-center">
                        Time Logged
                        <LoggedDaysTextStyle>
                            <CalendarImgStyle src="/calendaricon.png"></CalendarImgStyle>
                            {userInfo.numLoggedDays} days
                        </LoggedDaysTextStyle> 
                    </div>
                </LoggedDaysStyle>
        </WidgetDivStyle>
        <WidgetDivStyle className="rounded">
                <PercentWidgetStyle className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Weekly Success</h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <PercentIcon percent={userInfo.percentSuccessWeek}/>
                        <PercentSuccessTextStyle className="text-center">{userInfo.percentSuccessWeek}%</PercentSuccessTextStyle>
                    </div>
                </PercentWidgetStyle>
        </WidgetDivStyle>
        <WidgetDivStyle className="rounded">
                <PercentWidgetStyle className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Lifetime Success</h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <PercentIcon percent={userInfo.percentSuccessLifetime}/> 
                        <PercentSuccessTextStyle className="text-center">{userInfo.percentSuccessLifetime}%</PercentSuccessTextStyle>
                    </div>
                </PercentWidgetStyle>
        </WidgetDivStyle>
        </MainDivStyle>
    )
}

export default UserWidgetComponent;