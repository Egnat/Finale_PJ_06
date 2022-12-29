import React from "react";
import './OfficersList.css'
import { Loupe, CloseWhite } from "../Svg";
import '../MessageList/MessageOfficersList.css'
import { Link } from "react-router-dom";

export default class OfficersList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			officersList: [],
			renderList: [],
			statusSelected: 'all',
			inputValue: '',
			error: '',
		}

		this.SelectFilter = this.SelectFilter.bind(this)
		this.SearchFilter = this.SearchFilter.bind(this)
	}

	componentDidMount() {
		fetch('https://sf-final-project.herokuapp.com/api/officers/', {
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
					this.setState({ officersList: [...response.officers, {id: '1', firstName: 'Пётр', lastName: 'Петров', approved: false }, {id: '2', firstName: 'VASY', lastName: 'Similarweb', approved: false }] })
				}
			})
	}

	SelectFilter(e) {
		this.setState({ statusSelected: e.target.value })
		console.log(JSON.parse(e.target.value))
		if (e.target.value !== 'all') {
			const filterByStatus = this.state.officersList.filter(item => item.approved === JSON.parse(e.target.value))
			this.setState({ renderList: filterByStatus })
		}
	}

	SearchFilter(e) {
		this.setState({ inputValue: e.target.value })
		const filterByLastName = this.state.officersList.filter((item) => item.lastName.toLowerCase().startsWith(e.target.value.toLowerCase()))
		const filterByFirstName = this.state.officersList.filter((item) => item.firstName.toLowerCase().startsWith(e.target.value.toLowerCase()))
		const newSet = new Set([...filterByFirstName, ...filterByLastName])
		this.setState({ renderList: [...newSet] })
	}

	render() {
		return (
			<div className="text officersList message-officers__body-block">
				<Link to='/'><div className='message-officers__cross'><CloseWhite /></div></Link>
				<h2 className="officersList__title message-officers__title">Список сотрудников</h2>
				<div className="officersList-block message-officers__mainBlock">
					<div className="officersList__filter-flex message-officers__filter-flex">
						<label className="officersList__search-label message-officers__search-label">
							<Loupe />
							<input onChange={this.SearchFilter} className="officersList__search-input message-officers__search-input" type='text' />
						</label>

						<select onChange={this.SelectFilter} className="officersList__search-select message-officers__search-select">
							<option selected value='all'>все</option>
							<option value='true'>одобренных</option>
							<option value='false'>не одобренных</option>
						</select>
					</div>
					<div className="officersList__list-block message-officers__list-block">
						{this.state.inputValue === '' && this.state.statusSelected === 'all'
							? this.state.officersList.map((item) => {
								return (
									<Link to={`/profile/:${item._id}`}>
										<div className="officersList__officer-block message-officers" key={item._id}>
											<div className="officersList__mainInfo message-officers__mainInfo">
												<span className="officersList__officerName">{item.firstName} {item.lastName}</span>
												<span className="officersList__approvement" style={item.approved === true ? { color: 'yellow' } : { color: 'blue' }}>{item.approved === true ? 'одобрен' : 'не одобрен'}</span>
											</div>

											<button className="officersList__btn-delete message-officers__btn-delete">удалить</button>
										</div>
									</Link>
								)
							})
							: this.state.renderList.map((item) => {
								return (
									<Link to={`/profile/:${item._id}`}>
										<div className="officersList__officer-block message-officers" key={item._id}>
											<div className="officersList__mainInfo message-officers__mainInfo">
												<span className="officersList__officerName">{item.firstName} {item.lastName}</span>
												<span className="officersList__approvement" style={item.approved === true ? { color: 'yellow' } : { color: 'blue' }}>{item.approved === true ? 'одобрен' : 'не одобрен'}</span>
											</div>

											<button className="officersList__btn-delete message-officers__btn-delete">удалить</button>
										</div>
									</Link>
								)
							})
						}
						
					</div>
				</div>
			</div>
		)
	}
}