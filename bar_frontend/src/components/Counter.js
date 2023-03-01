import React from 'react';
import { count_data } from '../utils/Data';

const Counter = () => {
  const render_data = count_data.map((item, _in) => (
    <div
      key={_in}
      style={{
        boxShadow: "inset 0px 0px 5px #a2b6c7",
        padding: "20px 25px",
        borderRadius: "5px"
      }}
      className='member_count_inner m-1  flex items-center justify-center flex-col'
    >
      <span>
        <img src={item.img} />
      </span>
      <p className='font-bold text-2xl'>{item.count}</p>
      <h3 className='-mt-3'>{item.title}</h3>
    </div>
  ))
  return (
    <div className='container flex flex-wrap items-center justify-center'>
      {
        render_data
      }

    </div>
  )
}

export default Counter
