import React from "react";
import './SignUp.css'
import { CloseWhite } from "../Svg";

export default class SignUp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			clientId: '',
			firstName: '',
			lastName: '',
			approved: '',
			againEnterPassword: '',
			reqStatus: '',
		}

		this.OnCloseSignUp = this.OnCloseSignUp.bind(this)
		this.PutApprovement = this.PutApprovement.bind(this)
		this.ClickSignUp = this.ClickSignUp.bind(this)
	}

	OnCloseSignUp() {
		this.props.funcSignUpClick(false)
	}

	PutApprovement(e) {
		this.setState({ approved: e.target.value })
	}

	ClickSignUp() {
		if (this.state.againEnterPassword !== this.state.password) {
			this.setState({ againEnterPassword: '', password: '' })
			console.log('error')
		} else {
			const newUser = {
				email: this.state.email,
				password: this.state.password,
				clientId: this.state.clientId,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			}

			console.log(newUser)

			fetch('https://sf-final-project.herokuapp.com/api/auth/sign_up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newUser)
			})

			.then(response => response.json())

			.then(response => {
				if (response.status === 'ERR') {
					this.setState({ reqStatus: response.status })
					console.log(response.message)
				} else {
					this.setState({ reqStatus: response.status })
					this.props.funcSignUpClick(false)
					this.props.funcLogInClick(true)
				}
			})
		}
	}

	render() {
		return (
			<div className="signUp-body">
				<div className="signUp">
					<div onClick={this.OnCloseSignUp} className="signUp__cross-close"><CloseWhite /></div>
					<div className="text signUp-block">
						<h2 className="signUp__title">Регистрация</h2>

						<label className="signUp__userEmail-label signUp__label">
							Почта: <span>*</span>
							<input onChange={e => this.setState({ email: e.target.value })} className="signUp__userEmail-input signUp__input" type='text' />
						</label>


						<label className="signUp__userPassword-label signUp__label">
							Пароль: <span>*</span>
							<input onChange={e => this.setState({ password: e.target.value })} className="signUp__userPassword-input signUp__input" type='password' value={this.state.password} />
						</label>


						<label className="signUp__userPassword-label signUp__label">
							Введите пароль ещё раз: <span>*</span>
							<input onChange={e => this.setState({ againEnterPassword: e.target.value })} className="signUp__userPassword-input signUp__input" type='password' value={this.state.againEnterPassword} />
						</label>


						<label className="signUp__userName-label signUp__label">
							Имя:
							<input onChange={e => this.setState({ firstName: e.target.value })} className="signUp__userName-input signUp__input" type='text' />
						</label>


						<label className="signUp__userSurname-label signUp__label">
							Фамилия:
							<input onChange={e => this.setState({ lastName: e.target.value })} className="signUp__userSurname-input signUp__input" type='text' />
						</label>


						<label className="signUp__userId-label signUp__label">
							Ваш ID <span>*</span>
							<input onChange={e => this.setState({ clientId: e.target.value })} className="signUp__userId-input signUp__input" type='text' />
						</label>

						<button onClick={this.ClickSignUp} className="signUp__btn">Зарегистрироваться</button>
					</div>
				</div>
			</div>
		)
	}
}