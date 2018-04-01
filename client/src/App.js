import React, { Component } from 'react';
import CardTW from './components/cardTW';
import BackgroundImage from './container/backgroundImage';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
import * as TodoActions from '../src/actions/index'
import { DragDropContext} from 'react-dnd';
import Board from '../src/components/board';
import _ from 'lodash';
import {WholeBoard} from './styles/--board';
import {AppWrap} from './styles/--main';

class App extends Component {
  render() {
    let { todos } = this.props;
    let { moveTodo } = this.props.actions
    let b0 = _.filter(todos,(todos)=>{return todos.pos === 0 })
    let b1 = _.filter(todos,(todos)=>{return todos.pos === 1 })
    let b2 = _.filter(todos,(todos)=>{return todos.pos === 2 })
   
      return (
        <AppWrap>
             
        <BackgroundImage />
        <WholeBoard>
         <Board  actions={this.props.actions}  movetodo={moveTodo} bpos='0'  todo={b0}/>
         <Board  actions={this.props.actions}  movetodo={moveTodo} bpos='1'  todo={b1} />
         <Board  actions={this.props.actions}  movetodo={moveTodo} bpos='2' todo={b2} />

       </WholeBoard>
       <CardTW />
        </AppWrap>
    );
  }
}

const mapStateToProps = state => state

const mapDispatchToProps= dispatch =>({
 actions: bindActionCreators(TodoActions, dispatch) 
})
      
export default _.flow(connect(mapStateToProps,mapDispatchToProps),DragDropContext(HTML5Backend))(App);

