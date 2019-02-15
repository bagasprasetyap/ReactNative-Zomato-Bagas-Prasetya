import React, { Component } from "react";
import axios from "axios";
import { Alert, Image } from "react-native";
import {
  Container,
  Header,
  Icon,
  Text,
  Item,
  Input,
  Button,
  Content,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  ListItem
} from "native-base";

class App extends Component {
  constructor() {
    super();
    this.state = {
      makanan: "",
      resto: []
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  cari = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${
      this.state.makanan
    }`;
    var config = {
      headers: { "user-key": "a2eef5c322a4a59959babbafd878ed4e" }
    };
    axios.get(url, config).then(ambilData => {
      // console.log(ambilData);
      this.setState({ resto: ambilData.data.restaurants });
    });
  };

  render() {
    var allData = this.state.resto.map((val, i) => {
      var nama = val.restaurant.name;
      var kota = val.restaurant.location.city;
      var alamat = val.restaurant.location.address;
      var harga = val.restaurant.average_cost_for_two;
      var thumb = val.restaurant.thumb;
      var photo = val.restaurant.featured_image;
      return (
        <ListItem key={i}>
          <Card style={{ width: 500 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: thumb }} />
                <Body>
                  <Text>{nama}</Text>
                  <Text note>{kota}</Text>
                  <Text note>{alamat}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: photo }}
                  style={{ flex: 1, height: 250, width: "100%" }}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Harga makan berdua:</Text>
                <Text note>{harga}</Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      );
    });

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input
              placeholder="Restoran"
              value={this.state.makanan}
              onChangeText={e => {
                this.setState({ makanan: e });
              }}
            />
            <Icon name="restaurant" />
          </Item>
        </Header>
        <Button
          block
          warning
          style={{ alignSelf: "center", margin: 10 }}
          onPress={this.cari}
        >
          <Text>Cari Restoran</Text>
        </Button>
        <Content style={{ alignSelf: "center" }}>{allData}</Content>
      </Container>
    );
  }
}

export default App;
