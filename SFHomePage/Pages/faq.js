const arrowToggle = (event) => {
	Array.from(document.getElementsByClassName('faqCarddContainer')).forEach((item) => {
		if (item === event.target.closest('.faqCarddContainer')) {
			item.querySelector('#faqarrow').classList.toggle('bi-arrow-right-circle-fill');
			item.querySelector('#faqarrow').classList.toggle('bi-arrow-down-circle-fill');
		} else {
			item.querySelector('#faqarrow').classList.remove('bi-arrow-down-circle-fill');
			item.querySelector('#faqarrow').classList.add('bi-arrow-right-circle-fill');
		}
	});
};
