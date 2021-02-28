import React from 'react';
import styled from "styled-components"
import dayjs from 'dayjs'
import metacritic from '../images/metacritic.png'


const HeaderGame = styled.div`
    display: flex;
    align-items: center;
    margin: 30px auto;
    width: 70%;
    cursor: pointer;
`
const ImgGame = styled.div`
    background: ${({ image }) => `url(${image})`};
    min-width: 260px;
    min-height: 210px;
    max-width: 260px;
    max-height: 210px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: 10px solid black;
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 0 32px;
`
const GameTitle = styled.span`
    font-size: 30px;
    font-family: 'Noto Sans';
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 20px;
`
const GamePlatforms = styled.span`
    font-size: 18px;
    font-family: 'Noto Sans';
    color: #8E9093;
    font-weight: 600;
    margin-bottom: 19px;
`
const GameRelease = styled.span`
    font-size: ${({ size }) => size || 16}px;
    font-family: 'Noto Sans';
    color: #8E9093;
    font-weight: 600;
`
const MetacriticContainer = styled.div`
    display:flex;
    margin-top: 18px;
    align-items: center;

`
const MetacriticImg = styled.div`
    background: url(${metacritic});
    width:30px;
    height:30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

`
const MetacriticScore = styled.div`
    width: 40px;
    height: 40px;
    border: 2px solid #6DC849;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: 'Noto Sans';
    font-size: 22px;
    color: #6DC849;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
`
const LineContainer = styled.div`
    background-color: ${({ isLast }) => isLast ? 'transparent' : '#ffffff'};
    opacity: 0.1;
    width: 70%;
    margin: 0 auto;
    height: 0.5px;
`

function Game({ item, isLast }) {
    const hasMetacritc = item.metacritic !== null;

    function gameClick() {
        console.warn(hasMetacritc)
    }

    return (
        <>
            <HeaderGame onClick={() => gameClick()}>
                <ImgGame image={item.background_image} />
                <InfoContainer>
                    <GameTitle>
                        {item.name}
                    </GameTitle>
                    <GamePlatforms>
                        {item.platforms.map((platform, index) => {
                            return `${platform.platform.name}${item.platforms.length - 1 === index ? "." : ", "}`
                        })}
                    </GamePlatforms>
                    <GameRelease size={14} >
                        Released date: <GameRelease>{dayjs(item.released).format('MMM DD, YYYY')}</GameRelease>
                    </GameRelease>
                    {hasMetacritc && <MetacriticContainer>
                        <MetacriticImg />
                        <MetacriticScore>{item.metacritic}</MetacriticScore>
                    </MetacriticContainer>}
                </InfoContainer>
            </HeaderGame>
            <LineContainer isLast={isLast}/>
        </>
    )
}

export default Game;