import Link from 'next/link';
import React from 'react';

const Announcement = () => {
  return (
    <div className="bg-white p-4 sm:p-10 md:p-12 relative">
      <div className="grid grid-cols-1 gap-10">
        {/* Center Content */}
        <div className="col-span-1 lg:col-span-1">
          {[
            {
              img: 'https://res.cloudinary.com/dakqa3htw/image/upload/v1746612753/296287773_3378040289091916_9099761763398676425_n_zgefl2.png',
              date: 'July 28',
              title: 'Forval Cambodia - Careers ',
              description:
                'Forval Cambodia is a leading provider of financial services in Cambodia. We are looking for talented and ambitious individuals to join our team!',
            },
            {
              img: 'https://res.cloudinary.com/dakqa3htw/image/upload/v1746612848/494686627_669299445845312_1052352267290748920_n_ol4y1q.jpg',
              date: 'May 18',
              title: 'DMUC 2025 Career Fair',
              description:
                'Join us at the DMUC 2025 Career Fair and discover the latest job opportunities in the industry!',
            },
            {
              img: 'https://res.cloudinary.com/dakqa3htw/image/upload/v1746629974/495135245_1202957821620069_7913979452486311853_n_g4lngq.jpg',
              date: 'Aug 18',
              title: 'JOB FAIR: RDR STYLE ',
              description:
                'RDR Style is a fashion brand that offers a wide range of stylish and affordable clothing. We are looking for a talented individual to join our team!',
            },
            {
              img: 'https://res.cloudinary.com/dakqa3htw/image/upload/v1746629929/495568219_1116234510524535_7906298511613657666_n_mq6mxd.jpg',
              date: 'July 23',
              title: 'CJCC Job Fair 2025!',
              description:
                'The CJCC Job Fair 2025 is a great opportunity to network with potential employers and learn more about the industry!',
            },
          ].map((item, index) => (
            <div className="flex items-start mb-3 pb-3" key={index}>
              <a href="#" className="inline-block mr-3">
                <div
                  className="w-40 h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
              </a>
              <div className={`text-sm ${index % 2 === 1 ? 'w-2/3' : ''}`}>
                <Link
                  href={item.img}
                  className="text-gray-900 font-medium hover:text-indigo-600 leading-none"
                >
                  {item.title}
                </Link>
                <p className="text-gray-600 text-xs">{item.date}</p>
                {/* <p className="text-gray-600 text-sm py-5">{item.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
