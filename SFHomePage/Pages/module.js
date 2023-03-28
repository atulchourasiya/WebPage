let toggleReadMore = (event,type)=>{
 if(type === 1){
   event.target.nextElementSibling.classList.remove('d-none');
   event.target.nextElementSibling.nextElementSibling.classList.remove('d-none');
   event.target.classList.add('d-none');
 }
 else if(type === 2){   
   event.target.previousElementSibling.previousElementSibling.classList.remove('d-none');
   event.target.previousElementSibling.classList.add('d-none');
   event.target.classList.add('d-none');
 }
}
let createReadMore = (string) => {
	if (string.length <= 200) {
		return string;
	}
	let trimmedstr = string.substring(0, 130);
	let reststr = string.substring(130);
	return `<p>${trimmedstr}<span class='font-weight-normal font-weight-bold pointer' onClick='toggleReadMore(event,1)'>&nbsp;Read More...</span><span class='d-none'>${reststr}</span><span class='font-weight-bold d-none pointer' onClick='toggleReadMore(event,2)'>Read Less...</span>
   </p> `;
};
let response = [
	{
		status: true,
		_id: '627deabb85d942957ddddaef',
		image: 'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Bamboo-module_477735507.jpg',
		description:
			'This design module encompasses three collections of lamps, clocks and furniture which have high demand in market. This module also contains important information regarding bamboo farming along with its preservation. Few interactive sessions and activities are also given to help artisans learn new skills.\n\n',
		pdfFile:
			'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Bamboo Design and Development Module (COHANDS)_922082059.pdf',
		user: [
			{
				_id: '641c1f8d6447f3d67fde4c60',
				name: 'Saurabh Tripathi',
				email: 'contact@saurabhtripathi.in',
				mobile: '9755570187'
			},
			{
				_id: '641c1f8d6447f3d67fde4c61',
				name: 'Rishi',
				email: 'rishindra768@gmail.com',
				mobile: '7259429248'
			},
			{
				_id: '641c1f8d6447f3d67fde4c62',
				name: 'ANUPAMA SINGH',
				email: 'anupama.rudseti@gmail.com',
				mobile: '09910647225'
			},
			{
				_id: '641c1f8d6447f3d67fde4c63',
				name: 'Narayan Murthy',
				email: 'mnmurthy123bsp@gmail.com',
				mobile: '7000983482'
			},
			{
				_id: '641c1f8d6447f3d67fde4c64',
				name: 'Muva',
				email: 'easternanar@gmail.com',
				mobile: '09612929971'
			},
			{
				_id: '641c1f8d6447f3d67fde4c65',
				name: 'poornima soni',
				email: 'poornima.soni@nift.ac.in',
				mobile: '8700014751'
			}
		],
		createdAt: '2022-05-13T05:20:59.235Z',
		updatedAt: '2023-03-23T09:44:45.467Z',
		__v: 0
	},
	{
		status: true,
		_id: '627deae285d942957ddddaf2',
		image: 'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Zari-zardozi-module_777908270.jpg',
		description:
			'This module encompasses two collection of home decor and apparels, selected after extensive market research, It has every step of design process i.e. color palette, motif guide and whole design process from material board to the final look of the product so that it becomes easy for the artisans to refer this module while designing products of zari zardozi.\n\n',
		pdfFile:
			'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Zari-Zardozi Design and Development Module(COHANDS)_662149957.pdf',
		user: [
			{
				_id: '634e4af99836adf87d4b7f17',
				name: 'Rishi',
				email: 'rishindra768@gmail.com',
				mobile: '7259429248'
			},
			{
				_id: '634e4af99836adf87d4b7f18',
				name: 'ANUPAMA SINGH',
				email: 'anupama.rudseti@gmail.com',
				mobile: '09910647225'
			},
			{
				_id: '634e4af99836adf87d4b7f19',
				name: 'neeraj',
				email: 'niftians8@gmail.com',
				mobile: '9450840439'
			}
		],
		createdAt: '2022-05-13T05:21:38.389Z',
		updatedAt: '2022-10-18T06:43:05.390Z',
		__v: 0
	},
	{
		status: true,
		_id: '627debff85d942957ddddafc',
		image:
			'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Screenshot%202022-05-13%20105543_610582811.jpg',
		description:
			'It is a training module designed for 30 days for skilled and semi - skilled artisans working in craft clusters. It mainly focuses on how we can increase the skill set of artisans and help them in diversifying the product range in sync with current market trends.',
		pdfFile: 'https://downloadbuckets.s3-ap-south-1.amazonaws.com/chanderi module_420247137.pdf',
		user: [
			{
				_id: '63de1ef435c5986c7a284166',
				name: 'nk',
				email: 'niftians8@gmail.com',
				mobile: '9450840439'
			},
			{
				_id: '63de1ef435c5986c7a284167',
				name: 'Debasish Dhar',
				email: 'babundhar175@gmail.com',
				mobile: '7602608273'
			}
		],
		createdAt: '2022-05-13T05:26:23.195Z',
		updatedAt: '2023-02-04T09:01:40.103Z',
		__v: 0
	},
	{
		status: true,
		_id: '627dec6585d942957ddddb01',
		image:
			'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Screenshot%202022-05-13%20105704_599269601.jpg',
		description:
			'The objective of this module is  to teach artisans new skills Explore Batik technique and new product range To guide artisan to find their forte and development their portfolio To teach them to calculate pricing of products',
		pdfFile: 'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Batik module_627425706.pdf',
		user: [
			{
				_id: '634e4a8d9836adf87d4b7efc',
				name: 'MANOHARLAL',
				email: 'gvssjodhpur2@gmail.com',
				mobile: '9414499337'
			},
			{
				_id: '634e4a8d9836adf87d4b7efd',
				name: 'ANUPAMA SINGH',
				email: 'anupama.rudseti@gmail.com',
				mobile: '09910647225'
			},
			{
				_id: '634e4a8d9836adf87d4b7efe',
				name: 'Neeraj yadav',
				email: 'niftians8@gmail.com',
				mobile: '9450840439'
			}
		],
		createdAt: '2022-05-13T05:28:05.956Z',
		updatedAt: '2022-10-18T06:41:17.973Z',
		__v: 0
	},
	{
		status: true,
		_id: '6332a1cf16f161dafb58eedc',
		image: 'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Terracotta-module_602213614.jpg',
		description: 'Training Module for Terracotta Crafts',
		pdfFile:
			'https://downloadbuckets.s3-ap-south-1.amazonaws.com/Terracotta Design and Development Module (COHANDS)_587999773.pdf',
		user: [
			{
				_id: '63898c9cb7b029b37f1a2cd8',
				name: 'ANUPAMA SINGH',
				email: 'anupama.rudseti@gmail.com',
				mobile: '09910647225'
			},
			{
				_id: '63898c9cb7b029b37f1a2cd9',
				name: 'Shruthi Surendran',
				email: 'svep.pm3@ediindia.org',
				mobile: '9328072236'
			}
		],
		createdAt: '2022-09-27T07:10:07.354Z',
		updatedAt: '2022-12-02T05:26:52.802Z',
		__v: 0
	}
];
let moduleData = response.map((element) => {
	return `<div class="mt-3 p-3 modulecard">
            <div class="card" style="border-radius: 15px;">
               <div class="view overlay">
                  <img class="card-img-top "
                     style="border-radius: 15px; border-bottom-left-radius: 0px; border-bottom-right-radius:0px ;"
                     src=${element.image} alt="Card image cap">
                  <a href="#!">
                     <div class="mask rgba-white-slight"></div>
                  </a>
               </div>
               <div class="card-body">
                  <p class="card-text">${createReadMore(element.description)}</p>
                  <a href=${
										element.pdfFile
									} class="btn moduleDownloadBtn" data-toggle="modal" data-target="#exampleModal" >Download</a>
               </div>
            </div>
         </div>`;
});

document.getElementById('cardContainer').innerHTML = moduleData;
