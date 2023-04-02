const itemsPerPage = 10;
let currentPage = 1;
let items;

const toggletenderbtn = (event) => {
	let btns = document.querySelector('.btn-toggle').children;
	if (event.target.innerText === 'Open Tender') {
		handleTender('https://www.cohandsindia.com//misapi/getTenders');
	} else if (event.target.innerText === 'Close Tender') {
		handleTender('https://cohandsindia.com/misapi/ClosedTenders');
	}
	Array.from(btns).forEach((element) => {
		if (element === event.target) {
			element.classList.add('btn-info');
		} else {
			element.classList.remove('btn-info');
		}
	});
};

function handleTender(url) {
	fetch(url)
		.then((res) => res.json())
		.then((response) => {
			let TenderContainer = document.getElementById('tenderDataContainer');
			TenderContainer.innerHTML = '';
			response.data.forEach((tender) => {
				let str = `
						<td class="font-poppins pl-4">${tender.Number}</td>
                  <td class="font-poppins pl-4">${tender.Title}</td>
                  <td class="font-poppins pl-4">${tender.FloatedBy}</td>
                  <td class="font-poppins pl-4">${tender.District_State}</td>
                  <td class="font-poppins pl-4">${new Date(
										tender.Tender_Date
									).toLocaleString()}</td>
                  <td class="font-poppins pl-4">${new Date(
										tender.Closing_Date
									).toLocaleString()}</td>
                  <td class="font-poppins pl-4"><a href=${tender.Advatisement}>View</a></td>
								`;
				let element = document.createElement('tr');
				element.innerHTML = str;
				TenderContainer.insertAdjacentElement('beforeend', element);
			});
			items = Array.from(document.getElementById('tenderDataContainer').querySelectorAll('tr'));
			displayItems(currentPage);
			displayPagination();
		});
}

handleTender('https://cohandsindia.com/misapi/ClosedTenders');

function displayItems(pageNumber) {
	const startIndex = (pageNumber - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	items.forEach((item, index) => {
		if (index >= startIndex && index < endIndex) {
			item.classList.remove('d-none');
		} else {
			item.classList.add('d-none');
		}
	});
}

function displayPagination() {
	const totalPages = Math.ceil(items.length / itemsPerPage);
	let paginationContainer = document.getElementById('paginationContainer');
	paginationContainer.innerHTML = '';
	for (let i = 1; i <= totalPages; i++) {
		let li = document.createElement('li');
		li.classList.add('page-item');
		if (i === currentPage) {
			li.classList.add('active');
			li.innerHTML = `<button  class='page-link bg-info border-info'>
									${i} <span class='sr-only'>(current)</span>
								</button>`;
		} else {
			li.innerHTML = `<button style='color:var(--secondary-color)' onClick=setCurrentPage(${i}) class='page-link'>
									${i} 
								</button>`;
		}
		paginationContainer.insertAdjacentElement('beforeend', li);
	}
}

function setCurrentPage(pageNumber) {
	currentPage = pageNumber;
	displayItems(currentPage);
	displayPagination();
}

document.getElementById('tenderSearchBar').addEventListener('input', (event) => {
	let searchText = event.target.value.toLowerCase();
	if (searchText === '') {
		setCurrentPage(currentPage);
		return;
	}
	items.forEach((item) => {
		let text = item.innerText.toLowerCase();
		if (text.includes(searchText)) {
			item.classList.remove('d-none');
		} else {
			item.classList.add('d-none');
		}
	});
});
