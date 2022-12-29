import React from 'react';
import './App.css';
import Header from './Header/Header';
import MainPage from './MainPage/MainPage';
import UserProfile from './Profile/Profile'
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import MessageList from './MessageList/MessageList';
import OfficersList from './OfficersList/OfficersList';
import MessageWindow from './MessageWindow/MessageWindow';
import MessageForm from './MessageForm/MessageForm';
import Footer from './Footer/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			logInClick: false,
			signUpClick: false,
			logIn: false,
			userNow: {},
			userToken: '',
		}

		this.ClickLogIn = this.ClickLogIn.bind(this)
		this.ClickSignUp = this.ClickSignUp.bind(this)
		this.ClickLogOut = this.ClickLogOut.bind(this)
		this.UserEntry = this.UserEntry.bind(this)
	}

	componentDidMount() {
		const savedUserToken = localStorage.getItem('userToken')
		const savedUserData = JSON.parse(localStorage.getItem('user'))
		if (savedUserToken !== null) {
			this.setState({ userToken: savedUserToken })
		}
		if (savedUserData !== null) {
			this.setState({ userNow: savedUserData })
			this.setState({ logIn: true })
		}
	}

	ClickLogIn(value) {
		this.setState({ logInClick: value })
	}

	ClickSignUp(value) {
		this.setState({ signUpClick: value })
	}

	ClickLogOut() {
		this.setState({ userNow: {} })
		this.setState({ logIn: false })
		localStorage.removeItem('user')
		localStorage.removeItem('userToken')
		console.log(this.state.logIn)
	}

	UserEntry(user, token) {
		this.setState({ userNow: user, userToken: token, logIn: true })
		console.log(user, token)
	}

	render() {
		console.log(this.state.logIn)
		console.log(this.state)
		return (
			<BrowserRouter>
				{this.state.logInClick === true
					? <LogIn userEntry={this.UserEntry} funcLogInClick={this.ClickLogIn} />
					: null
				}
				{console.log(this.state.userToken)}
				{this.state.signUpClick === true
					? <SignUp userToken={this.state.userToken} funcLogInClick={this.ClickLogIn} funcSignUpClick={this.ClickSignUp} />
					: null
				}

				<Header funcLogInClick={this.ClickLogIn} funcSignUpClick={this.ClickSignUp} userToken={this.state.userToken} user={this.state.userNow} funcLogOutClick={this.ClickLogOut} logIn={this.state.logIn} />
				<Routes>
					<Route path='/' exact element={
						<>
							<MainPage />
							<Footer />
						</>
					} />
					{this.state.userToken !== '' && this.state.userNow.approved === true
						? <>
							<Route path='/profile/:id' element={<UserProfile />} />
							<Route path='/messageList' element={<MessageList userToken={this.state.userToken}/>} />
							<Route path='/officersList' element={<OfficersList userToken={this.state.userToken}/>} />
							<Route path='/messageWindow/:id' element={<MessageWindow userToken={this.state.userToken}/>} />
						</>
						: null
					}
					<Route path='/messageForm' element={<MessageForm userToken={this.state.userToken} user={this.state.userNow} logIn={this.state.logIn} />} />
					<Route path='*' render={() => {
						<div>Ничего не найдено!</div>
					}} />
				</Routes>
			</BrowserRouter>
		);
	}
}
