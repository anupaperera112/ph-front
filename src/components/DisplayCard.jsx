import { useState } from "react";
import tick from "../assets/icons/tick.svg"
import copy from "../assets/icons/copy.svg"
import phImg from "../assets/images/ph.png"
// {
//     "pharmacy_id": 21,
//     "name": "Anupa Perera",
//     "address": "1/22\npahala imbulgoda imbulgoda",
//     "city": "gampaha",
//     "phone_number": "0741130285",
//     "open_hour": "21:42:00",
//     "close_hour": "22:40:00",
//     "latitude": 6.79716631,
//     "longitude": 79.89306923,
//     "distance": 9.493529796600342E-5
//   }

const DisplayCard = ({post}) => {
    const [copied, setCopied] = useState("");
    const handleCopy = () => {
      setCopied(post.no);
      navigator.clipboard.writeText(post.no);
      setTimeout(()=>setCopied(""), 3000);
    }
  
  return (
      <div className="display_card">
          <div>
              <img
                  src={phImg}
                  alt="user_Image"
                  className="object-contain w-[200px] rounded-lg center" />
          </div>
          <div className="flex flex-col mt-2">
                <h3 className="font-satoshi font-semibold text-gray-900">
                    {post.name}
                </h3>
                <p className="font-inter text-sm text-gray-500">
                    {post.address + ", " + post.city}
                </p>
                <div className="flex justify-between my-4 mb-0">
                    <p className="font-satoshi text-sm text-gray-700 pt-1" >
                        {post.phone_number}
                    </p>
                    <div className="copy_btn" onClick={handleCopy}>
                        <img 
                            src={ copied === post.no ? tick : copy }
                            className="w-[18px] h-[18px]"
                        />
                    </div>
                </div>
                <div className="font-inter text-sm text-gray-500">
                    {post.distance.toFixed(4)} Km away
                </div>
          </div>
      </div>
  )
}

export default DisplayCard