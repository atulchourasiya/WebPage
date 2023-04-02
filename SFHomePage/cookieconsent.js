const isAlreadyAllowed = () => {
	const cookiesPermission = localStorage.getItem('cookiespermission');
	if (
		cookiesPermission === null ||
		cookiesPermission === 'undefined' ||
		new Date().getTime() > JSON.parse(cookiesPermission).expiration
	) {
		return false;
	} else {
		return true;
	}
};
const handleAllow = () => {
	let expiration = new Date().getTime();
	expiration = expiration + 86400000 *15;
	let modal = document.getElementById('mymodal');
	const cookiesPermission = localStorage.setItem(
		'cookiespermission',
		JSON.stringify({ value: 'true', expiration })
	);
	modal.classList.remove('d-flex')
	modal.classList.add('d-none')
};
const cookieConsent = () => {
	if (isAlreadyAllowed()) {
		return;
	}
	let html = `<div id="mymodal" class="row position-fixed d-flex align-items-center w-100 m-0"
		style="top:100vh; transform: translateY(-100%); left: 0px;background-color: rgb(255, 255, 255); z-index: 100000 ;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
		<div class="col-md-10 pr-0">
			<p class="font-lato m-0 px-md-2 px-2 pt-1" style="font-size: var(--fs-500);">We use cookie</p>
			<p class="font-poppins mb-1 px-md-2 px-2 pt-1" style="font-size: smaller;">We use cookies on our website to
				enhance your browsing experience and to provide you with personalized
				content. By clicking "Allow Cookie" you consent to the use of all cookies.For more information about our use
				of cookies and your rights.
				Learn more about our
				<a href="./Pages/cookiepolicy.html">Privacy Policy.</a>
			</p>
		</div>
		<div class="col-md-2 px-4 px-md-0 d-flex justify-content md-center">
			<button onClick="handleAllow()" class="btn rounded-pill d-flex font-poppins my-2 my-md-0" style="background-color:#17a2b8;color:#fff">Allow Cookies</button>
		</div>
	</div>`;
	let div = document.createElement('div');
	div.innerHTML = html;
	document.body.insertAdjacentElement('afterbegin', div);
};
cookieConsent();
