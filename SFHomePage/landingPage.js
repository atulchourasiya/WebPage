$('#tile-1 .nav-tabs a').click(function () {
	var position = $(this).parent().position();
	var width = $(this).parent().width();
	console.log(width)
	$('#tile-1 .slider').css({ left: +position.left, width: width });
});

// const navTabs = document.querySelectorAll('#tile-1 .nav-tabs a');
// navTabs.forEach(function (tab) {
// 	tab.addEventListener('click', function () {
// 		const position = this.parentNode.getBoundingClientRect();
// 		console.log(position);
// 		const width = this.parentNode.offsetWidth;
// 		console.log(width);
// 		slider.style.left = position.left + 'px';
// 		slider.style.width = width + 'px';
// 	});
// });

const activeTab = document.querySelector('#tile-1 .nav-tabs .active');
const slider = document.querySelector('#tile-1 .slider');
const activeLi = activeTab.parentNode;
const actWidth = activeLi.getBoundingClientRect().width;
const actPosition = activeTab.offsetLeft;
slider.style.left = actPosition + 'px';
slider.style.width = actWidth + 'px';

const togglebtn = (event) => {
	let btns = document.querySelector('.btn-toggle').children;
	let physicaleventtable = document.getElementById('physical');
	let virtualeventtable = document.getElementById('virtual');
	if (event.target.innerText === 'Physical') {
		physicaleventtable.classList.remove('d-none');
		virtualeventtable.classList.add('d-none');
	} else if (event.target.innerText === 'Virtual') {
		physicaleventtable.classList.add('d-none');
		virtualeventtable.classList.remove('d-none');
	}
	Array.from(btns).forEach((element) => {
		if (element === event.target) {
			element.classList.add('btn-info');
		} else {
			element.classList.remove('btn-info');
		}
	});
};

document.addEventListener('DOMContentLoaded', function () {
	var main = new Splide('#main-carousel', {
		type: 'loop',
		rewind: true,
		pagination: false,
		arrows: true,
		autoplay: true
	});
	main.mount();
	const splide = new Splide('#partnerCarousel', {
		type: 'loop',
		drag: 'free',
		focus: 'center',
		autoWidth: true,
		gap: '2rem',
		rewindByDrag: 'true',
		arrows: false,
		pagination: false,
		autoScroll: {
			speed: 0.8,
			pauseOnFocus: false
		}
	});
	splide.mount(window.splide.Extensions);
});
document.addEventListener('DOMContentLoaded', () => {
	let element = document.querySelector('.splide__arrow--next');
	setInterval(() => {
		if (element !== null && element !== undefined) element.click();
	}, 3000);
});

function validateForm() {
	var name = document.getElementById('name').value;
	if (name == '') {
		document.querySelector('.status').innerHTML = 'Name cannot be empty';
		return false;
	}
	var email = document.getElementById('email').value;
	if (email == '') {
		document.querySelector('.status').innerHTML = 'Email cannot be empty';
		return false;
	} else {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)) {
			document.querySelector('.status').innerHTML = 'Email format invalid';
			return false;
		}
	}
	var subject = document.getElementById('subject').value;
	if (subject == '') {
		document.querySelector('.status').innerHTML = 'Subject cannot be empty';
		return false;
	}
	var message = document.getElementById('message').value;
	if (message == '') {
		document.querySelector('.status').innerHTML = 'Message cannot be empty';
		return false;
	}
	document.querySelector('.status').innerHTML = 'Sending...';
}

function handleEvent() {
	fetch('https://cohandsindia.com/misapi/getEvents')
		.then((res) => res.json())
		.then((response) => {
			let PhysicalEventContainer = document.getElementById('physical');
			let VirtualEventContainer = document.getElementById('virtual');
			response.data.forEach((event) => {
				let isAttachmentPresent = event.Attachment.length === 0;
				if (event.Type === 'Physical') {
					let str = `	
								<td class="font-poppins text-center">${event.Name}</td>
								<td class="font-poppins text-center">${event.FromDate}-${event.ToDate}</td>
								<td class="font-poppins text-center">${event.Location}</td>
								<td class="font-poppins text-center">
								${
									!isAttachmentPresent
										? `<a href=${event.Attachment}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
										class="bi bi-download" viewBox="0 0 16 16">
										<path
											d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
										<path
											d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
									</svg>
									</a>`
										: `<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											fill='currentColor'
											class='bi bi-download'
											viewBox='0 0 16 16'>
											<path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
											<path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
										</svg>`
								}
								</td>
							`;

					let element = document.createElement('tr');
					element.innerHTML = str;
					PhysicalEventContainer.firstElementChild.insertAdjacentElement('beforeend', element);
				} else if (event.Type === 'Virtual') {
					let str = `	
								<td class="font-poppins text-center">${event.Name}</td>
								<td class="font-poppins text-center">${event.DateAndTime}</td>
								<td class="font-poppins text-center"><a href=${
									event.LinkOfMeeting
								}><svg xmlns="http://www.w3.org/2000/svg"
											width="20" height="20" fill="currentColor" class="bi bi-link-45deg"
											viewBox="0 0 16 16">
											<path
												d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
											<path
												d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
										</svg></a></td>
								<td class="font-poppins text-center">
								${
									!isAttachmentPresent
										? `<a href=${event.Attachment}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
										class="bi bi-download" viewBox="0 0 16 16">
										<path
											d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
										<path
											d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
									</svg>
									</a>`
										: `<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											fill='currentColor'
											class='bi bi-download'
											viewBox='0 0 16 16'>
											<path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
											<path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
										</svg>`
								}
								</td>
							`;
					let element = document.createElement('tr');
					element.innerHTML = str;
					VirtualEventContainer.firstElementChild.insertAdjacentElement('beforeend', element);
				}
			});
		});
}

function handleNotifications() {
	fetch('https://cohandsindia.com/misapi/getNotifications')
		.then((res) => res.json())
		.then((response) => {
			let NotificationsContainer = document.getElementById('notifications');
			response.data.forEach((notification) => {
				let isDownloadPresent = notification.Attachment.length === 0;
				let str = `
								<td class="font-poppins pl-4">${notification.Title}</td>

								<td class="font-poppins pl-4">${new Date(notification.createdAt).toLocaleString()}</td>

								<td class="font-poppins pointer pl-4">${
									!isDownloadPresent
										? `<a href=${notification.Attachment}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
										class="bi bi-download" viewBox="0 0 16 16">
										<path
											d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
										<path
											d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
									</svg>
									</a>`
										: `<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											fill='currentColor'
											class='bi bi-download'
											viewBox='0 0 16 16'>
											<path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
											<path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
										</svg>`
								}</td>
								`;
				let element = document.createElement('tr');
				element.innerHTML = str;
				NotificationsContainer.firstElementChild.firstElementChild.insertAdjacentElement(
					'beforeend',
					element
				);
			});
		});
}

function handleMeeting() {
	fetch('https://cohandsindia.com/misapi/getMeetings')
		.then((res) => res.json())
		.then((response) => {
			let MeetingContainer = document.getElementById('meeting');
			response.data.forEach((meeting) => {
				let str = `
								<td class="font-poppins pl-4">${meeting.MeetingName}</td>

								<td class="font-poppins pl-4">${new Date(meeting.StartDate).toLocaleString()}</td>

								<td class="font-poppins pointer pl-4"><a href=${
									meeting.MeetingAgenda
								}><svg xmlns="http://www.w3.org/2000/svg" width="20"
										height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
										<path
											d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
										<path
											d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
									</svg></a></td>
								`;
				let element = document.createElement('tr');
				element.innerHTML = str;
				MeetingContainer.firstElementChild.insertAdjacentElement('beforeend', element);
			});
		});
}
handleMeeting();
handleNotifications();
handleEvent();

// function numDifferentiation(value) {
// 	var val = Math.abs(value);
// 	if (val >= 10000000) {
// 		val = (val / 10000000).toFixed(2) + ' Cr';
// 	} else if (val >= 100000) {
// 		val = (val / 100000).toFixed(2) + ' Lac';
// 	}
// 	return val;
// }
// fetch('https://cohandsindia.com/misapi/getAllCohandsSlides')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		let result = ``;
// 		response.cohandsInfo.map((item, index) => {
// 			if (index === 0) {
// 				result += `<div class="slide active blue"><img src="${item.image}" class="slide-image" /></div>`;
// 			} else {
// 				result += `<div class="slide blue"><img src="${item.image}" class="slide-image" /></div>`;
// 			}
// 		});
// 		console.log(result);
// 		document.getElementById('slides').innerHTML = result;
// 	});

// fetch('https://cohandsindia.com/misapi/gettotalsantionedamount')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		console.log(response);
// 		let result = numDifferentiation(response.data[0].grandtotal);
// 		document.getElementById('sanctioned').innerHTML = result;
// 	});
// fetch('https://cohandsindia.com/misapi/getAritansaInfo')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		console.log(response);
// 		let result = response.data.toLocaleString();
// 		document.getElementById('artisans').innerHTML = result;
// 	});
// function handleAll() {
// 	fetch('https://cohandsindia.com/misapi/getEvents')
// 		.then((res) => res.json())
// 		.then((response) => {
// 			console.log(response);
// 			let result = ``;
// 			response.data
// 				.filter(
// 					(item) =>
// 						new Date(
// 							item.Type === 'Physical'
// 								? item.PhysicalEventType === 'Single Day Event'
// 									? item.Date
// 									: item.FromDate
// 								: item.DateAndTime
// 						).getTime() > new Date().getTime()
// 				)
// 				.map((item, index) => {
// 					result += ` <div class="col-lg-2 m-0 p-0 card p-2 m-1 border-teal">
//           <h3>${item.Name}</h3>
//           <p>Date: ${moment(
// 						item.Type === 'Physical'
// 							? item.PhysicalEventType === 'Single Day Event'
// 								? item.Date
// 								: item.FromDate
// 							: item.DateAndTime
// 					).format('DD MMM YYYY')}</p>
//           <p>Time: ${moment(
// 						item.Type === 'Physical'
// 							? item.PhysicalEventType === 'Single Day Event'
// 								? item.Date
// 								: item.FromDate
// 							: item.DateAndTime
// 					).format('hh:mm A')}</p>
//           <p>Location: ${item.Location}</p>
//           <div class="d-flex flex-wrap align-items-start">
//           ${
// 						item.LinkOfMeeting
// 							? `<a href="${item.LinkOfMeeting}" class="btn btn-sm btn-success col-lg-4 m-1">Join</a>`
// 							: ''
// 					}
//           ${
// 						item.Attachment
// 							? `<a href="${item.Attachment}" class="btn btn-sm btn-success col-lg-4 m-1">File</a>`
// 							: ''
// 					}
//           </div>
//         </div>`;
// 				});
// 			document.getElementById('events').innerHTML = result;
// 			document.getElementById('filterText').innerHTML = 'All Events';
// 		});
// }
// fetch('https://cohandsindia.com/misapi/getNotifications')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		console.log(response);
// 		let result = ``;
// 		response.data.slice(0, 5).map((item, index) => {
// 			result += `
//             <tr>
//               <td width="40%">${item.Title}</td>
//               <td>${moment(item.createdAt).format('DD MMM YYYY')}</td>
//               <td><a href="${item.Attachment}">Download</a></td>
//             </tr>`;
// 		});
// 		document.getElementById('notifications').innerHTML = result;
// 	});
// fetch('https://cohandsindia.com/misapi/getMeetings')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		console.log(response);
// 		let result = ``;
// 		response.data.slice(0, 5).map((item, index) => {
// 			result += `
//             <tr>
//               <td width="40%">${item.MeetingName}</td>
//               <td>${moment(item.StartDate).format('DD MMM YYYY')}</td>
//               <td><a href="${item.MeetingAgenda}">Download</a></td>
//             </tr>`;
// 		});
// 		document.getElementById('meetings').innerHTML = result;
// 	});
// fetch('https://cohandsindia.com/misapi/getExecutiveMessages')
// 	.then((res) => res.json())
// 	.then((response) => {
// 		console.log(response);
// 		let photo = response.data[0].Photo;
// 		let message = response.data[0].Message;
// 		let name = response.data[0].Name;
// 		document.getElementById('photo').src = photo;
// 		document.getElementById('message').innerHTML = message;
// 		document.getElementById('name').innerHTML = name;
// 	});

// function handlePhysical() {
// 	fetch('https://cohandsindia.com/misapi/getEvents')
// 		.then((res) => res.json())
// 		.then((response) => {
// 			console.log(response);
// 			let result = ``;
// 			response.data
// 				.filter(
// 					(item) =>
// 						new Date(
// 							item.Type === 'Physical'
// 								? item.PhysicalEventType === 'Single Day Event'
// 									? item.Date
// 									: item.FromDate
// 								: item.DateAndTime
// 						).getTime() > new Date().getTime()
// 				)
// 				.filter((item) => item.Type === 'Physical')
// 				.map((item, index) => {
// 					result += ` <div class="col-lg-2 m-0 p-0 card p-2 m-1 border-teal">
//           <h3>${item.Name}</h3>
//           <p>Date: ${moment(
// 						item.Type === 'Physical'
// 							? item.PhysicalEventType === 'Single Day Event'
// 								? item.Date
// 								: item.FromDate
// 							: item.DateAndTime
// 					).format('DD MMM YYYY')}</p>
//           <p>Time: ${moment(
// 						item.Type === 'Physical'
// 							? item.PhysicalEventType === 'Single Day Event'
// 								? item.Date
// 								: item.FromDate
// 							: item.DateAndTime
// 					).format('hh:mm A')}</p>
//           <p>Location: ${item.Location}</p>
//            <div class="d-flex flex-wrap align-items-start">
//           ${
// 						item.LinkOfMeeting
// 							? `<a href="${item.LinkOfMeeting}" class="btn btn-sm btn-success col-lg-4 m-1">Join</a>`
// 							: ''
// 					}
//           ${
// 						item.Attachment
// 							? `<a href="${item.Attachment}" class="btn btn-sm btn-success col-lg-4 m-1">File</a>`
// 							: ''
// 					}
//           </div>
//         </div>`;
// 				});
// 			document.getElementById('events').innerHTML = result;
// 			document.getElementById('filterText').innerHTML = 'Physical Events';
// 		});
// }
