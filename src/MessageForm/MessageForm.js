import React from "react";
import "./MessageForm.css"
import { CloseWhite } from "../Svg";
import { Link } from "react-router-dom";

export default class MessageForm extends React.Component {
	constructor(props) {
		super(props)

		const currentDate = new Date()
		const date = `${currentDate.getDate()}-0${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`

		this.state = {
			licenseNumber: '',
			type: '',
			ownerFullName: '',
			clientId: '',
			color: '',
			date: '',
			officer: '',
			description: '',
			reqStatus: '',
		}

		this.PutLisenceNumber = this.PutLisenceNumber.bind(this)
		this.PutName = this.PutName.bind(this)
		this.PutType = this.PutType.bind(this)
		this.PutColor = this.PutColor.bind(this)
		this.PutDate = this.PutDate.bind(this)
		this.PutDescription = this.PutDescription.bind(this)
		this.PutOfficer = this.PutOfficer.bind(this)
		this.ClickSend = this.ClickSend.bind(this)
		this.PutClientId = this.PutClientId.bind(this)
	}

	PutLisenceNumber(e) {
		this.setState({ licenseNumber: e.target.value })
	}

	PutName(e) {
		this.setState({ ownerFullName: e.target.value })
	}

	PutType(e) {
		this.setState({ type: e.target.value })
	}

	PutColor(e) {
		this.setState({ color: e.target.value })
	}

	PutDate(e) {
		this.setState({ date: e.target.value })
	}

	PutDescription(e) {
		this.setState({ description: e.target.value })
	}

	PutOfficer(e) {
		this.setState({ officer: e.target.value })
	}

	PutClientId(e) {
		this.setState({ clientId: e.target.value })
	}

	ClickSend() {
		if (this.props.userToken !== '' && this.props.user.approved === true) {

			console.log(this.props.userToken)

			const newOfficerMessage = {
				licenseNumber: this.state.licenseNumber,
				ownerFullName: this.state.ownerFullName,
				type: this.state.type,
				color: this.state.color,
				date: this.state.date,
				officer: this.state.officer,
				description: this.state.description,
			}

			console.log(newOfficerMessage)
	
			fetch('https://sf-final-project.herokuapp.com/api/cases/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.props.userToken}`
				},
				body: JSON.stringify(newOfficerMessage)
			})
	
			.then(response => response.json())
					
			.then(response => {
				if (response.status === "ERR") {
					this.setState({ reqStatus: response.status })
				} else {
					this.setState({ reqStatus: response.status })
				}
			})
			
		} else { 
	
			const newMessage = {
				licenseNumber: this.state.licenseNumber,
				ownerFullName: this.state.ownerFullName,
				type: this.state.type,
				clientId: this.state.clientId,
				color: this.state.color,
				date: this.state.date,
				description: this.state.description,
			}

			fetch('https://sf-final-project.herokuapp.com/api/public/report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newMessage)
			})

			.then(response => response.json())
					
			.then(response => {
				if (response.status === "ERR") {
					this.setState({ reqStatus: response.status })
					console.log(response.message)
				} else {
					this.setState({ reqStatus: response.status })
				}
			})	
		}
	}

	render() {
		const user = this.props.user
		const logIn = this.props.logIn
		const reqStatus = this.state.reqStatus
		return (
			<div className="text messageForm">
				<Link to='/'><div className="messageForm__cross-close"><CloseWhite /></div></Link>
				<h2 className="messageForm__title">Украли велосипед ? <br/> Заполните форму о краже</h2>
				<div className="messageForm__flex">
					<div className="messageForm__block-left">
						<label className="messageForm__license-label messageForm__label">
							Номер лицензии: <span>*</span>
							<input onChange={this.PutLisenceNumber} className="messageForm__license-input messageForm__input" type='number'/>
						</label>

						<label className="messageForm__userName-label messageForm__label">
							ФИО: <span>*</span>
							<input onChange={this.PutName} className="messageForm__userName-input messageForm__input" type='text'/>
						</label>

						<label className="messageForm__bikeType-label messageForm__label">
							Тип велосипеда: <span>*</span>
							<select onChange={this.PutType} className="messageForm__bikeType-select messageForm__input">
								<option value='' selected disabled></option>
								<option value='general'>Обычный</option>
								<option value='sport'>Спортивный</option>
								<option value='sport'>Горный</option>
							</select>
						</label>

						<label className="messageForm__bikeColor-label messageForm__label">
							Цвет велосипеда:
							<input onChange={this.PutColor} className="messageForm__bikeColor-input messageForm__input" type='text'/>
						</label>

						<label className="messageForm__stealDate-label messageForm__label">
							Дата кражи:
							<input onChange={this.PutDate} className="messageForm__stealDate-input messageForm__input" type='date'/>
						</label>
					</div>

					<div className="messageForm__block-right">
						<label className="messageForm__moreInfo-label messageForm__label">
							Дополнительная информация:
							<textarea onChange={this.PutDescription} className="messageForm__moreInfo-input messageForm__input"></textarea>
						</label>


						{logIn === true || user.approved === true
							? <label className="messageForm__officer-label messageForm__label">
								Сотрундник: <span>*</span>
								<select onChange={this.PutOfficer} className="messageForm__officer-select messageForm__input">
									<option value='' disabled selected></option>
									<option value='cd36478e-8746-11ed-a1eb-0242ac120002'>Egnat Ozerov</option>
									<option value='4'>12345</option>
								</select>
							</label>
							: <label className="messageForm__stealDate-label messageForm__label">
								Ваш id: <span>*</span>
								<input onChange={this.PutClientId} className="messageForm__clientId-input messageForm__input" type='text'/>
							</label>
						}
						{console.log(user)}
						{reqStatus === 'OK'
							? <div className="messageForm__reqStatus-message messageForm__message-Ok">Заявка успешно отправлена!</div>
							: null
						}
						{reqStatus === 'ERR'
							? <div className="messageForm__reqStatus-message messageForm__message-Err">Заполнены не все обязательные поля</div>
							: null
						}
						<button onClick={this.ClickSend} className="messageForm__btn-send">Отправить</button>

					</div>
				</div>
			</div>
		)
	}
}