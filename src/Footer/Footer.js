import { GesPos, Email, Phone } from "../Svg"
import './Footer.css'

function Footer () {
	return (
		<div className='footer'>
			<div className='text footer__block'>
				<h1 className='footer__title'>BikesBase.ru</h1>
				<div className='footer__geoLoc footer__items-block'>
					<GesPos/>
					<span className='footer__geoLoc__text footer__text'>Симферополь, пр. Кирова, 1, оф. 1</span>
				</div>

				<div className='footer__email footer__items-block'>
					<Email/>
					<span className='footer__email__text footer__text'>bikesbase.bb@gmail.com</span>
				</div>

				<div className='footer__phone footer__items-block'>
					<Phone/>
					<span className='footer__phone__text footer__text'>+ 7 978 777 77 77</span>
				</div>
			</div>
		</div>
	)
}

export default Footer