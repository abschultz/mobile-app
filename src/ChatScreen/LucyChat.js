import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Right,
  Icon,
  Title,
  Input,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  Label
} from "native-base";
import HomeScreen from "../HomeScreen";


export default class LucyChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notes:[]};
  }

  componentDidMount() {
    this.getNotes();
  }

  async getNotes() {
    try {
      let response = await fetch(
        'https://sjcz7bvg5j.execute-api.us-east-1.amazonaws.com/dev/notes'
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        notes: responseJson
      });
      return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }

  createNote() {
    if (!this.state.noteTitle || !this.state.noteDescription) {
      console.log('needs note');
      return;
    }

    fetch('https://sjcz7bvg5j.execute-api.us-east-1.amazonaws.com/dev/notes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.noteTitle,
        description: this.state.noteDescription,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.getNotes();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Notes</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Title</Label>
            <Input
              onChangeText={(noteTitle) => this.setState({noteTitle})}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Description</Label>
            <Input
              onChangeText={(noteDescription) => this.setState({noteDescription})}
            />
          </Item>
          <Button
            rounded
            danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => {
              this.createNote();
            }}
          >
            <Text>Add Note</Text>
          </Button>

          <List>
            {this.state.notes.map((x,idx)=>{
              return (
                <ListItem key={idx}>
                  <Text>{x.title}</Text>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
