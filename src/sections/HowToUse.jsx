import image from "../assets/images/pharmacist-work.jpg"

const HowToUse = () => {
	return (

		<section id='how-to-use' className=" bg-blueGray-200 -mt-24">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap">
					<div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
							<div className="px-4 flex-auto">
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap items-center mt-16  bg-white p-7 rounded-lg border-2">
					<div className="w-full md:w-6/12 px-4 mx-4">

						<h3 className="text-3xl mb-2 font-semibold leading-normal">
							MedTrack simplifies health
						</h3>
						<p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
							MedTrack makes a difference in your daily healthcare routine by making it 
							incredibly easy to find the medicines you need. With just a quick search, 
							you can instantly see which pharmacies near you have your medicines in stock, 
							and you can easily check their hours and contact information.
						</p>
					</div>
					<div className="w-full md:w-5/12 px-4 ml-[40px] mr-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded-lg bg-pink-500">
							<img alt="..." src={image} className="w-full align-middle rounded-t-lg" />
							<div className="relative p-8 mb-4">
								<h4 className="text-xl font-bold">
									Top Notch Services
								</h4>
								<p className="text-md font-light mt-2">
									MedTrack is secure, and user-friendly, 
									helping you manage your medicines and pharmacy visits effortlessly.

								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowToUse
