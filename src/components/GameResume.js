import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { getGameById } from '../services/games';
import BackHome from './BackHome';
import dayjs from 'dayjs'
import { mapPlatforms } from '../utils';
import MetaCritic from './MetaCritic';
import BoxVideo from './BoxVideo'

const BoxResume = styled.div`
  margin: 50px auto;
  padding: 52px 48px;
  height: 800px;
  width: 1024px;
  border-radius: 50px;
`
const BoxZ = styled.div`
  
  z-index:5;
`
const BoxResumeBackImage = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.15;
  margin: 50px auto;
  padding: 52px 48px;
  height: 800px;
  width: 1024px;
  border-radius: 50px;
  background: ${({ image }) => `url(${image})`} no-repeat center;
  background-size: cover;
  z-index:-5;
`;

const Row = styled.div`
  display:flex;
  margin: 19px 0px;
  justify-content:space-between;
  align-items:center;

`
const Title = styled.span`
  font-family:'Noto Sans';
  font-size:36px;
  color:white;
`
const DateBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 126px;
  height: 24px;
  background: #333333;
  border-radius: 5px;
`
const DateRelese = styled.span`
  font-family:'Noto Sans';
  font-size:16px;
  color:white;
  font-weight:300;
  line-height:21.79px;
`

const PlatformsContainer = styled.div`
  display: flex;
  align-items: center;
`

const PlatformIcon = styled.div`
  margin-right: 20px;
`

const AboutText = styled.span`
  font-family:'Noto Sans';
  font-size:18px;
  color:white;
`
const GamePublishers= styled.div`
  margin-right: 5px;
`
const Playtime = styled.div`
  font-family: 'Noto Sans';
  width: 110px;
  height: 22px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
`
const AboutResume = styled.span`
  
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #FFFFFF;
`
const Resume = styled.div`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
`
const ResumeBox = styled.div`
  display: block;
  width: 456px;
  height: 198px;
  cursor: pointer;
  overflow-y: ${({hidden}) => !hidden ? 'hidden' : 'visible'};
`


function GameResume({selectedGame}) {
  const [game, setGame] = useState({})
  const [showAbout , setShowAbout] = useState(false)

  useEffect(() => {
    async function fetchGames() {
        const response = await getGameById(selectedGame)
        setGame(response.data)
    }
    fetchGames()
  }, [selectedGame])

  return (
    <BoxResume>
      <BoxResumeBackImage image={game.background_image} />
      <BoxZ>
      <BackHome />
      <Row>
        <Title>{game.name}</Title>
        <DateBox>
          <DateRelese>{dayjs(game.released).format('MMM DD, YYYY')}</DateRelese>
        </DateBox>
      </Row>
      <Row>
        <PlatformsContainer>
          { game.parent_platforms && game.parent_platforms.map((parent) => (
            <PlatformIcon key={parent.platform.id}>
              { mapPlatforms(parent.platform.slug) }
            </PlatformIcon>
          )) }
        </PlatformsContainer>
        <MetaCritic item={game}/>
      </Row>
      <Row>
        <PlatformsContainer>
          <GamePublishers>
            <AboutText>
              {'Publishers: '}
            </AboutText>
          </GamePublishers>    
          {
            game.publishers && game.publishers.map((publisher, index) => (
            <GamePublishers key={publisher.id} >
                <AboutText > {publisher.name} {game.publishers.length-1 === index ? '' : ', '}</AboutText>  
            </GamePublishers>
            ))
          } 
        </PlatformsContainer>
        <Playtime>{'Playtime: '}{game.playtime}{' h'}</Playtime>
      </Row>
      <AboutResume>
              {'About'}
      </AboutResume>
      <Row>
        <ResumeBox onClick={()=> setShowAbout(!showAbout)} hidden={showAbout}>
          <Resume>{game.description_raw}</Resume>
        </ResumeBox>
        <BoxVideo game={game}/>
      </Row>
      </BoxZ>
      
    </BoxResume>
  );
}

export default GameResume;