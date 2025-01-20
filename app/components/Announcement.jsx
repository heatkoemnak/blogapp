import React from 'react';

const Announcement = () => {
  return (
    <div className="bg-white p-4 sm:p-10 md:p-12 relative">
      <div className="grid grid-cols-1 gap-10">
        {/* Center Content */}
        <div className="col-span-1 lg:col-span-1">
          {[
            {
              img: 'https://media.gettyimages.com/photos/cristiano-ronaldo-of-juventus-fc-looks-dejected-during-the-uefa-of-picture-id1227967060?k=6&m=1227967060&s=612x612&w=0&h=cMSMlRyI6YAzcE_C2KgHGRLeVojHYoUhIvhwPBYv8f4=',
              date: 'Aug 18',
              title:
                'Cristiano Ronaldo of Juventus FC looks dejected during the...',
            },
            {
              img: 'https://media.gettyimages.com/photos/lionel-messi-and-marcandre-ter-stegen-of-fc-barcelona-waits-in-the-picture-id1266763488?k=6&m=1266763488&s=612x612&w=0&h=8vxz9HfQVfrff5N7d1lBVxtLamRQGK3J3lyHkUuuIiw=',
              date: 'Jan 18',
              title: 'Barcelona v Bayern Munich',
            },
            {
              img: 'https://media.gettyimages.com/photos/cristiano-ronaldo-of-juventus-fc-looks-dejected-during-the-uefa-of-picture-id1227967060?k=6&m=1227967060&s=612x612&w=0&h=cMSMlRyI6YAzcE_C2KgHGRLeVojHYoUhIvhwPBYv8f4=',
              date: 'Aug 18',
              title:
                'Cristiano Ronaldo of Juventus FC looks dejected during the...',
            },
            {
              img: 'https://media.gettyimages.com/photos/lionel-messi-of-fc-barcelona-looks-dejected-following-his-teams-in-picture-id1266341828?k=6&m=1266341828&s=612x612&w=0&h=FZi-bSrIlOEE01780h79GsbBYPqZo2l3aaCxoktWADY=',
              date: 'July 23',
              title: 'Barcelona v Bayern Munich - UEFA Champions League',
            },
          ].map((item, index) => (
            <div className="flex items-start mb-3 pb-3" key={index}>
              <a href="#" className="inline-block mr-3">
                <div
                  className="w-20 h-20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
              </a>
              <div className={`text-sm ${index % 2 === 1 ? 'w-2/3' : ''}`}>
                <p className="text-gray-600 text-xs">{item.date}</p>
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-indigo-600 leading-none"
                >
                  {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
