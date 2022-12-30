import './MainPage.css'
import { Pig, Speed, CheckMark } from '../Svg'
import { Link } from 'react-router-dom'

function MainPage () {
	return (
			<div className='main-block'>
				<div className='section-1'>
						<div className='section-1__content-block'>
							<h2 className='text section-1__content-block__title'>BikesBase</h2>
							<div className='text section-1__content-block__description'>Аренда велосипедов в Крыму</div>
							<button className='text section-1__content-block__btn'>Звоните</button>
						</div>
						<div className='section-1__img'></div>
				</div>

				<div className='section-2'>
					<ul className='text section-2__content-1'>
						<li className='section-2__content-1__items'>Любите путешествовать по Крыму ? </li>
						<li className='section-2__content-1__items'>Не хотите путешествовать автостопом ?</li>
						<li className='section-2__content-1__items'>Хотите путешествовать свободно ?</li>
					</ul>
					
					<div className='text section-2__content-2'>
						Зайдите в наш центр и возьмите на прокат любой по вашему вкусу велосипед. 
			        <br/> Оформляем быстро и легко.
					</div>
				</div>

				<div className='section-3'>
					<div className='text section-3__card-1 card'>
						<h2 className='section-3__card-1__title card__title'>01</h2>
						<div className='section-3__card-1__desc card__desc'>Устали от пробок и проблем с парковками, есть решение</div>
					</div>

					<div className='text section-3__card-2 card'>
						<h2 className='section-3__card-2__title card__title'>02</h2>
						<div className='section-3__card-2__desc card__desc'>Велосипед - надёжный двухколёсный друг</div>
					</div>

					<div className='text section-3__card-3 card'>
						<h2 className='section-3__card-3__title card__title'>03</h2>
						<div className='section-3__card-3__desc card__desc'>На велосипеде можно сократить путь, не нужно стоять на светофорах</div>
					</div>

					<div className='text section-3__card-4 card'>
						<h2 className='section-3__card-4__title card__title'>04</h2>
						<div className='section-3__card-4__desc card__desc'>Велосипед это так же спорт, укрепляет здоровье и развивает мышечную массу</div>
					</div>
				</div>

				<div className='section-4'>
					<div className='section-4__img'></div>
					<ul className='text section-4__advantage'>
						<li className='section-4__advantage__item1 section-4__advantage_items'>
							<Pig/>
							<div className='section-4__advantage__item1__text-block section-4__advantage__text-block'>
								<p className='section-4__advantage__item1__text-block__title section-4__advantage__text-block__title'>Недорого</p>
								<span className='section-4__advantage__item1__text-block__desc section-4__advantage__text-block__desc'>{`(100 руб / час)`}</span>
							</div>
						</li>

						<li className='section-4__advantage__item2 section-4__advantage_items'>
							<Speed/>
							<div className='section-4__advantage__item2__text-block section-4__advantage__text-block'>
								<p className='section-4__advantage__item2__text-block__title section-4__advantage__text-block__title'>Быстро</p>
								<span className='section-4__advantage__item2__text-block__desc section-4__advantage__text-block__desc'>без лишних документов</span>
							</div>
						</li>

						<li className='section-4__advantage__item3 section-4__advantage_items'>
							<CheckMark/>
							<div className='section-4__advantage__item3__text-block section-4__advantage__text-block'>
								<p className='section-4__advantage__item3__text-block__title section-4__advantage__text-block__title'>Практично</p>
								<span className='section-4__advantage__item3__text-block__desc section-4__advantage__text-block__desc'>лёгкие велосипеды</span>
							</div>
						</li>
					</ul>
				</div>

				<div className='text section-5'>
					<div className='section-5__text'>Украли велосипед ? Нажмите здесь ⇩</div>
					<Link to='/messageForm'><button className= "section-5__btn">Сообщить о краже</button></Link>
				</div>
			</div>
	)
}

export default MainPage