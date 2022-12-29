import './Profile.css'
import { UserFoto } from '../Svg'
import { CloseWhite } from '../Svg'
import React from 'react'

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			disabled: true,
		}

		this.onClickEdit = this.onClickEdit.bind(this)
		this.onClickSave = this.onClickSave.bind(this)
	}

	onClickEdit() {
		this.setState({ disabled: false})
	}

	onClickSave() {
		this.setState({ disabled: true })
	}

	render() {
		return (
			<div className='userProfile'>
				<div className='userProfile__mainBlock'>
					<div className='userProfile__cross-closer'><CloseWhite/></div>
					<div className='text userProfile__block-1'>
						<div className='userProfile__userMainInfo-block'>
							<div className='userProfile__userFoto'><UserFoto/></div>
							<div className='userProfile__userMainInfo'>
								<span className='userProfile__userName'>Пётр Петров</span>
								<svg className='userProfile__line-horizontal' width="277" height="3" viewBox="0 0 277 3" fill="none" xmlns="http://www.w3.org/2000/svg">
									<line x1="0.354492" y1="1.5" x2="276.652" y2="1.5" stroke="white" stroke-width="3"/>
								</svg>
								<span className='userProfile__userEmail'>petrpetrov@gmail.com</span>
							</div>
						</div>

						<div className='userProfile__userId'>ID: petrpetrov</div>
						<label className='userProfile__approve-label'>
							<input className='userProfile__approve-checkbox' type='checkbox'/>
							Одобрен
						</label>
					</div>

					<svg className='userProfile__line-vertical' width="3" height="448" viewBox="0 0 3 448" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="3" height="448" fill="#F9F9F9"/>
					</svg>

					<div className='text userProfile__content-2'>
							<label className='userProfile__userPhone-label userProfile__label'>
								Номер телефона:
								<input disabled={ this.state.disabled } className='userProfile__phone-input userProfile__input' type='text' defaultValue='+7 978 645 55 55' style={this.state.disabled === false ? {caretColor: 'white'} : null}/>
							</label>
							<label className='userProfile__userAddress-label userProfile__label'>
								Адрес проживание:
								<input disabled={ this.state.disabled } className='userProfile__userAddress-input userProfile__input' type='text' defaultValue='г.Симферополь; ул. Кирова; д. 10, кв. 7' style={this.state.disabled === false ? {caretColor: 'white'} : null}/>
							</label>
							<label className='userProfile__userBirthDate-label userProfile__label'>
								Дата рождения:
								<input disabled={ this.state.disabled } className='userProfile__userBirthDate-input userProfile__input' type='text' defaultValue='10/08/1979' style={this.state.disabled === false ? {caretColor: 'white'} : null}/>
							</label>
							<label className='userProfile__userNationality-label userProfile__label'>
								Гражданство:
								<input disabled={ this.state.disabled } className='userProfile__userNationality-input userProfile__input' type='text' defaultValue='РФ' style={this.state.disabled === false ? {caretColor: 'white'} : null}/>
							</label>

							<div className='userProfile__btn-flex'>
								<button onClick={ this.onClickEdit } className='userProfile__btn-edit userProfile__btn'>Редактировать</button>
								<button onClick={ this.onClickSave } className='userProfile__btn-save userProfile__btn'>Сохранить</button>	
							</div>
					</div>
				</div>
			</div>
		)
	}
}