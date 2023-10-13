import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { UserInfo } from "../../../../models";
import PercentIcon from "../shared-components/percent-icon";

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
margin: 10px 0 30px 0;
padding: 20px;
min-width: 31%;
`

const LoggedDaysStyle = styled.div
`
display: flex;
justify-content: center;
`

const PercentSuccessTextStyle = styled.div
`
font-size: 50px;
`

const CalendarImgStyle = styled.img 
`
width: 70px;
height: 70px;
margin-right: 10px;
`

const PercentWidgetStyle = styled.div
`
margin-right: 10px;
width: 65px;
height: 65px;
`

const LoggedDaysTextStyle = styled.h3
`
font-size: 50px;
transform: translateY(14px);
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
                <div className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Weekly Success</h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <PercentWidgetStyle>
                            <PercentIcon percent={userInfo.percentSuccessWeek}/>
                        </PercentWidgetStyle>
                        <PercentSuccessTextStyle className="text-center">{userInfo.percentSuccessWeek}%</PercentSuccessTextStyle>
                    </div>
                </div>
        </WidgetDivStyle>
        <WidgetDivStyle className="rounded">
                <div className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Lifetime Success</h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <PercentWidgetStyle>
                            <PercentIcon percent={userInfo.percentSuccessLifetime}/> 
                        </PercentWidgetStyle>
                        <PercentSuccessTextStyle className="text-center">{userInfo.percentSuccessLifetime}%</PercentSuccessTextStyle>
                    </div>
                </div>
        </WidgetDivStyle>
        </MainDivStyle>
    )
}

export default UserWidgetComponent;