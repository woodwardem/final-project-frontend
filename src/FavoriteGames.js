import React from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";

class FavoriteGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      showForm: false
    }
  }


  componentDidMount = async () => {
    console.log('function fired off');
    try {
      const url = `https://game-finder-api.herokuapp.com/wishlist`;
      const gamesResponse = await axios.get(url);
      console.log(gamesResponse.data);
      this.setState({ games: gamesResponse.data });
    } catch (error) {
      console.log(error);
    }


  }


  deleteGame = async (gameToBeDeleted) => {
    try {
      const proceed = window.confirm(`Do you want to delete ${gameToBeDeleted.title}?`);

      if (proceed) {
        let newGames = this.state.games.filter(game => game._id !== gameToBeDeleted._id);
        this.setState({ games: newGames });
        const config = {
          method: "delete",
          baseURL: process.env.REACT_APP_SERVER,


          url: `/games/${gameToBeDeleted._id}`
        };
        await axios(config);
      }
    } catch (error) {
      console.error(error);
    }
  }
  handleClose = () => this.setState({ showForm: false })

  createGame = async newGame => {
    const config = {
      method: "post",
      baseURL: process.env.REACT_APP_SERVER,
      //change name of env 
      url: "/games/",
      data: newGame
    };
    const gameResults = await axios(config);
    const updatedGames = [...this.state.games, gameResults.data];
    this.setState({ games: updatedGames })
  }
  render() {
    return (
      <>
        <h3>favorite games coming soon..</h3>
        {this.state.games.length &&
          <Container>
            <Row xs={1} md={2} lg={3} xl={3}>

              {this.state.games.map((game, idx) => (

                 <Col> 
                  <Card id="card">
                    {/* <Card.title>{game.gameName}</Card.title> */}
                    {/* <Card.Text>{game.release_date}</Card.Text> */}
                    <Card.Img key={idx}
                      src={game.backgroundImg}
                      alt={game.gameName}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        }
      </>


    )
  }


}


export default FavoriteGames;