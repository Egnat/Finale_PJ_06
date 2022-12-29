import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CloseBlack } from "../Svg";
import { Link } from "react-router-dom";
import './MessageWindow.css'

function MessageWindow(props) {

	const [messageData, setMessageData] = useState({})
	const [reqStatus, setReqStatus] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [changedData, setChangedData] = useState({})
	const [rerender, setRerender] = useState(false)
	const [active, setActive] = useState('')
	const params = useParams()
	const messageId = params.id
	const ownerFullNameRef = useRef()
	const licenseNumberRef = useRef()
	const typeRef = useRef()
	const colorRef = useRef()
	const descriptionRef = useRef()
	const resolutionRef = useRef()
	const dateRef = useRef()

	useEffect(() => {
		fetch(`https://sf-final-project.herokuapp.com/api/cases/${messageId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${props.userToken}`
			}
		})

			.then(response => response.json())
			.then(response => {
				if (response.status === 'ERR') {
					setReqStatus({
						status: 'ERR',
						message: 'Что то пошло не так'
					})
				} else {
					setMessageData(response.data)
					ownerFullNameRef.current.value = response.data.ownerFullName
					licenseNumberRef.current.value = response.data.licenseNumber
					typeRef.current.value = response.data.type
					colorRef.current.value = response.data.color
					descriptionRef.current.value = response.data.description
					resolutionRef.current.value = response.data.resolution
					dateRef.current.value = response.data.date
					console.log(response)
				}
			})
	}, [rerender])

	const sendChange = () => {
		console.log(changedData)
		if (changedData !== {}) {
			fetch(`https://sf-final-project.herokuapp.com/api/cases/${messageId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${props.userToken}`
				},
				body: JSON.stringify({ ...changedData, status: 'in_progress' })
			})

			.then(response => response.json())
			.then(response => {
				if (response.status === 'ERR') {
					setReqStatus({
						status: 'ERR',
						message: response.message
					})
				} else {
					setReqStatus({
						status: 'OK',
						message: 'Изменения успешно сохранены'
					})
					setRerender(!rerender)
					setDisabled(true)
				}
			})
		}
	}

	const Finish = () => {
		if ('resolution' in changedData) {
			fetch(`https://sf-final-project.herokuapp.com/api/cases/${messageId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${props.userToken}`
				},
				body: JSON.stringify({ status: 'done' })
			})

				.then(response => response.json())
				.then(response => {
					if (response.status === 'ERR') {
						setReqStatus({
							status: 'ERR',
							message: response.message
						})
					} else {
						setReqStatus({})
						setDisabled(true)
						setRerender(!rerender)
					}
				})
		} else {
			setReqStatus({
				status: 'ERR',
				message: 'Не заполнены все обязательные поля для завершения'
			})
		}
	}

	return (
		<div className="messageWindow">
			<div className="text messageWindow-flex">
				<Link to='/messageList'><div className="messageWindow__cross-close"><CloseBlack /></div></Link>
				<div className="messageWindow__message-block-left">
					<label className="messageWindow__username-label messageWindow__label">
						ФИО:
						<input ref={ownerFullNameRef} onChange={(e) => setChangedData({ ...changedData, ownerFullName: e.target.value })} disabled={disabled} className={`messageWindow__username-input messageWindow__input ${active}`} type='text' />
					</label>

					<label className="messageWindow__license-label messageWindow__label">
						Номер лицензии:
						<input ref={licenseNumberRef} onChange={(e) => setChangedData({ ...changedData, licenseNumber: e.target.value })} disabled={disabled} className={`messageWindow__license-input messageWindow__input ${active}`} type='number' />
					</label>

					<label className="messageWindow__bikeType-label messageWindow__label">
						Тип велосипеда:
						<select ref={typeRef} onChange={(e) => setChangedData({ ...changedData, type: e.target.value })} disabled={disabled} className={`messageWindow__bikeType-input messageWindow__input ${active}`} type='text' defaultValue={messageData.type}>
							<option disabled={messageData.type === 'general' ? true : false} value='general'>обычный</option>
							<option disabled={messageData.type === 'sport' ? true : false} value='sport'>спортивный</option>
							<option disabled={messageData.type === 'mountain' ? true : false} value='mountain'>горный</option>
						</select>
					</label>

					<label className="messageWindow__bikeColor-label messageWindow__label">
						Цвет велосипеда:
						<input ref={colorRef} onChange={(e) => setChangedData({ ...changedData, color: e.target.value })} disabled={disabled} className={`messageWindow__bikeColor-input messageWindow__input ${active}`} type='text' />
					</label>

					<div className="messageWindow__stealDate-block messageWindow__date-block">
						<span className="messageWindow__stealDate-title">Дата кражи:</span>
						<input ref={dateRef} onChange={(e) => setChangedData({ ...changedData, date: e.target.value })} disabled={disabled} className="messageWindow__stealDate-date messageWindow__date" type='date' />
					</div>

					<div className="messageWindow__changesDate-block messageWindow__date-block">
						<span className="messageWindow__changesDate-title">Дата создания:</span>
						<span className="messageWindow__changesDate-date messageWindow__date">{messageData.createdAt}</span>
					</div>

					<div className="messageWindow__changesDate-block messageWindow__date-block">
						<span className="messageWindow__changesDate-title">Дата последних изменений:</span>
						<span className="messageWindow__changesDate-date messageWindow__date">{messageData.updatedAt}</span>
					</div>
				</div>

				<div className="messageWindow__message-block-right">
					<label className="messageWindow__moreInfo-label messageWindow__label">
						Дополнительное информация:
						<textarea ref={descriptionRef} onChange={(e) => setChangedData({ ...changedData, description: e.target.value })} disabled={disabled} className={`messageWindow__moreInfo-input messageWindow__input ${active}`} type='text'></textarea>
					</label>

					<label className="messageWindow__dicision-label messageWindow__label">
						Решение: <span>*</span>
						<textarea placeholder="Для завершения заполоните поля" ref={resolutionRef} onChange={(e) => setChangedData({ ...changedData, resolution: e.target.value })} disabled={disabled} className={`messageWindow__decision-input messageWindow__input ${active}`} type='text'></textarea>
					</label>

					<div style={reqStatus.status === 'ERR' ? { color: 'blue' } : { color: 'yellow' }}>{reqStatus.message}</div>
					<div className="messageWindow__btn-flex">
						{messageData.status !== 'done'
							? <>
								<button onClick={() => {
									setDisabled(!disabled)
									setActive('active')
									if (disabled === false)
										setRerender(!rerender)
									setActive('')
								}} className="messageWindow__btn-edit messageWindow__btn" style={disabled === false ? { backgroundColor: 'rgba(239, 87, 87, 1)' } : null}>{disabled === false ? 'Отменить' : 'Редактировать'}</button>
								<button onClick={() => sendChange()} className="messageWindow__btn-save messageWindow__btn">Сохранить изменении</button>
								<button onClick={() => Finish()} className="messageWindow__btn-finish messageWindow__btn">Завершить</button>
							</>

							: null
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessageWindow