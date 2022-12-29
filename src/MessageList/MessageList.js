import React from "react";
import { Loupe, CloseWhite } from "../Svg";
import './MessageOfficersList.css'
import { Link } from "react-router-dom";

export default class MessageList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			messageList: [],
			error: '',
			activeIndex: '',
			inputValue: '',
			renderList: [],
			statusSelected: 'all',
		}

		this.SearchFilter = this.SearchFilter.bind(this)
		this.SelectFilter = this.SelectFilter.bind(this)
	}

	componentDidMount() {
		fetch('https://sf-final-project.herokuapp.com/api/cases/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.props.userToken}`
			}
		})

			.then(response => response.json())

			.then(response => {
				if (response.status === 'ERR') {
					this.setState({ error: response.errCode })
				} else {
					this.setState({ messageList: response.data })
				}
			})
	}

	SearchFilter(e) {
		this.setState({ inputValue: e.target.value })
		const filteredArr = () => {
			if (isNaN(Number(e.target.value))) {
				const filterByName = this.state.messageList.filter((item) => item.ownerFullName.toLowerCase().startsWith(e.target.value.toLowerCase()))
				return filterByName
			} else {
				const filterByLicense = this.state.messageList.filter((item) => item.licenseNumber.toLowerCase().startsWith(e.target.value.toLowerCase()))
				return filterByLicense
			}
		}
		this.setState({ renderList: filteredArr() })
	}

	SelectFilter(e) {
		this.setState({ statusSelected: e.target.value, inputValue: '' })
		if (e.target.value !== 'all') {
			const filterByStatus = this.state.messageList.filter((item) => item.status === e.target.value)
			this.setState({ renderList: filterByStatus })
		}
	}

	render() {
		return (
			<div className="text messageList message-officers__body-block">
				<Link to='/'><div className="message-officers__cross"><CloseWhite /></div></Link>
				<h2 className="messageList__title message-officers__title">Сообщения о кражах</h2>

				<div className="messageList-block message-officers__mainBlock">
					<div className="messageList__filter-flex message-officers__filter-flex">
						<label className="messageList__search-label message-officers__search-label">
							<Loupe />
							<input onChange={this.SearchFilter} className="messageList__search-input message-officers__search-input" type='text' value={this.state.inputValue} />
						</label>

						<select defaultValue='all' onChange={this.SelectFilter} className="messageList__search-select message-officers__search-select">
							<option selected value='all'>все</option>
							<option value='new'>новые</option>
							<option value='in_progress'>в обработке</option>
							<option value='done'>завершенные</option>
						</select>
					</div>

					<div className="messageList__list-block message-officers__list-block">

						{this.state.inputValue === '' && this.state.statusSelected === 'all'

							? this.state.messageList.map((item) => {
								return (
									<Link to={`/messageWindow/${item._id}`}>
										<div className="messageList__message-block message-officers" key={item._id}>
											<div className="messageList__mainInfo message-officers__mainInfo">
												<span className="messageList__license">{item.licenseNumber}</span>
												<span className='messageList__sendersName'>{item.ownerFullName}</span>
												<span className={`messageList__messageStatus ${item.status}`}>{item.status === 'new' ? 'новый' : item.status === 'in_progress' ? 'в обработке' : item.status === 'done' ? 'завершен' : null}</span>
											</div>
											<button className="messageList__btn-delete message-officers__btn-delete">удалить</button>
										</div>
									</Link>
								)
							})

							: this.state.renderList.map((item) => {
								return (
									<Link to={`/messageWindow/${item._id}`}>
										<div className="messageList__message-block message-officers" key={item._id}>
											<div className="messageList__mainInfo message-officers__mainInfo">
												<span className="messageList__license">{item.licenseNumber}</span>
												<span className='messageList__sendersName'>{item.ownerFullName}</span>
												<span className={`messageList__messageStatus ${item.status}`}>{item.status === 'new' ? 'новый' : item.status === 'in_progress' ? 'в обработке' : item.status === 'done' ? 'завершен' : null}</span>
											</div>
											<button className="messageList__btn-delete message-officers__btn-delete">удалить</button>
										</div>
									</Link>
								)
							})
						}
						{console.log(this.state.messageList)}
					</div>
				</div>
			</div>
		)
	}
}