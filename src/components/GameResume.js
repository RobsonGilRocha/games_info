import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import { getGameById } from '../services/games';
import BackHome from './BackHome';
import dayjs from 'dayjs'
import { mapPlatforms } from '../utils';
import MetaCritic from './MetaCritic';

const BoxResume = styled.div`
  margin: 50px auto;
  padding: 52px 48px;
  height: 800px;
  width: 1024px;
  border-radius: 50px;
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

function GameResume({selectedGame}) {
  const [game, setGame] = useState({})

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
      </Row>
    </BoxResume>
  );
}

export default GameResume;