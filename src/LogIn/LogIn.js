import React from "react";
import './LogIn.css'
import { CloseWhite } from "../Svg";

export default class LogIn extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			reqStatus: '',
			userId: '',
			userToken: '',
		}

		this.OnCloseLogIn = this.OnCloseLogIn.bind(this)
		this.ClickLogIn = this.ClickLogIn.bind(this)
	}

	OnCloseLogIn() {
		this.props.funcLogInClick(false)
	}
	
	ClickLogIn(e) {
		const userLog = {
			email: this.state.email,
			password: this.state.password,
		}

		console.log(JSON.stringify(userLog))

		fetch('https://sf-final-project.herokuapp.com/api/auth/sign_in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userLog),
		})

		.then(response => response.json())

		.then(response => {
			if (response.status === 'ERR') {
				this.setState({ reqStatus: response.status })
			} else {
				this.setState({ reqStatus: response.status, userId: response.data.user.id, userToken: response.data.token })
				this.props.userEntry(response.data.user, response.data.token)
				this.props.funcLogInClick(false)
				localStorage.setItem('userToken', response.data.token)
				const userData = JSON.stringify(response.data.user)
				localStorage.setItem('user', userData)
			}
		})
	}

	render() {
		return (
			<div className="logIn-body">
				<div className='logIn'>
					<div onClick={this.OnCloseLogIn} className="logIn__cross-close"><CloseWhite/></div>
					<div onKeyDown={e => e.key === 'Enter' ? this.ClickLogIn() : null} className="text logIn-block">
						<h2 className="logIn__title">Войти</h2>
						<label className="logIn__email-label logIn__label">
							Почта:
							<input onChange={e => this.setState({ email: e.target.value })} className="logIn__email-input logIn__input" type='text' />
						</label>
						<label className="logIn__password-label logIn__label">
							Пароль:
							<input onChange={e => this.setState({ password: e.target.value })} className="logIn__password-input logIn__input" type='password' />
						</label>
						{this.state.reqStatus === 'ERR'
							? <div className="logIn__error">Неверный логин или пароль</div>
							: null
						}
						<button type="submit"  onClick={this.ClickLogIn} className="logIn__btn">Далее</button>
					</div>
				</div>
			</div>
		)
	}
}