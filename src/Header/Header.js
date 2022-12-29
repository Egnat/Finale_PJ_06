import {LogIn, Profile} from "../Svg"
import './Header.css'
import { Link } from "react-router-dom"

function Header (props) {

	const OnClickLogIn = () => {
		props.funcLogInClick(true)
	}

	const OnClickSignUp = () => {
		props.funcSignUpClick(true)
	}

	const OnLogOut = () => {
		props.funcLogOutClick()
	}

	return (
	
		<div className='header'>
				{console.log(props.user)}
			<div className='text header__header-block'>
				<h1 className='header__title'>BikesBase.ru</h1>
				<div className='header__menu'>
					{props.userToken !== '' && props.user.approved === true
					? <>
						<Link to='/messageList'><span className="header__messages">Сообщений</span></Link>
						<Link to='/officersList'><span className="header__officers">Сотрудники</span></Link>
						<Link to='/messageForm'><span className="header__send-message">Создать заявку</span></Link>
					</>
					: null
					}
				</div>
				<div className='header__registration-block'>
					<LogIn className='header__svg-logIn'/>
					<div className='header__registration'>
						{props.logIn === false
						? <>
							<span onClick={OnClickLogIn} className='header__link-logIn'>Войти</span>
							<span onClick={OnClickSignUp} className='header__link-signUp'>Регистрация</span>
						</>
						: <>
							<Link to='/'><span onClick={OnLogOut} className='header__link-logIn'>Выйти</span></Link>
							<span className='header__link-signUp'>{props.user.firstName} {props.user.lastName}</span>
						</>
					}						
					</div>
					<Profile className='header__svg-profile'/>
				</div>
			</div>
		</div>
	)
}

export default Header