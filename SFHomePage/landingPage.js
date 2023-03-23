$('#tile-1 .nav-tabs a').click(function () {
	var position = $(this).parent().position();
	var width = $(this).parent().width();
	$('#tile-1 .slider').css({ left: +position.left, width: width });
});
var actWidth = $('#tile-1 .nav-tabs').find('.active').parent('li').width();
var actPosition = $('#tile-1 .nav-tabs .active').position();
$('#tile-1 .slider').css({ left: +actPosition.left, width: actWidth });

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

		function numDifferentiation(value) {
			var val = Math.abs(value);
			if (val >= 10000000) {
				val = (val / 10000000).toFixed(2) + ' Cr';
			} else if (val >= 100000) {
				val = (val / 100000).toFixed(2) + ' Lac';
			}
			return val;
		}
		fetch('https://cohandsindia.com/misapi/getAllCohandsSlides')
			.then((res) => res.json())
			.then((response) => {
				let result = ``;
				response.cohandsInfo.map((item, index) => {
					if (index === 0) {
						result += `<div class="slide active blue"><img src="${item.image}" class="slide-image" /></div>`;
					} else {
						result += `<div class="slide blue"><img src="${item.image}" class="slide-image" /></div>`;
					}
				});
				console.log(result);
				document.getElementById('slides').innerHTML = result;
			});

		fetch('https://cohandsindia.com/misapi/gettotalsantionedamount')
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				let result = numDifferentiation(response.data[0].grandtotal);
				document.getElementById('sanctioned').innerHTML = result;
			});
		fetch('https://cohandsindia.com/misapi/getAritansaInfo')
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				let result = response.data.toLocaleString();
				document.getElementById('artisans').innerHTML = result;
			});
		function handleAll() {
			fetch('https://cohandsindia.com/misapi/getEvents')
				.then((res) => res.json())
				.then((response) => {
					console.log(response);
					let result = ``;
					response.data
						.filter(
							(item) =>
								new Date(
									item.Type === 'Physical'
										? item.PhysicalEventType === 'Single Day Event'
											? item.Date
											: item.FromDate
										: item.DateAndTime
								).getTime() > new Date().getTime()
						)
						.map((item, index) => {
							result += ` <div class="col-lg-2 m-0 p-0 card p-2 m-1 border-teal">
          <h3>${item.Name}</h3>
          <p>Date: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('DD MMM YYYY')}</p>
          <p>Time: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('hh:mm A')}</p>
          <p>Location: ${item.Location}</p>
          <div class="d-flex flex-wrap align-items-start">
          ${
						item.LinkOfMeeting
							? `<a href="${item.LinkOfMeeting}" class="btn btn-sm btn-success col-lg-4 m-1">Join</a>`
							: ''
					}
          ${
						item.Attachment
							? `<a href="${item.Attachment}" class="btn btn-sm btn-success col-lg-4 m-1">File</a>`
							: ''
					}
          </div>
        </div>`;
						});
					document.getElementById('events').innerHTML = result;
					document.getElementById('filterText').innerHTML = 'All Events';
				});
		}
		fetch('https://cohandsindia.com/misapi/getNotifications')
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				let result = ``;
				response.data.slice(0, 5).map((item, index) => {
					result += `
            <tr>
              <td width="40%">${item.Title}</td>
              <td>${moment(item.createdAt).format('DD MMM YYYY')}</td>
              <td><a href="${item.Attachment}">Download</a></td>
            </tr>`;
				});
				document.getElementById('notifications').innerHTML = result;
			});
		fetch('https://cohandsindia.com/misapi/getMeetings')
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				let result = ``;
				response.data.slice(0, 5).map((item, index) => {
					result += `
            <tr>
              <td width="40%">${item.MeetingName}</td>
              <td>${moment(item.StartDate).format('DD MMM YYYY')}</td>
              <td><a href="${item.MeetingAgenda}">Download</a></td>
            </tr>`;
				});
				document.getElementById('meetings').innerHTML = result;
			});
		fetch('https://cohandsindia.com/misapi/getExecutiveMessages')
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				let photo = response.data[0].Photo;
				let message = response.data[0].Message;
				let name = response.data[0].Name;
				document.getElementById('photo').src = photo;
				document.getElementById('message').innerHTML = message;
				document.getElementById('name').innerHTML = name;
			});

		function handlePhysical() {
			fetch('https://cohandsindia.com/misapi/getEvents')
				.then((res) => res.json())
				.then((response) => {
					console.log(response);
					let result = ``;
					response.data
						.filter(
							(item) =>
								new Date(
									item.Type === 'Physical'
										? item.PhysicalEventType === 'Single Day Event'
											? item.Date
											: item.FromDate
										: item.DateAndTime
								).getTime() > new Date().getTime()
						)
						.filter((item) => item.Type === 'Physical')
						.map((item, index) => {
							result += ` <div class="col-lg-2 m-0 p-0 card p-2 m-1 border-teal">
          <h3>${item.Name}</h3>
          <p>Date: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('DD MMM YYYY')}</p>
          <p>Time: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('hh:mm A')}</p>
          <p>Location: ${item.Location}</p>
           <div class="d-flex flex-wrap align-items-start">
          ${
						item.LinkOfMeeting
							? `<a href="${item.LinkOfMeeting}" class="btn btn-sm btn-success col-lg-4 m-1">Join</a>`
							: ''
					}
          ${
						item.Attachment
							? `<a href="${item.Attachment}" class="btn btn-sm btn-success col-lg-4 m-1">File</a>`
							: ''
					}
          </div>
        </div>`;
						});
					document.getElementById('events').innerHTML = result;
					document.getElementById('filterText').innerHTML = 'Physical Events';
				});
		}
		function handleVirtual() {
			fetch('https://cohandsindia.com/misapi/getEvents')
				.then((res) => res.json())
				.then((response) => {
					console.log(response);
					let result = ``;
					response.data
						.filter(
							(item) =>
								new Date(
									item.Type === 'Physical'
										? item.PhysicalEventType === 'Single Day Event'
											? item.Date
											: item.FromDate
										: item.DateAndTime
								).getTime() > new Date().getTime()
						)
						.filter((item) => item.Type === 'Virtual')
						.map((item, index) => {
							result += ` <div class="col-lg-2 m-0 p-0 card p-2 m-1 border-teal">
          <h3>${item.Name}</h3>
          <p>Date: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('DD MMM YYYY')}</p>
          <p>Time: ${moment(
						item.Type === 'Physical'
							? item.PhysicalEventType === 'Single Day Event'
								? item.Date
								: item.FromDate
							: item.DateAndTime
					).format('hh:mm A')}</p>
          <p>Location: ${item.Location}</p>
           <div class="d-flex flex-wrap align-items-start">
          ${
						item.LinkOfMeeting
							? `<a href="${item.LinkOfMeeting}" class="btn btn-sm btn-success col-lg-4 m-1">Join</a>`
							: ''
					}
          ${
						item.Attachment
							? `<a href="${item.Attachment}" class="btn btn-sm btn-success col-lg-4 m-1">File</a>`
							: ''
					}
          </div>
        </div>`;
						});
					document.getElementById('events').innerHTML = result;
					document.getElementById('filterText').innerHTML = 'Virtual Events';
				});
		}
		handleAll();

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
				perPage: 6,
				gap: '1rem',
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
