import React from 'react'
import pic from '../../assets/images/president_20221001013039.jpg'

import {
    Card,
    CardHeader,
    CardBody,
    Typography
  } from "@material-tailwind/react";

const CecMessageCard = ({name, designation}) => {
       
        return (
          <Card className="w-[100%]  flex items-center shadow-2xl border  divide-solid  border-gray-100 mb-[30px]">
            <CardHeader floated={false} className="h-40 w-40 shadow-[0_0px_0px_2px_rgba(25,43,54,0.2)] border rounded-full divide-solid border-gray-500 hover:shadow-[0_0px_0px_12px_rgba(0,0,0,0.1)] transition duration-600">
              <img src={pic} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" color="blue-gray" className="text-[19px]">
              Adv Md. Abdullah Abu
              </Typography>
              <Typography variant="h5" color="blue" className="font-medium text-[#F42A41] "  textGradient>
              Chief Election Commissioner
              </Typography>
              <div className='text-[16px] pt-[10px] m-0 text-left'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium consequatur, atque ratione minus nemo molestiae necessitatibus pariatur! Rem recusandae possimus distinctio assumenda, ducimus, corrupti earum ratione odit fugit, dolorem alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut molestiae aliquid harum autem, vitae molestias qui totam nihil saepe. Vel quo ex rem adipisci repellat eaque ab, aut optio quas provident, neque veritatis, deleniti pariatur obcaecati fugiat eveniet doloremque doloribus corrupti ratione accusantium. Cum, quibusdam temporibus? Facilis a animi veritatis corporis cupiditate nesciunt consequatur ipsa, quia laborum quam harum necessitatibus molestiae facere mollitia doloremque alias asperiores! Aut blanditiis iste ipsam tenetur magnam, ratione non, tempora minus minima doloremque quo quia. Sunt, magnam dolores itaque dolorem ipsa repudiandae ea voluptate non tempore? Sint fugit ex atque explicabo reiciendis laudantium enim mollitia! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa libero eius maxime nisi. Obcaecati veritatis ad sed, omnis corporis accusamus aut unde autem fugit labore ipsum provident sequi itaque harum architecto eos aliquid rerum inventore similique impedit minima possimus qui? Quasi mollitia saepe laboriosam veniam voluptates fuga, ipsam quo quas est, ex nam repellat vero, vel odit! Porro sequi, laboriosam atque deserunt sed officiis? Porro numquam vero sed accusamus quas inventore, voluptatibus rem! Eligendi rerum quos officiis non, id modi nulla. Eos officia eum, sint eveniet sapiente perspiciatis, aliquid ad iste, molestiae veniam ex nesciunt obcaecati consequatur neque in possimus.

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla saepe beatae sequi vero numquam adipisci ea sit. Mollitia quia optio maiores ipsa ab fugiat ratione accusamus eos sapiente, omnis, quibusdam delectus fuga perferendis error tempora? Cupiditate vero nemo ab libero nihil perferendis assumenda laborum illo reiciendis vitae, fugit, dolores officia nobis. Modi quam debitis cumque quaerat voluptas cum est aliquid saepe nobis ut quos accusamus, quia rem doloribus sint. Modi, blanditiis eligendi porro adipisci iusto commodi quasi aut ipsam laboriosam dolorem molestias quos, doloribus repellat? Velit mollitia atque perferendis necessitatibus accusamus provident totam consequuntur blanditiis repudiandae dolor in porro laudantium, similique eius debitis accusantium reprehenderit delectus corporis quisquam suscipit nostrum asperiores quia fugit. Fugit unde in quam id praesentium cupiditate ex harum porro inventore laborum neque cum facere at, sequi quo, enim perferendis necessitatibus
              </div>
           
            </CardBody>
           
          </Card>
        );
      
}

export default CecMessageCard